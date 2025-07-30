import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { sign } from 'tweetnacl';

// Загружаем переменные окружения из config/telegram.env
const envPath = path.resolve(process.cwd(), 'config', 'telegram.env');
dotenv.config({ path: envPath });

// Telegram Ed25519 публичные ключи для проверки подписи
const TELEGRAM_PUBLIC_KEYS = {
  test: '40055058a4ee38156a06562e52eece92a771bcd8346a8c4615cb7376eddf72ec',
  production: 'e7bf03a2fa4602af4580703d88dda5bb59f32ed8b02a56c187fe7d34caed242d'
};

// Интерфейсы
interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

interface TelegramInitData {
  user?: TelegramUser;
  query_id?: string;
  auth_date: number;
  hash?: string;
  signature?: string;
  // Поля от Login Widget
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  [key: string]: string | number | TelegramUser | undefined;
}

interface ValidationOptions {
  useSignature?: boolean; // Использовать ли проверку через signature (third-party)
  useLoginWidgetLogic?: boolean; // Использовать ли логику валидации для Login Widget
}

interface ValidationResult {
  ok: boolean;
  error?: string;
  data?: TelegramInitData;
  user_data?: TelegramUser;
}

export class TelegramDataValidator {
  private botToken: string;
  private botId: string;
  private maxAgeSeconds: number;
  private enableDebugLogging: boolean;
  private useTestKey: boolean;

  constructor() {
    // Загружаем и валидируем переменные окружения
    this.botToken = process.env.telegram_botToken?.trim() || '';
    this.botId = process.env.telegram_botId?.trim() || '';
    this.maxAgeSeconds = parseInt(process.env.telegram_maxAgeSeconds || '3600', 10);
    this.enableDebugLogging = process.env.telegram_checkDataELog !== 'false';
    this.useTestKey = process.env.telegram_useTestKey === 'true';

    // Проверяем обязательные переменные
    if (!this.botToken) {
      throw new Error('FATAL: telegram_botToken is required in config/telegram.env');
    }
    if (!this.botId) {
      throw new Error('FATAL: telegram_botId is required in config/telegram.env');
    }

    // Предупреждение о значениях по умолчанию
    const showWarning = process.env.telegram_maxAgeSeconds_warn !== 'false';
    if (this.maxAgeSeconds === 3600 && showWarning) {
      console.warn(
        'WARNING: telegram_maxAgeSeconds uses default value (3600 seconds = 1 hour). ' +
        'Consider adjusting it for your security needs. Disable this warning by setting ' +
        'telegram_maxAgeSeconds_warn=false in config/telegram.env'
      );
    }

    this.log('info', 'TelegramDataValidator initialized', {
      botId: this.botId,
      maxAgeSeconds: this.maxAgeSeconds,
      debugLogging: this.enableDebugLogging,
      useTestKey: this.useTestKey
    });
  }

  /**
   * Основной метод валидации данных
   */
  public async validate(initData: string | Record<string, unknown>, options: ValidationOptions = {}): Promise<ValidationResult> {
    this.log('debug', 'Starting validation', { 
      dataType: typeof initData,
      options 
    });

    try {
      // Парсим данные в зависимости от типа
      let parsedData: TelegramInitData | null;
      
      if (typeof initData === 'string') {
        parsedData = this.parseInitData(initData);
      } else if (options.useLoginWidgetLogic == true) {
        // Если данные пришли как объект (например, от Login Widget onauth callback)
        parsedData = this.parseLoginWidgetData(initData);
      } else {
        parsedData = this.parseInitData(JSON.stringify(initData));
      }
      
      if (!parsedData) {
        return { ok: false, error: 'Failed to parse initData' };
      }

      // Проверяем время
      const timeValidation = this.validateTime(parsedData.auth_date);
      if (!timeValidation.valid) {
        return { ok: false, error: timeValidation.error };
      }

      // Определяем метод валидации
      if (options.useSignature || parsedData.signature) {
        // Third-party валидация через Ed25519 подпись
        const signatureValidation = this.validateSignature(parsedData);
        if (!signatureValidation.valid) {
          return { ok: false, error: signatureValidation.error };
        }
      } else {
        // Стандартная валидация через HMAC
        const hashValidation = this.validateHash(parsedData, options);
        if (!hashValidation.valid) {
          return { ok: false, error: hashValidation.error };
        }
      }

      this.log('info', 'Validation successful');
      return { 
        ok: true, 
        data: parsedData,
        user_data: parsedData.user 
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.log('error', 'Validation failed with exception', { error: errorMessage });
      return { ok: false, error: `Validation failed: ${errorMessage}` };
    }
  }

  /**
   * Парсит данные от Login Widget (объект)
   */
  private parseLoginWidgetData(data: Record<string, unknown>): TelegramInitData | null {
    try {
      this.log('debug', 'Parsing Login Widget object data', { data });

      // Создаем объект с правильными типами
      const result: TelegramInitData = {
        auth_date: typeof data.auth_date === 'number' ? data.auth_date : parseInt(String(data.auth_date), 10)
      };

      // Копируем остальные поля
      if (data.id) result.id = typeof data.id === 'number' ? data.id : parseInt(String(data.id), 10);
      if (data.first_name) result.first_name = String(data.first_name);
      if (data.last_name) result.last_name = String(data.last_name);
      if (data.username) result.username = String(data.username);
      if (data.photo_url) result.photo_url = String(data.photo_url);
      if (data.hash) result.hash = String(data.hash);
      if (data.signature) result.signature = String(data.signature);

      this.log('info', 'Successfully parsed Login Widget data', {
        hasUser: !!result.user,
        hasHash: !!result.hash,
        userId: result.id
      });

      return result;
    } catch (error) {
      this.log('error', 'Failed to parse Login Widget data', { error: String(error) });
      return null;
    }
  }

  /**
   * Парсит строку initData в объект
   */
  private parseInitData(initData: string): TelegramInitData | null {
    try {
      this.log('debug', 'Parsing initData', { rawData: initData });

      const params: Record<string, string | number | TelegramUser> = {};
      const pairs = initData.split('&');

      for (const pair of pairs) {
        const [key, ...valueParts] = pair.split('=');
        if (!key) continue;

        let value = valueParts.join('=');
        
        // URL-декодирование
        try {
          value = decodeURIComponent(value);
        } catch {
          this.log('warn', 'Failed to decode value', { key, value });
        }

        // Парсим JSON для сложных типов (например, user)
        if (key === 'user' || value.startsWith('{')) {
          try {
            params[key] = JSON.parse(value);
            this.log('debug', 'Parsed JSON field', { key, value: params[key] });
          } catch {
            params[key] = value;
            this.log('debug', 'Failed to parse as JSON, using as string', { key, value });
          }
        } else if (key === 'auth_date') {
          params[key] = parseInt(value, 10);
          this.log('debug', 'Parsed auth_date', { value: params[key] });
        } else {
          params[key] = value;
          this.log('debug', 'Parsed string field', { key, value });
        }
      }

      this.log('info', 'Successfully parsed initData', {
        keys: Object.keys(params),
        hasUser: !!params.user,
        hasHash: !!params.hash,
        hasSignature: !!params.signature
      });

      return params as TelegramInitData;
    } catch (error) {
      this.log('error', 'Failed to parse initData', { error });
      return null;
    }
  }

  /**
   * Проверяет время auth_date
   */
  private validateTime(authDate: number): { valid: boolean; error?: string } {
    if (!authDate) {
      return { valid: false, error: 'Missing auth_date field' };
    }

    const now = Math.floor(Date.now() / 1000);
    const age = now - authDate;

    this.log('debug', 'Time validation', {
      authDate,
      now,
      age,
      maxAgeSeconds: this.maxAgeSeconds
    });

    if (age > this.maxAgeSeconds) {
      this.log('warn', 'Auth data is too old', { age, maxAge: this.maxAgeSeconds });
      return { valid: false, error: 'Auth data is too old' };
    }

    if (age < -5) { // Допуск 5 секунд на различия в часах
      this.log('warn', 'Auth date is in the future', { authDate, now });
      return { valid: false, error: 'Auth date is in the future' };
    }

    return { valid: true };
  }

  /**
   * Валидация через HMAC-SHA256 (стандартный метод для Mini App и Login Widget)
   */
  private validateHash(data: TelegramInitData, options: ValidationOptions = {}): { valid: boolean; error?: string } {
    const { hash, ...dataForCheck } = data;
    
    if (!hash) {
      return { valid: false, error: 'Missing hash field' };
    }

    // Создаем data-check-string
    const dataCheckString = this.createDataCheckString(dataForCheck);
    this.log('debug', 'Created data-check-string', { dataCheckString });

    let secretKey: Buffer;
    
    if (options.useLoginWidgetLogic) {
      // Login Widget: secret_key = SHA256(bot_token)
      secretKey = crypto.createHash('sha256').update(this.botToken, 'utf8').digest();
      this.log('debug', 'Using Login Widget logic: secret_key = SHA256(bot_token)');
    } else {
      // Mini App: secret_key = HMAC_SHA256(bot_token, "WebAppData")
      secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(this.botToken)
        .digest();
      this.log('debug', 'Using Mini App logic: secret_key = HMAC_SHA256(bot_token, "WebAppData")');
    }

    this.log('debug', 'Secret key generated', { 
      secretKeyHex: secretKey.toString('hex'),
      botTokenPrefix: this.botToken.substring(0, 10) + '...'
    });

    // Вычисляем HMAC-SHA256 подпись
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString, 'utf8')
      .digest('hex');

    this.log('debug', 'Hash comparison', {
      calculatedHash,
      providedHash: hash,
      match: calculatedHash === hash,
      dataCheckString
    });

    if (calculatedHash !== hash) {
      this.log('error', 'Hash mismatch');
      return { valid: false, error: 'Invalid hash' };
    }

    return { valid: true };
  }

  /**
   * Валидация через Ed25519 подпись (third-party метод)
   */
  private validateSignature(data: TelegramInitData): { valid: boolean; error?: string } {
    const { signature, ...dataForCheck } = data;
    // Исключаем hash из данных для проверки
    delete (dataForCheck as Record<string, unknown>).hash;
    
    if (!signature) {
      return { valid: false, error: 'Missing signature field' };
    }

    // Создаем data-check-string для third-party
    const dataCheckString = this.createThirdPartyDataCheckString(dataForCheck);
    this.log('debug', 'Created third-party data-check-string', { dataCheckString });

    // Получаем публичный ключ
    const publicKeyHex = this.useTestKey ? 
      TELEGRAM_PUBLIC_KEYS.test : 
      TELEGRAM_PUBLIC_KEYS.production;

    this.log('debug', 'Using public key', { 
      environment: this.useTestKey ? 'test' : 'production',
      publicKeyHex 
    });

    try {
      // Декодируем base64url подпись
      const signatureBuffer = this.base64urlDecode(signature);
      const publicKeyBuffer = Buffer.from(publicKeyHex, 'hex');
      const messageBuffer = Buffer.from(dataCheckString, 'utf8');

      this.log('debug', 'Signature verification data', {
        signatureLength: signatureBuffer.length,
        publicKeyLength: publicKeyBuffer.length,
        messageLength: messageBuffer.length
      });

      // Используем tweetnacl для проверки Ed25519 подписи
      const isValid = sign.detached.verify(
        messageBuffer,
        signatureBuffer,
        publicKeyBuffer
      );

      this.log('debug', 'Ed25519 signature verification', { isValid });

      if (!isValid) {
        return { valid: false, error: 'Invalid signature' };
      }

      return { valid: true };
    } catch (error) {
      this.log('error', 'Signature verification failed', { error: String(error) });
      return { valid: false, error: 'Signature verification failed' };
    }
  }

  /**
   * Создает data-check-string для стандартной валидации
   */
  private createDataCheckString(data: Record<string, string | number | TelegramUser | undefined>): string {
    return Object.keys(data)
      .sort()
      .map(key => {
        const value = data[key];
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return `${key}=${valueStr}`;
      })
      .join('\n');
  }

  /**
   * Создает data-check-string для third-party валидации
   */
  private createThirdPartyDataCheckString(data: Record<string, string | number | TelegramUser | undefined>): string {
    const header = `${this.botId}:WebAppData`;
    const dataString = Object.keys(data)
      .sort()
      .map(key => {
        const value = data[key];
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return `${key}=${valueStr}`;
      })
      .join('\n');
    
    return `${header}\n${dataString}`;
  }

  /**
   * Декодирует base64url строку
   */
  private base64urlDecode(str: string): Buffer {
    // Добавляем padding если нужно
    str += '='.repeat((4 - str.length % 4) % 4);
    // Заменяем base64url символы на base64
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(str, 'base64');
  }

  /**
   * Логирование с учетом настроек
   */
  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>): void {
    if (!this.enableDebugLogging && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[TelegramDataValidator:${level.toUpperCase()}] ${timestamp} ${message}`;
    
    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }
}

// Экспорт для использования в других файлах
export default TelegramDataValidator;

// Пример использования (закомментирован)
/*
const validator = new TelegramDataValidator();

// Стандартная валидация Mini App
const result1 = await validator.validate(
  "user=%7B%22id%22%3A123%7D&auth_date=1700000000&hash=abc123"
);

// Third-party валидация
const result2 = await validator.validate(
  "user=%7B%22id%22%3A123%7D&auth_date=1700000000&signature=xyz789",
  { useSignature: true }
);

console.log(result1, result2);
*/
