import { NextRequest, NextResponse } from 'next/server';

interface DevComment {
  id: string;
  author: string;
  message: string;
  timestamp: number;
  avatar?: string;
  mood: 'excited' | 'tired' | 'focused' | 'coffee' | 'debugging';
}

// Имитация базы данных комментариев разработчиков
const devComments: DevComment[] = [
  {
    id: '1',
    author: 'Вадим',
    message: 'Фиксим последние баги перед релизом! 🐛',
    timestamp: Date.now() - 1000 * 60 * 5,
    avatar: '👨‍💻',
    mood: 'debugging'
  },
  {
    id: '2',
    author: 'Анна',
    message: 'Добавила новые анимации, выглядит круто! ✨',
    timestamp: Date.now() - 1000 * 60 * 15,
    avatar: '👩‍🎨',
    mood: 'excited'
  },
  {
    id: '3',
    author: 'Максим',
    message: 'Оптимизировал производительность, теперь летает! 🚀',
    timestamp: Date.now() - 1000 * 60 * 30,
    avatar: '⚡',
    mood: 'focused'
  },
  {
    id: '4',
    author: 'Елена',
    message: 'Уже 3-я чашка кофе... но мы почти закончили! ☕',
    timestamp: Date.now() - 1000 * 60 * 45,
    avatar: '☕',
    mood: 'coffee'
  },
  {
    id: '5',
    author: 'Дмитрий',
    message: 'Интеграция с API работает идеально 💪',
    timestamp: Date.now() - 1000 * 60 * 60,
    avatar: '🔧',
    mood: 'focused'
  },
  {
    id: '6',
    author: 'Софья',
    message: 'Дизайн готов, переходим к тестированию! 🎯',
    timestamp: Date.now() - 1000 * 60 * 75,
    avatar: '🎨',
    mood: 'excited'
  }
];

// Статистика источников запросов
interface SourceStats {
  [key: string]: number;
}

const sourceStats: SourceStats = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'direct';
  const action = searchParams.get('action') || 'get-comments';
  
  // Отслеживаем источник запроса
  if (action === 'track-source') {
    sourceStats[source] = (sourceStats[source] || 0) + 1;
    
    return NextResponse.json({
      success: true,
      tracked: source,
      totalSources: Object.keys(sourceStats).length,
      stats: sourceStats
    });
  }
  
  // Возвращаем комментарии разработчиков
  if (action === 'get-comments') {
    const page = parseInt(searchParams.get('page') || '0');
    const limit = parseInt(searchParams.get('limit') || '3');
    
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const paginatedComments = devComments.slice(startIndex, endIndex);
    
    return NextResponse.json({
      comments: paginatedComments,
      total: devComments.length,
      page,
      hasMore: endIndex < devComments.length,
      sourceStats: Object.keys(sourceStats).length > 0 ? sourceStats : null
    });
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, message, mood = 'focused' } = body;
    
    if (!author || !message) {
      return NextResponse.json(
        { error: 'Author and message are required' },
        { status: 400 }
      );
    }
    
    const newComment: DevComment = {
      id: Date.now().toString(),
      author,
      message,
      timestamp: Date.now(),
      avatar: mood === 'coffee' ? '☕' : mood === 'debugging' ? '🐛' : '👨‍💻',
      mood
    };
    
    devComments.unshift(newComment);
    
    // Ограничиваем количество комментариев
    if (devComments.length > 20) {
      devComments.splice(20);
    }
    
    return NextResponse.json({
      success: true,
      comment: newComment,
      total: devComments.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}
