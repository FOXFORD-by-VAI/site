import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLinkIcon, 
  TelegramIcon, 
  GithubIcon, 
  SourceCodeIcon, 
  OpenCollectiveIcon, 
  TBankIcon 
} from "../ui/icons";

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

interface FooterProps {
  className?: string;
}

interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();
  
  // Основные ссылки сообщества
  const communityLinks: FooterLink[] = [
    { 
      title: "Базовый чат", 
      href: "https://t.me/foxfordc", 
      external: true,
      icon: <TelegramIcon className="w-4 h-4" />
    },
    { 
      title: "Лаборатория", 
      href: "https://lab.foxford-community.ru", 
      external: true,
      icon: <ExternalLinkIcon className="w-4 h-4" />
    },
    { title: "О проекте", href: "/about" },
    { title: "Авторы", href: "/authors" },
  ];

  // Ссылки для разработчиков и поддержки
  const developmentLinks: FooterLink[] = [
    {
      title: "GitHub Organization",
      href: "https://github.com/FOXFORD-by-VAI/",
      external: true,
      icon: <GithubIcon className="w-4 h-4" />
    },
    {
      title: "Исходный код сайта",
      href: "https://github.com/FOXFORD-by-VAI/site",
      external: true,
      icon: <SourceCodeIcon className="w-4 h-4" />
    },
    {
      title: "Open Collective",
      href: "https://opencollective.com/foxford-by-vai",
      external: true,
      icon: <OpenCollectiveIcon className="w-4 h-4" />
    },
    {
      title: "Поддержать проект (Т-Банк)",
      href: "https://www.tbank.ru/cf/9xlkxtTqIGG",
      external: true,
      icon: <TBankIcon className="w-4 h-4" />
    },
  ];

  const LinkComponent = ({ link }: { link: FooterLink }) => {
    const content = (
      <span className="flex items-center gap-2 justify-center">
        {link.icon}
        {link.title}
      </span>
    );

    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-400 transition-colors duration-200 text-center w-full"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={link.href}
        className="hover:text-orange-400 transition-colors duration-200 text-center w-full"
      >
        {content}
      </Link>
    );
  };

  return (
    <footer className={`relative py-16 px-4 border-t border-white/10 mt-16 ${className}`}>
      {/* Тонкий градиент сверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        {/* Верхняя секция с логотипом и основной информацией */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <LogoIcon className="h-12 w-auto filter grayscale brightness-75 hover:filter hover:grayscale-0 hover:brightness-100 transition-all duration-300" />
          </div>

          <h3 className="text-gray-400 text-xl font-semibold mb-3">
            ЛиФье Сообщество © {currentYear}
          </h3>
          <p className="text-gray-500 text-base mb-2">
            Создано с ❤️ сообществом и для сообщества
          </p>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
            Сообщество учеников, выпускников, преподавателей и сотрудников ФоксФорд.
            <br />
            <span className="text-xs">
              Любые расчёты проходят от имени ЛиФьего Сообщества в связи с ограничениями на использование торгового знака ФоксФорд.
            </span>
          </p>
        </div>

        {/* Основные разделы ссылок */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Сообщество */}
          <div className="flex flex-col items-center">
            <h4 className="text-gray-300 font-semibold mb-4 text-center">Сообщество</h4>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {communityLinks.map((link) => (
                <LinkComponent key={link.title} link={link} />
              ))}
            </div>
          </div>

          {/* Разработка и поддержка */}
          <div className="flex flex-col items-center">
            <h4 className="text-gray-300 font-semibold mb-4 text-center">Разработка и поддержка</h4>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {developmentLinks.map((link) => (
                <LinkComponent key={link.title} link={link} />
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя секция */}
        <div className="text-center pt-8 border-t border-white/10">
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <Link href="/" className="hover:text-orange-400 transition-colors duration-200">
                foxford-community.ru
              </Link>
              {" • "}
              <span>Независимое открытое сообщество</span>
            </p>
            <p className="max-w-2xl mx-auto">
              Мы используем название &ldquo;ФоксФорд&rdquo; исключительно как описательное слово, 
              указывающее на связь участников сообщества с онлайн-школой в качестве учеников, 
              выпускников, преподавателей или сотрудников.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
