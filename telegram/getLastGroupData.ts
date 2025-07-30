import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export interface TelegramChatInfo {
  photoUrl: string | null;
  title: string | null;
  total_user_count: number | null;
  online_user_count: number | null;
  description: string | null;
}

/**
 * Скраппинг публичной страницы Telegram через fetch и cheerio
 */
export async function scrapeTelegramChat(username: string): Promise<TelegramChatInfo> {
  const url = `https://t.me/${username}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0' } });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Фото
  const photoUrl = $(
    'body > div.tgme_page_wrap > div.tgme_body_wrap > div > div.tgme_page_photo > a > img'
  ).attr('src') || null;

  // Название
  const title = $(
    'body > div.tgme_page_wrap > div.tgme_body_wrap > div > div.tgme_page_title > span'
  ).text().trim() || null;

  // Количество участников и онлайн
  const countText = $(
    'body > div.tgme_page_wrap > div.tgme_body_wrap > div > div.tgme_page_extra'
  ).text();
  let total_user_count: number | null = null;
  let online_user_count: number | null = null;
  if (countText) {
    const [total, online] = countText.split(",").map((s: string) => s.replace(/\D/g, ""));
    total_user_count = total ? parseInt(total, 10) : null;
    online_user_count = online ? parseInt(online, 10) : null;
  }

  // Описание
  const descriptionHtml = $(
    'body > div.tgme_page_wrap > div.tgme_body_wrap > div > div.tgme_page_description'
  ).html() || '';
  const description = descriptionHtml
    .replace(/<br\s*\/?>(?![\s\S]*<br)/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim() || null;

  return { photoUrl, title, total_user_count, online_user_count, description };
}