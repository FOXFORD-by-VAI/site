// Переиспользуемые компоненты макета
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// Типы для макета
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}
