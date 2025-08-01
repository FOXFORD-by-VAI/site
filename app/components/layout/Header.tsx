"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "../ui/icons";

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

interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  const navLinks: NavLink[] = [
    { title: "О нас", href: "/about" },
    { title: "Лаборатория", href: "https://lab.foxford-community.ru", external: true },
    { title: "Календарик", href: "/calendar" },
    { title: "Авторы", href: "/authors" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

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
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                >
                  {link.title}
                </Link>
              )
            ))}
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-md px-4 py-4 absolute top-20 left-0 right-0 shadow-xl z-50 transition-all duration-300 ease-in-out animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                  onClick={handleLinkClick}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium"
                  onClick={handleLinkClick}
                >
                  {link.title}
                </Link>
              )
            ))}
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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
