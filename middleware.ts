import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Конфигурация маршрутов с поддержкой регулярных выражений
const inDevRoutes = [
  { path: '/profile', exact: true },
  { path: '/settings', exact: true },
  { path: '/login', exact: true },
  { path: '/blog', exact: true },
  { path: /^\/blog\/.*/, exact: false }, // RegExp для /blog/*
];

function isInDevelopmentRoute(pathname: string): boolean {
  return inDevRoutes.some(route => {
    if (typeof route.path === 'string') {
      return route.exact ? pathname === route.path : pathname.startsWith(route.path);
    } else {
      return route.path.test(pathname);
    }
  });
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (isInDevelopmentRoute(path)) {
    return NextResponse.rewrite(new URL('/err/inDevelopment', req.url));
  }
  
  return NextResponse.next();
}
