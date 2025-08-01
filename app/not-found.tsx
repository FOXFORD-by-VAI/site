'use client'
import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Home, ArrowLeft, Newspaper, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { GithubIcon } from './components/ui';
import { Header, Footer } from './components/layout';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
}

const NotFoundPage = () => {
  const dynamicText = [
    "Страница не найдена",
    "Путь больше не существует",
    "Ресурс недоступен"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const pathname = usePathname();

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const [sections] = useState<Section[]>([
      {
        id: 'home',
        title: 'Главная',
        description: 'Добро пожаловать на наш сайт',
        icon: <Home className="w-8 h-8" />,
        path: '/'
      },
      {
        id: 'search',
        title: 'Поиск',
        description: 'Найдите нужную информацию',
        icon: <Search className="w-8 h-8" />,
        path: '/search'
      },
      {
        id: 'news',
        title: 'Новости',
        description: 'Последние обновления и анонсы',
        icon: <Newspaper className="w-8 h-8" />,
        path: '/news'
      }
    ]);

  // Создание floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);
  }, []);

  // Анимация текста поочередно
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicText.length);
    }, 2000); // Показываем каждую фразу на 2 секунды
    return () => clearTimeout(timer);
  }, [currentIndex, dynamicText.length]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -10 },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative overflow-hidden bg-black text-gray-100 flex flex-col items-center justify-center text-center px-4 pt-35 pb-20">
        {/* Vercel-style background grid with orange-purple theme */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

      {/* Floating particles with orange-purple colors */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-1 rounded-full ${
              particle.id % 2 === 0 ? 'bg-orange-500/20' : 'bg-purple-500/20'
            }`}
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              y: [particle.y, particle.y - 100, particle.y],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Gradient overlay with orange-purple theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-950/10 to-purple-950/20" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main 404 with modern design */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </motion.h1>
          
          {/* Подзаголовок с анимацией */}
          <div className="h-12 flex justify-center items-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                className="text-xl md:text-2xl text-gray-400 font-medium"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {dynamicText[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Modern info card */}
        <motion.div 
          variants={itemVariants} 
          className="mb-12 p-8 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-800/50"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Search className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-white mb-2">
                Запрашиваемый ресурс не найден
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Страница, которую вы ищете, может быть удалена, перемещена или временно недоступна.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-sm text-gray-500 mb-2 font-mono">Запрошенный путь:</p>
                <code className="text-sm text-white font-mono break-all">
                  {pathname}
                </code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg shadow-orange-500/20"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </motion.a>

          <motion.a
            href="https://github.com/FOXFORD-by-VAI/site/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-xl font-semibold hover:bg-gray-700/50 transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <GithubIcon className="w-5 h-5" />
            Сообщить о проблеме
          </motion.a>
        </motion.div>

        {/* Quick suggestions - стиль как в InDevelopment */}
        <motion.div 
          className="mt-20 max-w-5xl w-full"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-3xl font-bold mb-8 text-center text-gray-100 font-jb-mono" variants={itemVariants}>
            Доступные разделы
          </motion.h2>
          
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  className="bg-gray-800 border border-gray-700 rounded-2xl p-8 transition-all duration-300 shadow-lg cursor-pointer"
                  whileHover={{ y: -8, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.4)', rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  <a href={section.path} className="flex flex-col items-center gap-4 h-full text-center">
                    <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400">
                      {section.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl mb-2 text-gray-100 font-jb-mono">{section.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 font-jb-mono">{section.description}</p>
                    </div>
                    <span
                      className="text-orange-400 hover:text-orange-300 transition-colors font-medium flex items-center gap-2 mt-auto font-jb-mono"
                    >
                      → Перейти ←
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
