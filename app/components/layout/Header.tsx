"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "vaid_ffc_app/components/ui/icons";

// Константы для иконок
const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Image
    src="/ffc-long-logo.svg"
    alt="Логотип сообщества"
    className={className}
    width={200}
    height={60}
    priority
  />
);

// Типы и интерфейсы
interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  className?: string;
}

// Основные ссылки навигации
const NAV_LINKS: NavLink[] = [
  { title: "О нас", href: "/about" },
  { title: "Лаборатория", href: "https://lab.foxford-community.ru", external: true },
  { title: "Календарик", href: "/calendar" },
  { title: "Авторы", href: "/authors" },
];

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleMenuToggle = () => {
    if (mobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleLinkClick = () => {
    handleMenuToggle();
  };

  // Рендер ссылки
  const renderLink = (link: NavLink) => (
    <Link
      key={link.href}
      href={link.href}
      target={link.external ? "_blank" : "_self"}
      rel={link.external ? "noopener noreferrer" : ""}
      className="text-white hover:text-orange-500 transition-colors duration-300"
      onClick={handleLinkClick}
    >
      {link.title}
    </Link>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="flex-shrink-0">
            <LogoIcon className="h-10 w-auto" />
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(renderLink)}
            <Link
              href="/login"
              className="px-5 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
            >
              Войти
            </Link>
          </nav>

          {/* Кнопка мобильного меню */}
          <button
            className="md:hidden text-white"
            onClick={handleMenuToggle}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {(mobileMenuOpen || isClosing) && (
        <div 
          className={`md:hidden bg-gray-800/90 backdrop-blur-md px-4 py-4 absolute top-20 left-0 right-0 shadow-xl z-50 transition-all duration-300 ease-in-out ${isClosing ? 'animate-mobile-header-menu-fou-ani' : 'animate-mobile-header-menu-fin-ani'}`}
          onAnimationEnd={() => isClosing && setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map(renderLink)}
            <Link
              href="/login"
              className="px-5 py-2 w-full text-center border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
              onClick={handleLinkClick}
            >
              Войти
            </Link>
          </nav>
        </div>
      )}

      {/* Стили для анимации */}
      <style jsx global>{`
        @keyframes mobile-header-menu-fin-ani {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobile-header-menu-fou-ani {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        .animate-mobile-header-menu-fin-ani {
          animation: mobile-header-menu-fin-ani 0.3s ease-out forwards;
        }
        .animate-mobile-header-menu-fou-ani {
          animation: mobile-header-menu-fou-ani 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
