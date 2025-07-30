import { ObjectId } from 'mongodb';
import { User } from './user';

export interface Staff extends User {
    _id: ObjectId; // Уникальный идентификатор
    staffId: string; // Уникальный идентификатор сотрудника
    permissionLevel: number; // Чем выше тем круче!
    whenPromoted: Date; // Дата, когда был назначен сотрудником
    promotedBy: string; // ID пользователя, который назначил сотрудника
    adminFlags: AdminFlags; // Флаги, определяющие права администратора
}

export interface AdminFlags {
    inVanishMode?: boolean; // Скрыт от обычных пользователей
    isSuperAdmin?: boolean; // Супер админ, имеет все права
    canManageTGBot?: boolean; // Может управлять Telegram ботом
    canManageDSBot?: boolean; // Может управлять Discord ботом
    canManageWeb?: boolean; // Может управлять веб-приложением
    canPostIntoNews?: boolean; // Может публиковать новости
    canUseAIWithoutLimits?: boolean; // Может использовать AI без ограничений
    canChangeSiteInRealTime?: boolean; // Может менять сайт в реальном времени
    canUpdateBackend?: boolean; // Может обновлять бэкенд
    canUpdateFrontend?: boolean; // Может обновлять фронтенд
}