import mongoose, { Schema } from 'mongoose';

/**
 * Схема "красных флагов" - для тех, кто заслужил особое внимание администрации
 * @author Комитет по надзору за подозрительными пользователями (КНПП)
 */
const RedFlagsSchema = new Schema({
    // Стандартные флаги блокировки (ну почти как в реальной жизни)
    isBanned: { type: Boolean, description: "Заблокирован ли пользователь (все дороги ведут в /dev/null)" },
    isRestricted: { type: Boolean, description: "Ограничения в правах (как процесс без sudo)" },
    isFake: { type: Boolean, description: "Фейковый аккаунт (ну почти как у @username)" },
    isSpam: { type: Boolean, description: "Спамер недели (получает медальку в виде бана)" },
    isScammer: { type: Boolean, description: "Мошенник с рынка (или с курсов по 1000₽ за 'инсайды')" },
    // Флаги для эпичных нарушений (когда обычного бана мало)
    wasFuckedByViolatingTOS: { type: Boolean, description: "Нарушил TOS как следует (ну очень старался)" },
    wasFuckedByViolatingCommunityRules: { type: Boolean, description: "Правила сообщества? Нет, не слышал... (и не собирается слышать)" },
    wasFuckedByViolatingRegionalLaws: { type: Boolean, description: "Региональные законы тоже поигнорил (рекомендуем юриста)" },
    wasFuckedByViolatingCopyright: { type: Boolean, description: "Нарушил авторские права (и не стыдится этого)" },
    
    // Универсальные флаги для выражения отношения (когда слова не помогают)
    idkWeDonTLikeThisUser: { type: Boolean, description: "Мы не знаем что, но что-то не так... (интуиция админов)" },
    idkWhatToDoWithThisUser: { type: Boolean, description: "Полный прострел мозга у админов (собрание в 3 утра)" },
    
    // Флаги для специальных кейсов (ну очень специальных)
    isThisFOXFORD_OFFICIAL_STAFF: { type: Boolean, description: "Это реально сотрудник Foxford или самозванец? (проверка по базе данных)" },
    
    // Секретный флаг для разрабов (тсссс!)
    theUserJustLooksSuspicious: { type: Boolean, description: "Просто выглядит подозрительно, даже не спрашивай почему (шестое чувство программиста)" },
    isRedFlagged: { type: Boolean, description: "Просто красный флаг всей системы (как светофор, но опаснее)" }
}, { _id: false });

/**
 * Схема "лучших друзей" - для тех, кого мы обожаем и готовы угостить пиццей
 * @author Департамент дружбы и уважухи (ДДУ)
 */
const BestyFlagsSchema = new Schema({
    // Верификационные флаги (как у нормальных сервисов, но с душой)
    verifiedAge: { type: Boolean, description: "Подтверждённый возраст (ну хотя бы 18)" },
    verifiedPassport: { type: Boolean, description: "Паспорт проверен (или просто фотка паспорта в чате)" },
    
    // Социальные флаги (как в хорошем обществе)
    adminFriend: { type: Boolean, description: "Друг админа (и чашки кофе)" },
    superActiveInCommunity: { type: Boolean, description: "Активнее чем твой комп в 3 утра (и это говорит многое)" },
    
    // Флаги уважения (почет и уважение)
    legendaryStatus: { type: Boolean, description: "Легендарный статус в сообществе (как у Вадима в @vscreator_life)" },
    helpedWithDebug: { type: Boolean, description: "Помогал с дебагом и не убил никого (редкий случай)" },
    contributesToCode: { type: Boolean, description: "Вносит вклад в код (ну или пытается, что тоже ценно)" },
    
    // Флаги добрых дел (спасибо, что не кидаешь нас в трудную минуту)
    gaveUsPizza: { type: Boolean, description: "Принес пиццу команде (героическое действие, заслуживающее вечной славы)" },
    foundCriticalBug: { type: Boolean, description: "Нашёл баг, который чуть не убил продакшн (спасибо, герой!)" },
    
    // Секретные флаги (обладателям разглашать в тайне)
    knowsTheSecretOfTheUniverse: { type: Boolean, description: "Знает секрет вселенной (или просто читает логи, что тоже ценно)" },
    hasSecretKnowledge: { type: Boolean, description: "Имеет секретные знания (не спрашивай, что это - это тайна)" },

    // 💸 Финансы и подписка (для тех, кто нас кормит)
    premiumAccess: { type: Boolean, description: "Платная подписка (даёт плюс на голову, обычно)" },
    donatedToProject: { type: Boolean, description: "Закинул денег — в благодарность, в чате статус 'Спасает сервер'" },
    
    // Мемные флаги (для самых своих)
    epicGamer: { type: Boolean, description: "Эпичный геймер (Ctrl+Alt+Delete ему не страшен)" },
    memeLord: { type: Boolean, description: "Создатель мемов уровня космического масштаба (как у Кеки в @GiftsCount)" },
    teaEnthusiast: { type: Boolean, description: "Фанат чая (кофе не предлагать - обидится)" },

    // Секретный счётчик (никому не говорить!)
    adminSocksLifetimeViewed: { type: Number, description: "Сколько раз админские чулки были просмотрены (да, это важно для статистики)" }
}, { _id: false });

/**
 * Схема интеграций - чтобы быть везде как дома
 * @author Департамент мультиплатформенного существования (ДМС)
 */
const IntegrationsSchema = new Schema({
    telegram: {
        id: { type: String, description: "Telegram ID (для связи с реальностью)" },
        username: { type: String, description: "Имя пользователя в Telegram (если не забыл)" },
        photoUrl: { type: String, description: "Фото профиля (чтобы узнать в лицо)" },
    },
    discord: {
        id: { type: String, description: "Discord ID (для тех, кто живёт в голосовых чатах)" },
        username: { type: String, description: "Имя пользователя в Discord (с тегом и уровнем громкости)" },
        photoUrl: { type: String, description: "Фото профиля (чтобы не перепутать с ботом)" },
    },
    twitch: {
        id: { type: String, description: "Twitch ID (для стримеров и зрителей)" },
        username: { type: String, description: "Имя пользователя в Twitch (если не забыл)" },
        photoUrl: { type: String, description: "Фото профиля (чтобы узнать в лицо)" },
    }
}, { _id: false });

/**
 * Легендарная модель пользователя - сердце нашей цифровой вселенной
 * @author Разработчики, которые слишком много кофе выпили (и это видно)
 * @description Модель пользователя для сообщества, где каждый - личность!
 */
const UserSchema = new Schema({
    // Основные данные пользователя (те, что видны всем)
    userId: { 
        type: Number, 
        required: true, 
        unique: true, 
        description: "Уникальный ID пользователя (как паспорт, но цифровой)" 
    },
    firstName: { 
        type: String, 
        required: true, 
        description: "Имя пользователя (то, как к нему обращаются в чате)" 
    },
    lastName: { 
        type: String, 
        required: false, 
        description: "Фамилия пользователя (если не забыл)" 
    },
    username: { 
        type: Schema.Types.Mixed, 
        description: "Юзернейм для блог-пост стены (может быть массивом, если пользователь творческий)" 
    },
    photoUrl: { 
        type: String, 
        description: "URL фото профиля (чтобы можно было влепить Фотку в UI)" 
    },
    
    // Даты и временные метки (для бухгалтерии и ностальгии)
    authDate: { 
        type: Date, 
        required: true, 
        description: "Дата последней авторизации (когда последний раз заходил пить кофе)" 
    },
    registrationDate: { 
        type: Date, 
        required: true, 
        description: "Дата регистрации (день рождения аккаунта)" 
    },
    birthDate: { 
        type: Date,
        description: "Дата рождения (чтобы знать, когда поздравлять с днюшкой)"
    },
    
    // Интеграции с пространственно-временными платформами
    integrations: { 
        type: IntegrationsSchema, 
        description: "Интеграции с другими платформами (чтобы быть везде как дома)" 
    },
    
    // Идентификационные данные для бюрократии (строго по форме!)
    passwordHash: { 
        type: String, 
        description: "Хэш пароля (секретная информация, даже от себя)" 
    },
    email: { 
        type: String, 
        description: "Email пользователя (для получения спама и важных уведомлений)" ,
        validate: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    
    // Флаги тревоги и подозрений (для особых случаев)
    redFlags: { 
        type: RedFlagsSchema, 
        description: "Флаги тревоги и подозрений (когда пользователь начинает вести себя странно)" 
    },
    
    // Флаги дружбы и уважухи (для хороших ребят)
    bestyFlags: { 
        type: BestyFlagsSchema, 
        description: "Флаги дружбы и уважухи (для тех, кого мы обожаем)" 
    },
    
    // Специальные флаги (для особых случаев)
    isBot: { 
        type: Boolean, 
        description: "Это бот? (или очень активный пользователь)" 
    },
    isActive: { 
        type: Boolean, 
        description: "Активен ли пользователь (или просто забыл про нас)" 
    },
}, { 
    timestamps: true, // Автоматические метки времени (createdAt, updatedAt)
    description: "Модель пользователя с полной историей и характеристиками"
});

/**
 * Схема сессий - для отслеживания, где и когда пользователь пьёт кофе
 * @author Департамент слежки за сессиями (ДСС)
 */
const SessionSchema = new Schema({
    userId: { 
        type: Number, 
        required: true, 
        description: "ID пользователя (чтобы знать, чьи сессии отслеживаем)" 
    },
    token: { 
        type: String, 
        required: true, 
        description: "Токен сессии (секретный код доступа)" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        description: "Дата создания сессии (когда пользователь в последний раз пил кофе)" 
    },
    expiresAt: { 
        type: Date, 
        required: true, 
        description: "Дата истечения сессии (когда кофе закончится)" 
    },
    sessionId: { 
        type: String, 
        required: true, 
        description: "Уникальный ID сессии (как номер чашки кофе)" 
    },
    userIP: { 
        type: String, 
        required: false, 
        description: "IP пользователя (для геолокации и паранойи)" 
    },
    userAgentHistory: { 
        type: [{
            userAgent: { type: String, description: "User-Agent браузера" },
            firstSeen: { type: Date, default: Date.now, description: "Когда впервые увидели этот UA" },
            lastSeen: { type: Date, default: Date.now, description: "Когда в последний раз видели этот UA" },
            count: { type: Number, default: 1, description: "Сколько раз видели этот UA" }
        }], 
        required: false, 
        description: "История User-Agent'ов (где и как пользователь пил кофе)" 
    },
    sessionVersion: { 
        type: String, 
        required: true, 
        description: "Версия сессии (на случай, если кофе нового вида)" 
    }
});

UserSchema.index({ userId: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
SessionSchema.index({ userId: 1, token: 1 }, { unique: true });
SessionSchema.index({ sessionId: 1 }, { unique: true });

// Экспорт моделей (наши маленькие помощники)
export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');
export const SessionModel = mongoose.models.Session || mongoose.model('Session', SessionSchema, 'sessions');