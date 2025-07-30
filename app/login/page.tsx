"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";


// Интерфейсы
interface UserData {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
}

// Расширение для окна браузера
declare global {
  interface Window {
    telegramAuthCallback?: (user: UserData) => void;
  }
}

// --- Иконки ---
const LogoIcon = ({ className }: { className?: string }) => (
  <Image
    src="/ffc-long-logo.svg"
    alt="Логотип сообщества"
    className={className}
    width={200}
    height={60}
    priority
  />
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- SVG иконки провайдеров ---
const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);

const YandexLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 580.641 1000"><path fill="currentColor" d="M456.102 544.012H388.14c-106.741 0-210.255-63.998-210.255-224.006c0-166.693 97.036-234.679 195.696-234.679h82.52v458.685zM562.843 0H378.434C197.307 0 43.64 113.334 43.64 333.342c0 132.002 74.429 229.329 207.016 277.33L3.235 978.679c-8.081 12.009 0 21.321 12.901 21.321h114.833c9.706 0 16.183-2.662 19.411-9.312l224.814-361.357H456.1v361.357c0 3.988 4.853 9.312 11.276 9.312h100.318c9.706 0 12.945-3.997 12.945-10.638V13.344C580.639 3.988 574.161 0 562.842 0"/></svg>
);

const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.97-5.445 3.97-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748L12.545 10.239z"/></svg>
);

const GithubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);

// --- Компоненты ---

const BackgroundBlobs = () => (
  <div className="absolute inset-0 z-0 opacity-10">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen blur-3xl animate-pulse animation-delay-2000"></div>
  </div>
);

const ModalHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="p-6 border-b border-white/10 flex items-center justify-between">
    <LogoIcon className="h-8 w-auto" />
    <button onClick={onClose} className="text-gray-400 hover:text-white" title="Закрыть">
      <CloseIcon className="w-5 h-5" />
    </button>
  </div>
);

// --- Экран выбора провайдера ---
const ChooseProviderScreen = ({ onContinueWithTelegram }: { onContinueWithTelegram: () => void }) => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-2xl font-bold text-white">Войти в Сообщество</h2>
    <p className="text-gray-400 text-sm">Выберите способ входа:</p>

    {/* Активный провайдер */}
    <button
      onClick={onContinueWithTelegram}
      className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
    >
      <TelegramIcon />
      Продолжить с Telegram
    </button>

    {/* Разделитель */}
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-600"></div>
      <span className="px-4 text-sm text-gray-500 bg-gray-800/70">Другие провайдеры</span>
      <div className="flex-1 border-t border-gray-600"></div>
    </div>

    {/* Неактивные провайдеры */}
    <div className="space-y-3">
      <button disabled className="w-full px-6 py-4 bg-gray-700/50 text-gray-500 cursor-not-allowed rounded-xl font-semibold flex items-center gap-4">
        <YandexLogo />
        Войти через Яндекс ID
      </button>
      <button disabled className="w-full px-6 py-4 bg-gray-700/50 text-gray-500 cursor-not-allowed rounded-xl font-semibold flex items-center gap-4">
        <GoogleLogo />
        Войти через Google
      </button>
      <button disabled className="w-full px-6 py-4 bg-gray-700/50 text-gray-500 cursor-not-allowed rounded-xl font-semibold flex items-center gap-4">
        <GithubLogo />
        Войти через GitHub
      </button>
    </div>
  </div>
);

// --- Экран Telegram Widget ---
const TelegramAuthScreen = ({ onAuthSuccess }: { onAuthSuccess: (data: UserData) => void }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Функция обработки успешной авторизации через Telegram
    window.telegramAuthCallback = async (user) => {
      try {
        setIsLoading(true);
        setError("");
        
        console.log("Telegram auth data received:", user);
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
        
        const response = await fetch('/api/telegram/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: user, // Отправляем объект напрямую для Login Widget
            useSignature: false,
            useLoginWidgetLogic: true // Включаем логику Login Widget
          })
        });
        
        const result = await response.json();
        
        if (result.ok) {
          console.log("Auth validation successful:", result.user_data);
          onAuthSuccess(result.user_data);
        } else {
          console.error("Auth validation failed:", result.error);
          setError(`Ошибка проверки: ${result.error.message || 'Неизвестная ошибка'}`);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError("Произошла ошибка при авторизации");
      } finally {
        setIsLoading(false);
      }
    };

    // Подключаем скрипт виджета
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "FOXFORD_by_volt_BOT");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-onauth", "telegramAuthCallback(user)");
    script.setAttribute("data-request-access", "write");

    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
      // Очищаем глобальную функцию
      delete window.telegramAuthCallback;
    };
  }, [onAuthSuccess]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Авторизация через Telegram</h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        Привет! Сейчас мы быстро авторизуем тебя через Telegram.
        Для этого нужно нажать на кнопку ниже.
        <br /><br />
        Убедись, что ты не заблокировал бота <strong>@{process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME_TELEGRAM || 'Foxford_CommunityBot'}</strong> — иначе мы не сможем завершить вход.
        <br /><br />
        Если бот не заблокирован — смело жми кнопку:
      </p>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center text-gray-400">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Проверяем данные...
        </div>
      )}

      <div id="telegram-login-container" className="flex justify-center"></div>

      <button
        onClick={() => window.open(`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME_TELEGRAM || 'Foxford_CommunityBot'}`, "_blank")}
        className="text-xs text-gray-500 underline hover:text-gray-400 block mx-auto"
      >
        Открыть бота @{process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME_TELEGRAM || 'Foxford_CommunityBot'} (на случай блокировки)
      </button>
    </div>
  );
};

// --- Успешный экран ---
const ConnectedScreen = ({ userData, onContinue }: { userData: UserData; onContinue: () => void }) => {
  const displayName = userData.first_name 
    ? `${userData.first_name}${userData.last_name ? ` ${userData.last_name}` : ''}`
    : userData.username || `User ${userData.id}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Успешно!</h3>
        <p className="text-gray-400">Вы вошли как <strong>{displayName}</strong>.</p>
        {userData.photo_url && (
          <div className="mt-2">
            <Image 
              src={userData.photo_url} 
              alt="Profile" 
              width={48}
              height={48}
              className="rounded-full mx-auto border-2 border-orange-500"
            />
          </div>
        )}
      </div>

      <div className="bg-gray-700/50 p-4 rounded-xl border border-white/10 text-sm text-gray-300">
        <p><strong>ID:</strong> {userData.id}</p>
        {userData.username && <p><strong>Username:</strong> @{userData.username}</p>}
      </div>

      <button
        onClick={onContinue}
        className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Перейти в панель управления
      </button>
    </div>
  );
};

// --- Основной компонент ---
export default function LoginPage() {
  const [step, setStep] = useState<"choose-provider" | "telegram-auth" | "connected">("choose-provider");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);

  // Обработка URL параметров при загрузке страницы
  useEffect(() => {
    const processUrlParams = async () => {
      if (typeof window === 'undefined') return;
      
      const urlParams = new URLSearchParams(window.location.search);
      const isTelegramAuth = urlParams.get('telegram-auth') === 'true';
      
      // Если есть параметры Telegram авторизации
      if (isTelegramAuth && (urlParams.get('id') || urlParams.get('auth_date'))) {
        setIsProcessingAuth(true);
        setStep("telegram-auth");
        
        try {
          // Собираем все параметры Telegram
          const telegramData: Record<string, string> = {};
          for (const [key, value] of urlParams.entries()) {
            if (key !== 'telegram-auth') {
              telegramData[key] = value;
            }
          }
          
          console.log("Processing Telegram auth from URL:", telegramData);
          
          // Отправляем данные на бэкенд для проверки
          const response = await fetch('/api/telegram/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              initData: telegramData, // Отправляем объект для Login Widget
              useSignature: false,
              useLoginWidgetLogic: true // Включаем логику Login Widget
            })
          });
          
          const result = await response.json();
          
          if (result.ok) {
            console.log("URL auth validation successful:", result.user_data);
            setUserData(result.user_data);
            setStep("connected");
            
            // Очищаем URL от параметров авторизации
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            console.error("URL auth validation failed:", result.error);
            // Если ошибка валидации, показываем экран авторизации
            setStep("telegram-auth");
          }
        } catch (err) {
          console.error("URL auth processing error:", err);
          setStep("telegram-auth");
        } finally {
          setIsProcessingAuth(false);
        }
      }
    };
    
    processUrlParams();
  }, []);

  const handleAuthSuccess = (data: UserData) => {
    setUserData(data);
    setStep("connected");
  };

  const handleContinue = () => {
    // Перенаправляем на главную страницу
    window.location.href = '/';
  };

  const renderContent = () => {
    if (isProcessingAuth) {
      return (
        <div className="space-y-6 animate-fade-in text-center">
          <h2 className="text-2xl font-bold text-white">Обработка авторизации</h2>
          <div className="text-center text-gray-400">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Проверяем данные авторизации...
          </div>
        </div>
      );
    }
    
    switch (step) {
      case "choose-provider":
        return <ChooseProviderScreen onContinueWithTelegram={() => setStep("telegram-auth")} />;
      case "telegram-auth":
        return <TelegramAuthScreen onAuthSuccess={handleAuthSuccess} />;
      case "connected":
        return userData ? <ConnectedScreen userData={userData} onContinue={handleContinue} /> : null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundBlobs />

      <div className="relative z-10 max-w-md w-full bg-gray-800/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-orange-500/10">
        <ModalHeader onClose={() => setStep("choose-provider")} />
        <div className="p-6 space-y-6">
          {renderContent()}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        #telegram-login-container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}