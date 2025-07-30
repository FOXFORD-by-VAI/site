import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    userId: number;
    firstName: string;
    lastName: string;
    username?: string | Array<string>; // Юзернейм для блог-пост стены
    photoUrl?: string; // Чтобы можно было влепить Фотку в UI
    authDate: Date; // Дата последней авторизации
    registrationDate: Date; // Дата регистрации
    integrations?: {
        telegram?: {
            id: string; // Telegram ID
            username?: string; // Telegram username
            photoUrl?: string; // URL фото профиля
        };
        discord?: {
            id: string; // Discord ID
            username?: string; // Discord username
            photoUrl?: string; // URL фото профиля
        };
    };
    passwordHash?: string; // Хеш пароля, если используется
    email?: string; // Email пользователя, если используется
    redFlags?: RedFlags; // Флаги безопасности
    isActive?: boolean; // Активен ли пользователь
}

export interface RedFlags {
    isBanned?: boolean; // Заблокирован ли пользователь
    isRestricted?: boolean; // Имеет ли пользователь ограничения
    isBot?: boolean; // Является ли ботом
    isFake?: boolean; // Фейковый аккаунт
    isSpam?: boolean; // Спамер
    isScammer?: boolean; // Мошенник
    wasFuckedByViolatingTOS?: boolean; // Был ли нарушен TOS
    wasFuckedByViolatingCommunityRules?: boolean; // Были ли нарушены правила сообщества
    wasFuckedByViolatingRegionalLaws?: boolean; // Были ли нарушены региональные законы
    isRedFlagged?: boolean; // Общий флаг для всех нарушений
    idkWeDonTLikeThisUser?: boolean; // Не нравится пользователь
    idkWhatToDoWithThisUser?: boolean; // Не знаем, что делать с пользователем
    isThisFOXFORD_OFFICIAL_STAFF?: boolean; // Является ли официальным сотрудником Foxford
}
