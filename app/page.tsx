"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface IconProps { className?: string }
const LogoIcon: React.FC<IconProps> = ({ className }) => (
  <Image
    src="/ffc-long-logo.svg"
    alt="Логотип сообщества"
    className={className}
    width={200}
    height={60}
    priority
  />
);
const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const RocketIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.33-.04-3.08S5.21 15.66 4.5 16.5Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const BalanceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 256 256">
    <path fill="currentColor" d="M168 96H88a40 40 0 0 0-40 40v8a40 40 0 0 0 40 40h80a40 40 0 0 0 40-40v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-24 24H88a24 24 0 0 1-24-24v-8a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24Zm16-112a32.06 32.06 0 0 0-31 24H79a32 32 0 0 0-63 8v80a72.08 72.08 0 0 0 72 72h80a72.08 72.08 0 0 0 72-72V64a32 32 0 0 0-32-32Zm16 112a56.06 56.06 0 0 1-56 56H88a56.06 56.06 0 0 1-56-56V64a16 16 0 0 1 32 0a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8a16 16 0 0 1 32 0Zm-120-4a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm72 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/>
  </svg>
);
const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Компонент Header
interface NavLink {
  title: string;
  href: string;
}
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navLinks: NavLink[] = [
    { title: "О нас", href: "/about" },
    { title: "Лаборатория", href: "https://lab.foxford-community.ru" },
    { title: "Календарик", href: "/calendar" },
    { title: "Авторы", href: "/authors" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <LogoIcon className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.title} href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium">
                {link.title}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-5 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
            >
              Войти
            </Link>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-md px-4 py-4 absolute top-20 left-0 right-0 shadow-xl z-50 transition-all duration-300 ease-in-out animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            <a
              href="/login"
              className="px-5 py-2 w-full text-center border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
            >
              Войти
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

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
        <div className={`flex flex-col md:flex-row items-center justify-center gap-6 max-w-md w-full mt-8 transition-all duration-500 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
             style={{ transitionDelay: '700ms' }}>
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
          Мы строим сообщество на трёх фундаментальных принципах, которые отличают нас от всех остальных.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 p-8 rounded-2xl border border-white/10 shadow-lg transition-all duration-500 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 * (index + 1)}ms` }}
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

// Футер
const Footer: React.FC = () => (
  <footer className="relative py-12 px-4 border-t border-white/10 mt-16">
    {/* Тонкий градиент сверху */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>

    <div className="max-w-5xl mx-auto text-center">
      {/* Логотип */}
      <div className="flex justify-center mb-2">
        <LogoIcon className="h-10 w-auto filter grayscale brightness-75" />
      </div>

      {/* Основной текст */}
      <p className="text-gray-400 text-lg">Сообщество ФоксФорда © {new Date().getFullYear()}</p>
      <p className="text-gray-500 text-sm mt-1 mb-6">Создано с ❤️ сообществом и для сообщества.</p>

      {/* Ссылки */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-500">
        <Link href="https://t.me/foxfordc " target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors duration-200">
          Базовый чат
        </Link>
        <span className="hidden sm:block text-gray-600">•</span>
        <span className="hidden sm:block text-gray-600">•</span>
        <Link href="/" className="hover:text-orange-400 transition-colors duration-200">
          foxford-community.ru
        </Link>
      </div>
    </div>
  </footer>
);

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