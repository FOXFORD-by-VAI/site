'use client'
import { motion, easeInOut } from 'framer-motion';
import { Link, Users, Star, Zap, Heart } from 'lucide-react';
import { TelegramIcon, TwitchIcon, GithubIcon, XIcon } from '../components/ui';
import { Header, Footer } from '../components/layout';
import Image from "next/image";
import { ageSpell } from '../components/calculateCorrectSpell';

// Вспомогательная функция для форматирования значений статистики
function formatStatValue(key: string, value: Date | number | string): string | number {
  if (key === 'age') {
    const birthDate = new Date(value);
    if (!isNaN(birthDate.getTime())) {
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      if (
        now.getMonth() < birthDate.getMonth() ||
        (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return ageSpell(age);
    }
    return typeof value === "string" ? value : String(value);
  }
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  if (value instanceof Date) {
    return value.toLocaleString();
  }
  return typeof value === "string" ? value : String(value);
}

// Компонент для страницы "Авторы проекта"
const AuthorsPage = () => {
  // Данные об авторах
  const authors = [
    {
      name: "Вадим | Кодер",
      role: "Главный по проекту и цифровой бунтарь. Даёт жёсткий отпор корпоративной бюрократии и защищает свободу сообщества. Кодит как бог, вдохновляя на подвиги. Вкладывает не только душу и деньги, но и бессонные ночи в защиту общего дела.",
      quote: "Если сообществу не где развиваться, то какое это сообщество. Если компания не идёт к нам на встречу мы сами создадим эту встречу.",
      avatar: "/authors/vai-avatar.jpg", 
      socials: [
        { name: "Телеграм", url: "https://t.me/vscreator_life", icon: <TelegramIcon /> },
        { name: "X (Twitter)", url: "https://x.com/@VAI_PROG", icon: <XIcon /> },
        { name: "Twitch", url: "https://twitch.tv/VOLT_BOT5", icon: <TwitchIcon /> },
        { name: "GitHub", url: "https://github.com/Vadim-Khristenko", icon: <GithubIcon /> },
      ],
      tags: ["Код", "Лидер", "Борец", "Админ"],
      stats: { commits: 297, projects: "50+", gifts: 8, nfts: 3, age: '2010-09-18', messages: "2600+" }
    },
    {
      name: "Кека",
      role: "Финансовый гуру и стратег нашего движения. В нужный момент становится опорой, наводя порядок в хаосе идей. Хранитель криптокошелька и покровитель амбициозных проектов. Его Telegram — криптографическая крепость, где рождаются NFT-мечты.",
      quote: "ура ура ура щас бан щас варн дам щас кикну",
      avatar: "/authors/keka-avatar.jpg", 
      socials: [
        { name: "Личный Телеграм", url: "https://t.me/bloodycost", icon: <TelegramIcon /> },
        { name: "Crypto-группа", url: "https://t.me/GiftsCount", icon: <TelegramIcon /> },
        { name: "Telegram Бот", url: "https://t.me/SeeGiftBot", icon: <Link /> },
      ],
      tags: ["Финансы", "Крипта", "Модерация"],
      stats: { gifts: 280, nfts: 36, age: "13 лет", messages: "1000+" }
    },
    {
      name: "Рис",
      role: "Хранительница душевного тепла в цифровом пространстве. Главная модераторша с переменчивым настроением — и в этом её кайф. Её депрессивный взгляд скрывает острое чувство справедливости. Великая Рис, чья голова из риса стала символом мудрости и покоя в нашем безумном мире.",
      quote: "Рис всему голова, особенно когда голова из риса)",
      avatar: "/authors/rice-avatar.jpg", 
      socials: [], // Пока нет ссылок
      tags: ["Модерация", "Креатив", "Душа", "РИС"],
      stats: { messages: "4000+", warnings: "Многа", age: '2010-07-13' }
    },
  ];

  // Варианты анимации для Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };

  const socialLinkVariants = {
    hover: { 
      scale: 1.05, 
      backgroundColor: 'rgba(251, 146, 60, 0.2)',
      y: -3
    },
    tap: { scale: 0.95 },
  };

  const neonGlowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen relative overflow-hidden bg-gray-950 text-gray-100 flex flex-col items-center px-2 sm:px-4 pt-16 sm:pt-20 pb-12 sm:pb-20">
      {/* Улучшенный фон с анимацией */}
      <div className="absolute inset-0 bg-gray-950 -z-10">
        {/* Анимированный градиент с более насыщенными цветами */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/30 via-amber-900/20 to-transparent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Улучшенные анимированные частицы */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute w-2 h-2 rounded-full bg-orange-500/40 top-1/4 left-1/4 animate-pulse" />
          <div className="absolute w-3 h-3 rounded-full bg-amber-500/40 top-2/3 right-1/3 animate-pulse" />
          <div className="absolute w-1 h-1 rounded-full bg-orange-500/40 bottom-1/5 left-1/2 animate-pulse" />
          <div className="absolute w-2 h-2 rounded-full bg-amber-500/40 top-1/3 right-1/4 animate-pulse" />
          <div className="absolute w-1 h-1 rounded-full bg-orange-500/40 bottom-1/3 left-1/3 animate-pulse" />
        </motion.div>
        
        {/* Дополнительные декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/5 left-1/5 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto py-6 sm:py-12 md:py-24 px-2 sm:px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Улучшенный заголовок с анимацией */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants} 
          className="text-center mb-12 sm:mb-16 md:mb-24 relative"
        >
          <motion.div 
            className="absolute -inset-4 -z-10"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="mx-auto w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 mb-4 sm:mb-6 font-sans tracking-wide sm:tracking-wider relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Создатели Сообщества
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto text-gray-300 font-jb-mono mb-6 sm:mb-8 px-2 sm:px-4">
              Эти люди вкладывают свою душу, время и деньги, чтобы создать место, где каждому будет уютно. 
              Они не боятся дать отпор тем, кто мешает развитию сообщества.
            </p>
            
            {/* Анимированные иконки под заголовком */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
              {[Zap, Heart, Star].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Улучшенная сетка авторов */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-24">
          {authors.map((author, index) => (
            <motion.div
              key={author.name}
              className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-orange-500/30 shadow-2xl flex flex-col items-center text-center overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(31,41,55,0.8) 0%, rgba(17,24,39,0.8) 100%)',
                backdropFilter: 'blur(12px)',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 25px 50px -12px rgba(251, 146, 60, 0.4)',
                borderColor: 'rgba(251, 146, 60, 0.5)'
              }}
            >
              {/* Улучшенный эффект неонового свечения */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl -z-10"
                variants={neonGlowVariants}
                animate="animate"
              />
              
              {/* Анимированный аватар с рамкой */}
              <div className="relative mb-4 sm:mb-6">
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-75 blur-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.75, 0.9, 0.75]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Image
                  src={author.avatar}
                  alt={`Аватар ${author.name}`}
                  width={160}
                  height={160}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-orange-500 mb-4 sm:mb-6 object-cover shadow-2xl z-10"
                />
              </div>
              
              {/* Улучшенное имя с анимацией */}
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-bebas tracking-wide mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {author.name}
              </motion.h2>
              
              {/* Теги автора */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {author.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold font-jb-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + tagIndex * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <p className="text-sm sm:text-base font-semibold text-orange-400 mb-4 sm:mb-6 font-jb-mono px-2">
                {author.role}
              </p>
              
              {/* Улучшенная цитата */}
              <motion.blockquote 
                className="text-sm sm:text-base md:text-lg italic text-gray-300 mb-6 sm:mb-8 font-jb-mono relative px-3 sm:px-4 py-2 border-l-4 border-orange-500/50 bg-gray-900/30 rounded-r-lg min-h-[48px] max-w-full break-words"
                style={{ width: '100%' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span className="block w-full">«{author.quote}»</span>
                <div className="absolute -left-1 -top-1 w-2 h-2 bg-orange-500 rounded-full" />
                <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-amber-500 rounded-full" />
              </motion.blockquote>
              
              {/* Статистика автора */}
              {author.stats && (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 w-full">
                  {Object.entries(author.stats).map(([key, value], statIndex) => (
                    <motion.div
                      key={key}
                      className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + statIndex * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-gray-400 text-xs font-jb-mono capitalize">
                        {key === 'commits' && 'Коммитов'}
                        {key === 'projects' && 'Проектов'}
                        {key === 'gifts' && 'Подарков'}
                        {key === 'nfts' && 'NFTs'}
                        {key === 'messages' && 'Сообщений'}
                        {key === 'warnings' && 'Выдано Предупреждений'}
                        {key === 'age' && 'Возраст'}
                      </div>
                      <div className="text-orange-400 font-bold text-lg sm:text-xl">
                        {formatStatValue(key, value)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Улучшенные социальные ссылки */}
              <div className="w-full mt-auto pt-4 sm:pt-6 border-t border-gray-700/50">
                {author.socials.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {author.socials.map((social, socialIndex) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 transition-all p-2 sm:p-3 rounded-xl bg-gray-800/50 flex flex-col items-center justify-center text-center hover:bg-gray-700/70 border border-gray-700/30"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + socialIndex * 0.1 }}
                      >
                        <div className="mb-1">{social.icon}</div>
                        <span className="text-xs font-jb-mono truncate w-full">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <motion.span 
                    className="text-gray-500 text-sm font-jb-mono py-2 sm:py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Автор скрывает свои контакты...
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Улучшенная секция призыва к действию */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-orange-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden"
          whileHover={{ 
            boxShadow: '0 20px 40px -10px rgba(251, 146, 60, 0.2)',
            borderColor: 'rgba(251, 146, 60, 0.4)'
          }}
        >
          {/* Анимированный фон для секции */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 -z-10"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bebas text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-3 sm:mb-4 tracking-wider"
            variants={pulseVariants}
            animate="animate"
          >
            Присоединяйтесь к нам
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 font-jb-mono px-2 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Создатели сообщества — это все, кто вносит свой вклад на GitHub. Каждый коммит важен.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <motion.a
              href="https://github.com/FOXFORD-by-VAI/site"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 p-4 sm:p-6 bg-gray-800/70 rounded-xl sm:rounded-2xl border border-gray-700/50 flex items-center gap-3 sm:gap-4 text-left hover:border-orange-500/50 transition-all"
              whileHover={{ 
                y: -5, 
                backgroundColor: 'rgba(31, 41, 55, 1)',
                boxShadow: '0 10px 25px -5px rgba(251, 146, 60, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GithubIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              </motion.div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Репозиторий сайта</h3>
                <p className="text-xs sm:text-sm text-gray-400">Смотреть исходный код</p>
              </div>
            </motion.a>
            
            <motion.a
              href="https://github.com/FOXFORD-by-VAI"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 p-4 sm:p-6 bg-gray-800/70 rounded-xl sm:rounded-2xl border border-gray-700/50 flex items-center gap-3 sm:gap-4 text-left hover:border-orange-500/50 transition-all"
              whileHover={{ 
                y: -5, 
                backgroundColor: 'rgba(31, 41, 55, 1)',
                boxShadow: '0 10px 25px -5px rgba(251, 146, 60, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              </motion.div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Присоединиться к создателям</h3>
                <p className="text-xs sm:text-sm text-gray-400">Внести свой вклад</p>
              </div>
            </motion.a>
          </div>
          
          {/* Декоративные элементы */}
          <motion.div 
            className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-3 h-3 bg-amber-500 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [1, 0.3, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
    <Footer />
    </>
  );
};

export default AuthorsPage;