import { ObjectId } from "mongodb";

/**
 * Легендарная модель пользователя
 * @author Разработчики, которые слишком много кофе выпили
 */
export interface User {
    _id: ObjectId;
    userId: number;
    firstName: string;
    lastName: string;
    username?: string | Array<string>; // Юзернейм для блог-пост стены
    photoUrl?: string; // Чтобы можно было влепить Фотку в UI
    authDate: Date; // Дата последней авторизации
    registrationDate: Date; // Дата регистрации
    
    // Интеграции с пространственно-временными платформами
    integrations?: {
        telegram?: {
            id: string;
            username?: string;
            photoUrl?: string;
        };
        discord?: {
            id: string;
            username?: string;
            photoUrl?: string;
        };
    };
    
    // Идентификационные данные для бюрократии
    passwordHash?: string;
    email?: string;
    
    // Флаги тревоги и подозрений
    redFlags?: RedFlags;
    
    // Флаги дружбы и уважухи
    bestyFlags?: BestyFlags;
    isBot?: boolean; // Это бот?
    isActive?: boolean;
}

/**
 * Флаги для тех, кого пора бы забанить, но мы такие милые
 */
export interface RedFlags {
    // Стандартные флаги блокировки
    isBanned?: boolean;                     // Заблокирован ли пользователь
    isRestricted?: boolean;                // Ограничения в правах
    isFake?: boolean;                      // Фейковый аккаунт (ну почти как у @username)
    isSpam?: boolean;                      // Спамер недели
    isScammer?: boolean;                   // Мошенник с рынка
    
    // Флаги для эпичных нарушений
    wasFuckedByViolatingTOS?: boolean;                    // Нарушил TOS как следует
    wasFuckedByViolatingCommunityRules?: boolean;         // Правила сообщества? Нет, не слышал...
    wasFuckedByViolatingRegionalLaws?: boolean;           // Региональные законы тоже поигнорил
    
    // Универсальные флаги для выражения отношения
    idkWeDonTLikeThisUser?: boolean;       // Мы не знаем что, но что-то не так...
    idkWhatToDoWithThisUser?: boolean;     // Полный прострел мозга у админов
    
    // Флаги для специальных кейсов
    isThisFOXFORD_OFFICIAL_STAFF?: boolean; // Это реально сотрудник Foxford или самозванец?
    
    // Секретный флаг для разрабов
    theUserJustLooksSuspicious?: boolean;  // Просто выглядит подозрительно, даже не спрашивай почему
    isRedFlagged?: boolean;                // Просто красный флаг всей системы
}

/**
 * Флаги для легендарных юзеров, которых мы обожаем
 */
export interface BestyFlags {
    // Верификационные флаги (как у нормальных сервисов, но с душой)
    verifiedAge?: boolean;              // Подтверждённый возраст (ну хотя бы 18)
    verifiedPassport?: boolean;         // Паспорт проверен (или просто фотка паспорта в чате)
    
    // Социальные флаги
    adminFriend?: boolean;              // Друг админа (и чашки кофе)
    superActiveInCommunity?: boolean;   // Активнее чем твой комп в 3 утра
    
    // Флаги уважения
    legendaryStatus?: boolean;          // Легендарный статус в сообществе
    helpedWithDebug?: boolean;          // Помогал с дебагом и не убил никого
    contributesToCode?: boolean;        // Вносит вклад в код (ну или пытается)
    
    // Флаги добрых дел
    gaveUsPizza?: boolean;              // Принес пиццу команде (героическое действие)
    foundCriticalBug?: boolean;         // Нашёл баг, который чуть не убил продакшн
    
    // Секретные флаги
    knowsTheSecretOfTheUniverse?: boolean;  // Знает секрет вселенной (или просто читает логи)
    hasSecretKnowledge?: boolean;       // Имеет секретные знания (не спрашивай, что это)

    // 💸 Финансы и подписка
    premiumAccess?: boolean;            // Платная подписка (даёт плюс на голову, обычно)
    donatedToProject?: boolean;         // Закинул денег — в благодарность, в чате статус "Спасает сервер"
    
    // Мемные флаги
    epicGamer?: boolean;                // Эпичный геймер (Ctrl+Alt+Delete ему не страшен)
    memeLord?: boolean;                 // Создатель мемов уровня космического масштаба
    teaEnthusiast?: boolean;            // Фанат чая (кофе не предлагать)

    adminSocksLifetimeViewed?: number; // Сколько раз админские чулки были просмотрены (да, это важно)
}

// Примеры использования (для потомков):
/*
const user: User = {
    _id: new ObjectId(),
    userId: 1337,
    firstName: "Легендарный",
    lastName: "Разработчик",
    authDate: new Date(),
    registrationDate: new Date(),
    bestyFlags: {
        verifiedAge: true,
        adminFriend: true,
        superActiveInCommunity: true,
        gaveUsPizza: true,
        epicGamer: true
    },
    redFlags: {
        idkWeDonTLikeThisUser: false // Пока что норм
    }
};
*/