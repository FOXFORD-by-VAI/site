import { ObjectId } from 'mongodb';
import { User } from './user';

/**
 * Минимальный допустимый набор административных прав.
 * permissionLevel и флаги дают гибкую комбинацию «кто что может».
 */
export interface Staff extends User {
  /** Генерируется системой; MongoDB ObjectId */
  _id: ObjectId;

  /** Читаемый staff-идентификатор вида `ADM-2024-001`; формат уникален в пределах системы */
  staffId: string;

  /** Уровень прав (0–1000). 0 – trainee, 1000 – root. Используется для встроенных ACL-мидлвар. */
  permissionLevel: number;

  /** Дата и UTC-время первого назначения в штат */
  whenPromoted: Date;

  /** userId того, кто выдал права; обязательно должен быть другим Staff-объектом */
  promotedBy: string;

  /** Оперативные флаги прав доступа. Межканальные микро-биты. */
  staffFlags: StaffFlags;

  /** Архив легендарных эпизодов из жизни администратора. **Только чтение** для внешних сервисов. */
  staffLegendsInfo: StaffLegendsInfo;
}

/* ------------------------------------------------------------------ */
/* 1. Флаги прав доступа (файн-тыюнинг компетенций) */
export interface StaffFlags {
  /** true  → пользователь скрыт из публичного списка администраторов и статистики */
  inVanishMode?: boolean;

  /** максимальный уровень: override-пермишены **всегда** возвращают `true` */
  isSuperAdmin?: boolean;

  /* -- Разрешения по сервисам -- */
  telegram?: {
    canManageBot?: boolean;
  };
  discord?: {
    canManageBot?: boolean;
  };
  web?: {
    canManageSite?: boolean;      // право на редактирование контента в UI-builder
    canUpdateFrontend?: boolean;  // пуш в remote-cdn, деплой наборов
    canUpdateBackend?: boolean;   // CI/CD-токен для Docker Hub + K8s
    canPostIntoNews?: boolean;    // публикация в /news и рассылка
    canPostIntoBlog?: boolean;     // публикация в /blog и рассылка
    canManageUsers?: boolean;      // право на редактирование пользователей в админке
  };

  /* -- Разрешения по AI -- */
  canUseAIWithoutLimits?: boolean; // игнорирование daily-quota и rate-limit
  canManageAIModels?: boolean;     // право на добавление/удаление AI-моделей

  /* -- Разрешения по runtime -- */
  canChangeSiteInRealTime?: boolean; // право на hot-patch через WebSocket
}

/* ------------------------------------------------------------------ */
/* 2. «Легендарные» подвиги администратора (доска почёта) */
export interface StaffLegendsInfo {
  /** Реально скинул чулки в чат */
  providedAdminSocks?: boolean;

  /** Биометрически зафиксирован факт отношений IRL — не важно, серьёзные / дружеские */
  hasIRLGirlfriend?: boolean;

  /** Признак «вставил из GitHub, не прочитал» (следят ревью-боты) */
  copyPastedCode?: boolean;

  /** Записан пример восстановления prod-сервиса после пятиминутного downtime */
  resuscitatedDeadServer?: boolean;

  /** Признак владения криптой > 1 BTC по истории кошельков; подтверждено сторонней подписью */
  holdsCryptoFatWallet?: boolean;

  /** Успешный деплой после 18:00 пятницы без очевидного факапа (статус из истории CI/CD) */
  deployedAfterFridayAndSurvived?: boolean;
  spokeWithBigWigs?: boolean;
}