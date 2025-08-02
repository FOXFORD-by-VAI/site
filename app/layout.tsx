import type { Metadata } from "next";
import type { Author } from "next/dist/lib/metadata/types/metadata-types";
import "./globals.css";
import WarningPopup from "./components/communityWarnPopUp";

const authors: Author[] = [
  { name: "Христенко Вадим", url: "https://foxford-community.ru/author/owner" },
  { name: "Сообщество ФоксФорд", url: "https://foxford-community.ru/author/community" },
  { name: "Кекача", url: "https://foxford-community.ru/author/sibilla" },
  { name: "Rice", url: "https://foxford-community.ru/author/R_i_c_e_R_i_a_R_o_s_e" },
];

export const metadata: Metadata = {
  title: "ФоксФорд-Коммьюнити",
  description: "Сайт построенный сообществом онлайн-школы ФоксФорд",
  authors,
  alternates: {
    canonical: 'https://foxford-community.ru',
    languages: {
      'en-US': 'https://foxford-community.ru/en-US',
      'be-BY': 'https://foxford-community.ru/be-BY',
    }
  },
  keywords: [
    "foxford",
    "foxford-community",
    "сообщество",
    "онлайн-школа",
    "образование",
    "учеба",
    "школьники",
    "отзывы",
    "Telegram-чаты",
    "форум",
    "статьи",
  ],
  metadataBase: new URL("https://foxford-community.ru"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" dir="ltr" className="h-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
  <body className="antialiased">
        <WarningPopup />
        {children}
      </body>
    </html>
  );
}