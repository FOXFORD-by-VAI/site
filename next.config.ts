
import type { NextConfig } from "next";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "config/site_setting.env") });

// Прокидываем нужные переменные в NEXT_PUBLIC_
const withPublicEnv = (config: NextConfig): NextConfig => {
  return {
    ...config,
    env: {
      ...config.env,
      NEXT_PUBLIC_TELEGRAM_BOT_NAME_TELEGRAM: process.env.site_BotUsernameTG || "Foxford_CommunityBot",
      NEXT_PUBLIC_TELEGRAM_BOT_TITLE: process.env.site_BotName || "Сообщество ФоксФорда",
    },
  };
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "foxfordcommunity.ru", // Одно тире может значить много для пользователей!
          },
        ],
        destination: "https://foxford-community.ru/:path*",
        permanent: true,
      },
    ];
  },
};

export default withPublicEnv(nextConfig);