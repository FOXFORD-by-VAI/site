'use client'
import { useState, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Home, Users, BookOpen } from 'lucide-react';
import { Footer, Header } from 'vaid_ffc_root/app/components/layout';
import { GithubIcon } from 'vaid_ffc_root/app/components/ui';

// Структура данных секции
interface Section {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
}

// Главный компонент страницы
const App = () => {
  // Доступные разделы
  const [sections] = useState<Section[]>([
    {
      id: 'home',
      title: 'Главная',
      description: 'Добро пожаловать на наш сайт',
      icon: <Home className="w-8 h-8" />,
      path: '/'
    },
    {
      id: 'about',
      title: 'О нас',
      description: 'Информация о команде и проекте',
      icon: <Users className="w-8 h-8" />,
      path: '/about'
    },
    {
      id: 'docs',
      title: 'Документация',
      description: 'Подробные руководства и API',
      icon: <BookOpen className="w-8 h-8" />,
      path: '/docs'
    }
  ]);

  // Ссылка для прокрутки к секциям
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Обработчик прокрутки
  const scrollToSections = () => {
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Варианты анимации для Framer Motion
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const glitch = {
    initial: {
      opacity: 0,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    },
    animate: {
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      transition: {
        duration: 0.8,
        staggerChildren: 0.05,
      },
    },
  };
  
  const textGlitch = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };


  return (
    <div className={`min-h-screen text-gray-100 flex flex-col`}>
      <div className="absolute inset-0 bg-gray-950 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,_0.1),rgba(255,255,255,0))]"></div>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24 flex flex-col items-center justify-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl text-center px-4"
        >
          <motion.div variants={itemVariants}>
            <span className="text-sm font-semibold tracking-wide text-orange-400 uppercase bg-gray-800 px-3 py-1 rounded-full">
              В разработке
            </span>
          </motion.div>
          
          <motion.div
            variants={glitch}
            className="mt-10 mb-5 overflow-hidden"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 font-geist"
              variants={textGlitch}
            >
              Скоро здесь будет магия.
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300"
            variants={itemVariants}
          >
            Извините, но этот раздел все еще находится в разработке. Мы усердно работаем, чтобы запустить его как можно скорее.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              onClick={scrollToSections}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Посмотреть другие разделы</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.button>
            <motion.a
              href="https://github.com/FOXFORD-by-VAI/site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-700 text-gray-300 font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Присоединиться на GitHub</span>
              <GithubIcon className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          ref={sectionsRef}
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
                  <a href={section.path} className="flex flex-col items-start gap-4 h-full">
                    <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400">
                      {section.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl mb-2 text-gray-100 font-jb-mono">{section.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 font-jb-mono">{section.description}</p>
                    </div>
                    <span
                      className="text-orange-400 hover:text-orange-300 transition-colors font-medium flex items-center gap-1 mt-auto font-jb-mono"
                    >
                      Перейти →
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
