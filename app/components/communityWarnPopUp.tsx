'use client';
import { useState, useEffect } from 'react';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const WarningPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const popupSeen = localStorage.getItem('communityPopupSeen');
    if (!popupSeen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('communityPopupSeen', 'true');
    document.body.style.overflow = 'auto';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-cwpu">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 max-w-md text-center border border-orange-500/30 transform transition-all animate-pop-up-cwpu">
        {/* Иконка предупреждения */}
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Добро пожаловать в Сообщество!</h2>

        <p className="mb-4 text-gray-300">
          Этот сайт — <span className="font-bold text-orange-400">инициатива учеников</span>, а не официальный ресурс.
        </p>

        <p className="mb-6 text-gray-300">
          Он <span className="font-bold text-red-400">не принадлежит и не контролируется</span> ООО «ФоксФорд».
        </p>

        {/* Кнопка-ссылка на foxford.ru */}
        <a
          href="https://foxford.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition-all duration-200 mb-6"
        >
          Перейти на официальный сайт
          <ArrowRightIcon className="w-4 h-4" />
        </a>

        <p className="text-sm text-gray-400">
          Это пространство создано <strong>нами и для нас</strong> — для свободного общения, поддержки и совместного развития.
        </p>

        <button
          onClick={handleClose}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20"
        >
          Погнали!
        </button>
      </div>
    </div>
  );
};

export default WarningPopup;