'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer } from '../../components/layout';

interface DevComment {
  id: string;
  author: string;
  message: string;
  timestamp: number;
  avatar?: string;
  mood: 'excited' | 'tired' | 'focused' | 'coffee' | 'debugging';
}

export default function InDevelopmentPage() {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [windowWidth, setWindowWidth] = useState(1200);
  const [devComments, setDevComments] = useState<DevComment[]>([]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceTracked, setSourceTracked] = useState(false);

  const words = useMemo(() => ['Скоро…', 'Почти…', 'Совсем рядом!'], []);
  
  const notifications = useMemo(() => [
    '✅ Новый компонент готов',
    '🚀 Оптимизация завершена',
    '🎨 UI обновлён',
    '🔧 Баг исправлен',
    '⚡ Производительность улучшена',
    '🎯 Фича добавлена'
  ], []);

  // Отслеживание источника запроса
  useEffect(() => {
    if (!sourceTracked && typeof window !== 'undefined') {
      const source = new URLSearchParams(window.location.search).get('from') || 
                    document.referrer ? new URL(document.referrer).hostname : 'direct';
      
      fetch(`/api/dev-comments?action=track-source&source=${encodeURIComponent(source)}`)
        .then(() => setSourceTracked(true))
        .catch(console.error);
    }
  }, [sourceTracked]);

  // Загрузка комментариев разработчиков
  const loadDevComments = useCallback(async () => {
    try {
      const response = await fetch('/api/dev-comments?action=get-comments&limit=6');
      const data = await response.json();
      setDevComments(data.comments || []);
    } catch (error) {
      console.error('Failed to load dev comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDevComments();
  }, [loadDevComments]);

  // Set window width on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Переключение комментариев разработчиков
  useEffect(() => {
    if (devComments.length > 0) {
      const interval = setInterval(() => {
        setCurrentCommentIndex(prev => (prev + 1) % devComments.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [devComments.length]);

  // Typewriter effect
  useEffect(() => {
    const word = words[currentWordIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= word.length) {
        setTypewriterText(word.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex, words]);

  // Random notifications
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setNotificationText(randomNotification);
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }, 8000);

    return () => clearInterval(notificationInterval);
  }, [notifications]);

  const handleScrollToFeatures = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч назад`;
    return 'вчера';
  };

  return (
    <>
      <Header />
      {/* Vercel-style background with animated grid */}
      <div className="min-h-screen bg-black relative overflow-hidden pt-20">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/10 to-purple-950/20" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * windowWidth,
                y: Math.random() * 800,
              }}
              animate={{
                y: [null, -20, null],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Random notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              className="fixed top-24 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl z-50 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {notificationText}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Running silhouettes - более стильные */}
        <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-4 text-lg opacity-20"
              animate={{
                x: [-30, windowWidth + 30]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 4
              }}
            >
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  💻
                </div>
                <span className="text-sm">coding...</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Typewriter title */}
            <h1 className="text-6xl md:text-8xl text-white mb-6 font-[var(--font-days-one)] tracking-tight">
              <motion.span
                key={typewriterText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block"
              >
                {typewriterText}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-blue-400"
              >
                |
              </motion.span>
            </h1>

            {/* Subtitle with better typography */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-[var(--font-geist-sans)]"
            >
              Этот раздел пока закрыт на финальные штрихи.<br />
              <span className="text-gray-300">Мы буквально бежим с последним коммитом в зубах</span>, но не хватает ещё пары рук.<br />
              <span className="text-white">Пока ждёте — гляните другие фичи или станьте этой «парой рук» на GitHub!</span>
            </motion.p>
          </motion.div>

          {/* Dev Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16 w-full max-w-2xl"
          >
            <h3 className="text-xl text-center text-gray-300 mb-6 font-[var(--font-jb-mono)]">
              💬 Что происходит в команде
            </h3>
            
            <div className="relative h-24 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden">
              <AnimatePresence mode="wait">
                {!isLoading && devComments.length > 0 && (
                  <motion.div
                    key={currentCommentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center p-6"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
                        {devComments[currentCommentIndex]?.avatar || '👨‍💻'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">
                            {devComments[currentCommentIndex]?.author}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formatTimeAgo(devComments[currentCommentIndex]?.timestamp || Date.now())}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {devComments[currentCommentIndex]?.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Progress dots */}
              <div className="absolute bottom-2 right-4 flex gap-1">
                {devComments.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentCommentIndex ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action buttons with improved design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToFeatures}
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-200/20 hover:bg-gray-100"
            >
              Открыть другие разделы
            </motion.button>
            
            <motion.a
              href="https://github.com/FOXFORD-by-VAI/site"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 border border-blue-500/20"
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              Добавить свои руки
            </motion.a>
          </motion.div>
        </div>

        {/* Modern pulse line instead of heartbeat */}
        <div className="fixed bottom-0 left-0 w-full h-12 bg-black/50 backdrop-blur-md flex items-center px-8 border-t border-gray-800/50">
          <div className="w-full relative">
            {/* Modern progress line */}
            <motion.div
              className="w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleX: [0.95, 1, 0.95]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            
            
            {/* Help indicator */}
            <motion.div
              className="absolute right-0 inset-y-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.a
                href="https://github.com/FOXFORD-by-VAI/site/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-red-500/20 transition-all"
                animate={{
                  y: [0, -1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                need help?
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Explore Other Features section - Vercel style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-transparent to-black/20"
        >
          <div className="text-center text-white max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl mb-16 font-[var(--font-days-one)] tracking-tight"
            >
              Другие разделы
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Главная', 
                  desc: 'Добро пожаловать в сообщество', 
                  link: '/',
                  icon: '🏠',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  title: 'Логин', 
                  desc: 'Войти в аккаунт', 
                  link: '/login',
                  icon: '🔐',
                  color: 'from-purple-500 to-pink-500'
                },
                { 
                  title: 'API', 
                  desc: 'Документация API', 
                  link: '/api',
                  icon: '⚡',
                  color: 'from-green-500 to-emerald-500'
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  className="group bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>
                  <div className="mt-4 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-transparent group-hover:w-12 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}