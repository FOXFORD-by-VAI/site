"use client";
import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components/layout";
import { UsersIcon, RocketIcon, ShieldCheckIcon, BalanceIcon } from "./components/ui/icons";

// Hero секция
interface HeroSectionProps { isMounted: boolean }
function HeroSection({ isMounted }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24 pb-10 overflow-hidden">
      {/* Фоновые блики с медленной анимацией */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen blur-3xl animate-blob-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen blur-3xl animate-blob-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen blur-3xl animate-blob-slow animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Заголовки */}
        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Больше, чем просто чат.
        </h1>
        <h2 className={`text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-6 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Твоё Сообщество.
        </h2>
        <p className={`max-w-2xl text-lg md:text-xl text-gray-300 mb-12 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Мы создаём независимое пространство для учеников, где каждый голос важен, и каждый участник — творец будущего.
        </p>

        {/* Блок новых кнопок с анимацией появления */}
        <div 
          className={`flex flex-col md:flex-row items-center justify-center gap-6 max-w-md w-full mt-8 transition-all duration-500 animate-slide-in ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Базовый чатик (SFW) */}
          <a
            href="https://t.me/foxfordc "
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-lg font-semibold rounded-xl text-white overflow-hidden transition-transform duration-300 hover:scale-105 md:hover:scale-110 w-full text-center"
          >
            <span className="relative z-10">Базовый чатик</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 animate-gradient-x"></span>
          </a>

        </div>
      </div>

      {/* Глобальные стили для анимаций */}
      <style jsx global>{`
        @keyframes blob-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-slow {
          animation: blob-slow 12s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          background-position: 0% 50%;
          animation: gradient-x 5s ease-in-out infinite;
        }

        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// Секция манифеста
interface ManifestoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface ManifestoSectionProps {
  items: ManifestoItem[];
  isMounted: boolean;
}
const ManifestoSection: React.FC<ManifestoSectionProps> = ({ items, isMounted }) => {
  return (
    <section className="py-20 px-4 bg-gray-900/60 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Наш Манифест</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          Мы строим ЛиФье Сообщество на трёх фундаментальных принципах, которые отличают нас от всех остальных.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 p-8 rounded-2xl border border-white/10 shadow-lg transition-all duration-500 animate-card-${index + 1} ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* Блок: иконка + заголовок — в одной строке */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white self-start">{item.title}</h3>
              </div>

              {/* Описание — под всем, прижато к левому краю */}
              <p className="text-gray-400 text-sm leading-relaxed text-left">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Атмосфера
const AtmosphereSection: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <BalanceIcon className="w-16 h-16 text-teal-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Наша Атмосфера: Свобода и Уважение</h2>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">Мы стремимся быть лучше других и создали среду, где каждый может быть собой, не боясь осуждения.</p>
        <div className="text-left space-y-6 text-lg text-gray-300 max-w-3xl mx-auto">
          <p><strong>Честные правила.</strong> У нас не так много правил, но главное — взаимное уважение. Мы не потерпим оскорблений, травли и токсичного поведения. Наша цель — создать место, где каждый чувствует себя комфортно и в безопасности.</p>
          <p><strong>Справедливость.</strong> Нарушители правил получают по заслугам, но мы всегда выступаем за диалог. Удаление из чата — крайняя мера, к которой прибегаем, когда другие методы не помогли.</p>
          <p><strong>Пространство для всех.</strong> Основной чат — безопасная зона (SFW). Для взрослого контента есть отдельное закрытое пространство.</p>
        </div>
      </div>
    </section>
  );
};

// Основной компонент
const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  const manifestoItems: ManifestoItem[] = [
    {
      icon: <UsersIcon className="w-10 h-10 mb-3 text-orange-400" />,
      title: "Власть в руках сообщества",
      description: "Мы — независимый проект, где нет директоров. Каждый участник может стать лидером, предложить идею и повести за собой. Все решения принимаются коллективно.",
    },
    {
      icon: <RocketIcon className="w-10 h-10 mb-3 text-orange-400" />,
      title: "Пространство для инноваций",
      description: "Здесь рождаются и воплощаются самые смелые проекты. У тебя есть идея? Найди единомышленников, получи поддержку и создай то, что изменит мир.",
    },
    {
      icon: <ShieldCheckIcon className="w-10 h-10 mb-3 text-orange-400" />,
      title: "Территория свободы",
      description: "Забудь о страхе быть непонятым или удалённым из чата. Мы создали безопасную среду, где нет предвзятости и каждого ценят по-настоящему.",
    },
  ];

  return (
    <div className="bg-gray-950 text-gray-200 font-sans">
      <Header />
      <main>
        <HeroSection isMounted={isMounted} />
        <ManifestoSection items={manifestoItems} isMounted={isMounted} />
        <AtmosphereSection />
        <Footer />
      </main>
      <style jsx global>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
        
        .animate-slide-in {
          transition-delay: 700ms;
        }
        
        .animate-card-1 {
          transition-delay: 200ms;
        }
        
        .animate-card-2 {
          transition-delay: 400ms;
        }
        
        .animate-card-3 {
          transition-delay: 600ms;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;