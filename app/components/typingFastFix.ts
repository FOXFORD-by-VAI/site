/**
 * typingFastFix.ts
 * Продвинутые типы и утилиты для строгой типизации.
 * Inspired by Pydantic, Zod, реальными кейсами и best practices.
 */

// --- Базовые "Any" с контекстом ---
/** Любая строка, включая null/undefined */
export type AnyString = string | null | undefined;
/** Любое число или строка, включая null/undefined */
export type AnyNumber = number | bigint | string | null | undefined;
/** Любое булево, строка, число, включая null/undefined */
export type AnyBoolean = boolean | string | number | bigint | null | undefined;
/** Любой массив, включая null/undefined */
export type AnyArray<T = unknown> = T[] | null | undefined;
/** Любой объект, включая null/undefined */
export type AnyObject<T = unknown> = Record<string, T> | null | undefined;
/** Любой объект, где значения - байты (Uint8Array, Buffer) */
export type AnyByteObject = Record<string, Uint8Array | Buffer | number[]> | null | undefined;
/** Любой JSON-объект (строго рекурсивно) */
export type AnyJsonValue = string | number | boolean | null | AnyJsonObject | AnyJsonArray;
export type AnyJsonObject = { [key: string]: AnyJsonValue };
export type AnyJsonArray = AnyJsonValue[];

// --- Расширенные типы (валидируемые) ---
export type AnyUrl = string & { __brand?: 'url' };
export type AnyEmail = string & { __brand?: 'email' };
export type AnyPhoneNumber = string & { __brand?: 'phone' };

export function isUrl(s: string): s is AnyUrl {
  if (typeof s !== 'string') return false;
  try {
    const url = new URL(s);
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
}

export function isEmail(s: string): s is AnyEmail {
  if (typeof s !== 'string') return false;
  return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(s);
}

export function isPhoneNumber(s: string): s is AnyPhoneNumber {
  if (typeof s !== 'string') return false;
  return /^\+?[0-9\s\-()]{7,}$/.test(s);
}

// --- Числовые типы с семантикой ---
export type PositiveInt = number & { __brand: 'positive-int' };
export type NonNegativeInt = number & { __brand: 'non-negative-int' };
export type NonZeroInt = number & { __brand: 'non-zero-int' };

export function toPositiveInt(n: number): PositiveInt {
  if (!Number.isInteger(n) || n <= 0) throw new Error(`${n} is not a positive integer`);
  return n as PositiveInt;
}

export function toNonNegativeInt(n: number): NonNegativeInt {
  if (!Number.isInteger(n) || n < 0) throw new Error(`${n} is not a non-negative integer`);
  return n as NonNegativeInt;
}

export function toNonZeroInt(n: number): NonZeroInt {
  if (!Number.isInteger(n) || n === 0) throw new Error(`${n} is not a non-zero integer`);
  return n as NonZeroInt;
}

// --- Время и дата ---
export type DateTime = string & { __brand: 'datetime' }; // ISO 8601
export type DateOnly = string & { __brand: 'date-only' }; // YYYY-MM-DD
export type TimeOnly = string & { __brand: 'time-only' }; // HH:mm:ss

export function isValidDateTime(s: string): s is DateTime {
  if (typeof s !== 'string') return false;
  const d = new Date(s);
  return !isNaN(d.getTime()) && d.toISOString() === s;
}

export function isValidDateOnly(s: string): s is DateOnly {
  if (typeof s !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [year, month, day] = s.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && (date.getUTCMonth() + 1) === month && date.getUTCDate() === day;
}

export function isValidTimeOnly(s: string): s is TimeOnly {
  if (typeof s !== 'string') return false;
  return /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(s);
}

// --- ID и идентификаторы ---
export type UUID = string & { __brand: 'uuid' };
export type Snowflake = string & { __brand: 'snowflake' }; // Telegram, Discord ID
export type TelegramID = string & { __brand: 'telegram-id' };
export type DiscordID = string & { __brand: 'discord-id' };
export type ID = number | bigint | string | UUID;

export function isUUID(s: string): s is UUID {
  if (typeof s !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(s);
}

// --- Проверка объектов ---
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type Nullable<T> = T | null | undefined;
export type NonEmptyArray<T> = [T, ...T[]];
export type Enum<T extends string | number> = { [K in T]: K };

// --- Утилиты ---
/**
 * Проверка, что значение не может произойти (для исчерпывающих проверок)
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

/**
 * Сделать все поля опциональными рекурсивно
 */
export type DeepPartial<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
  : T;

/**
 * Сделать все поля обязательными рекурсивно
 */
export type DeepRequired<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepRequired<U>>
    : {
        [P in keyof T]-?: DeepRequired<T[P]>;
      }
  : T;

/**
 * Сделать все поля readonly рекурсивно
 */
export type DeepReadonly<T> = T extends object
  ? T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/**
 * Глубокое слияние объектов и массивов без использования any.
 * Массивы заменяются полностью, объекты сливаются рекурсивно.
 */
export function deepMerge<T, U>(target: T, source: U): T & U {
  if (Array.isArray(target) && Array.isArray(source)) {
    // Можно реализовать merge поэлементно, но обычно массивы заменяются
    return source as unknown as T & U;
  }
  if (isPlainObject(target) && isPlainObject(source)) {
    const result: Record<string, unknown> = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const targetValue = (target as Record<string, unknown>)[key];
        const sourceValue = (source as Record<string, unknown>)[key];
        if (key in target) {
          result[key] = deepMerge(targetValue, sourceValue);
        } else {
          result[key] = sourceValue;
        }
      }
    }
    return result as T & U;
  }
  return source as T & U;
}

/** Проверка на "обычный" объект (не массив, не null, не функция) */
function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

/**
 * Проверка, что объект является валидным JSON-объектом (строго, без массивов)
 */
export function isJsonObject(obj: unknown): obj is AnyJsonObject {
  if (!isPlainObject(obj)) return false;
  try {
    JSON.stringify(obj);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверка, что массив не пустой
 */
export function isNonEmptyArray<T>(arr: readonly T[]): arr is NonEmptyArray<T> {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * Проверка, что значение nullable
 */
export function isNullable<T>(val: T | null | undefined): val is Nullable<T> {
  return val === null || val === undefined;
}