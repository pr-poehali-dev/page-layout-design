import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type UserRole = 'guest' | 'reader' | 'librarian' | 'admin';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cabinet' | 'admin' | 'login'>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [catalogMenu, setCatalogMenu] = useState<string>('electronic');
  const [cabinetMenu, setCabinetMenu] = useState<string>('mybooks');
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    available: false,
    electronic: false,
    inStock: false
  });

  const newBooks = [
    { id: 1, title: 'Основы программирования', author: 'Иванов А.С.', hall: 2, shelf: 4, status: 'available' },
    { id: 2, title: 'Алгоритмы и структуры данных', author: 'Петров В.К.', hall: 3, shelf: 1, status: 'reserved' },
    { id: 3, title: 'История Древнего Рима', author: 'Сидоров П.М.', hall: 1, shelf: 5, status: 'available' },
    { id: 4, title: 'Квантовая физика', author: 'Смирнова Е.Л.', hall: 2, shelf: 3, status: 'available' },
    { id: 5, title: 'Современная литература', author: 'Козлов Д.А.', hall: 4, shelf: 2, status: 'available' },
  ];

  const searchResults = [
    { id: 1, title: 'Основы программирования', author: 'Иванов А.С.', hall: 2, shelf: 4, status: 'available' },
    { id: 2, title: 'Алгоритмы и структуры данных', author: 'Петров В.К.', hall: 3, shelf: 1, status: 'reserved' },
    { id: 3, title: 'История Древнего Рима', author: 'Сидоров П.М.', hall: 1, shelf: 5, status: 'available' },
  ];

  const activeReaders = [
    { id: 1, name: 'Дмитрий Иванов', books: 3, overdueBooks: 1 },
    { id: 2, name: 'Ольга Петрова', books: 2, overdueBooks: 0 },
    { id: 3, name: 'Анна Козлова', books: 1, overdueBooks: 0 },
    { id: 4, name: 'Сергей Смирнов', books: 4, overdueBooks: 2 },
    { id: 5, name: 'Мария Новикова', books: 2, overdueBooks: 0 },
  ];

  const systemEvents = [
    { id: 1, time: '2025-11-18 19:40:45', event: 'Вход: Ольга С.' },
    { id: 2, time: '2025-11-18 19:45:45', event: 'Ошибка: Петров Д. (неверный пароль)' },
    { id: 3, time: '2025-11-19 08:12:30', event: 'Выдача: Иванов А. - "Квантовая физика"' },
    { id: 4, time: '2025-11-19 10:22:15', event: 'Возврат: Сидорова М. - "История искусств"' },
  ];

  const renderNavigation = () => (
    <nav className="bg-[#1A1F2C] text-white border-b border-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-3 px-4">
          <div className="text-lg font-medium">Библиотека "Золотой рассвет"</div>
          <div className="flex items-center gap-4">
            {userRole !== 'guest' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">
                  {userRole === 'admin' ? 'Анна К.' : userRole === 'librarian' ? 'Ольга С.' : 'Дмитрий Иванов'}
                </span>
                <Button variant="ghost" size="sm" onClick={() => setUserRole('guest')} className="text-white hover:bg-gray-700">
                  [Выйти]
                </Button>
              </div>
            )}
            {userRole === 'guest' && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setCurrentPage('login')} className="text-white hover:bg-gray-700">
                  Войти
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  Поиск
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex border-t border-gray-700">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentPage('home')}
            className={`rounded-none text-white hover:bg-gray-700 px-6 py-3 ${currentPage === 'home' ? 'bg-gray-700' : ''}`}
          >
            Главная
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setCurrentPage('catalog')}
            className={`rounded-none text-white hover:bg-gray-700 px-6 py-3 ${currentPage === 'catalog' ? 'bg-gray-700' : ''}`}
          >
            Каталог
          </Button>
          <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
            Новости
          </Button>
          <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
            Эл.ресурсы
          </Button>
          <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
            Контакты
          </Button>
          {userRole !== 'guest' && (
            <Button 
              variant="ghost"
              onClick={() => setCurrentPage('cabinet')}
              className={`rounded-none text-white hover:bg-gray-700 px-6 py-3 ${currentPage === 'cabinet' ? 'bg-gray-700' : ''}`}
            >
              Личный кабинет
            </Button>
          )}
          {userRole === 'admin' && (
            <>
              <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
                Пользователи
              </Button>
              <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
                Безопасность
              </Button>
              <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
                Отчёты
              </Button>
              <Button variant="ghost" className="rounded-none text-white hover:bg-gray-700 px-6 py-3">
                Редактирование
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setCurrentPage('admin')}
                className={`rounded-none text-white hover:bg-gray-700 px-6 py-3 ${currentPage === 'admin' ? 'bg-gray-700' : ''}`}
              >
                Система
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const renderHomePage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">ПОИСК</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="[Найти]" className="w-full" />
            <div className="text-sm text-gray-600 space-y-1">
              <div>[Расширенный поиск]</div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">НОВОСТИ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="hover:text-[#0EA5E9] cursor-pointer">Новые поступления</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Изменения в графике</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Мероприятия</div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">БЫСТРЫЕ ССЫЛКИ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="hover:text-[#0EA5E9] cursor-pointer">Электронный каталог</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Рекомендуемая литература</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Забронировать книгу</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Продлить онлайн</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Учебные пособия</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">Научные работы</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">НОВЫЕ ПОСТУПЛЕНИЯ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {newBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gray-200 rounded mb-3 flex items-center justify-center">
                    <div className="text-gray-400 text-sm text-center px-2">Обложка книги</div>
                  </div>
                  <div className="text-xs text-gray-600 truncate">{book.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCatalogPage = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <aside className="w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">КАТАЛОГ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <button
                onClick={() => setCatalogMenu('electronic')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  catalogMenu === 'electronic' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Электронный каталог
              </button>
              <button
                onClick={() => setCatalogMenu('new')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  catalogMenu === 'new' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Новые поступления
              </button>
              <button
                onClick={() => setCatalogMenu('recommended')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  catalogMenu === 'recommended' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Рекомендуемая литература
              </button>
              <button
                onClick={() => setCatalogMenu('topics')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  catalogMenu === 'topics' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — По тематикам
              </button>
              <button
                onClick={() => setCatalogMenu('authors')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  catalogMenu === 'authors' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — По авторам
              </button>
            </CardContent>
          </Card>
        </aside>
        <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-4">Поиск по каталогу:</h1>
        <div className="flex gap-2 mb-6">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1" 
            placeholder="Введите название, автора или ISBN..." 
          />
          <Button className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">[Найти]</Button>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium mb-3">Расширенные фильтры:</div>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.available}
                onChange={(e) => setFilters({...filters, available: e.target.checked})}
              />
              <span>Только доступные</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.electronic}
                onChange={(e) => setFilters({...filters, electronic: e.target.checked})}
              />
              <span>Электронные версии</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
              />
              <span>В наличии</span>
            </label>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Результаты поиска (найдено ...):</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {searchResults.map((book, index) => (
              <div key={book.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium">{index + 1}. {book.title} / {book.author}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Зал №{book.hall}, стеллаж {book.shelf} | {book.status === 'available' ? 'Доступна' : 'Забронирована'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">[Видеть]</Button>
                    <Button size="sm" variant="outline">[Забронировать]</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2 text-sm">
            <Button variant="ghost" size="sm">[1]</Button>
            <Button variant="ghost" size="sm">[2]</Button>
            <Button variant="ghost" size="sm">[3]</Button>
            <Button variant="ghost" size="sm">[4]</Button>
            <Button variant="ghost" size="sm">[5]</Button>
            <span className="px-2">...</span>
            <Button variant="ghost" size="sm">[Следующая &gt;]</Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );

  const renderLibrarianCabinet = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <aside className="w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Личный кабинет</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <button
                onClick={() => setCabinetMenu('mybooks')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  cabinetMenu === 'mybooks' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Мои книги
              </button>
              <button
                onClick={() => setCabinetMenu('history')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  cabinetMenu === 'history' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — История операций
              </button>
              <button
                onClick={() => setCabinetMenu('reservations')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  cabinetMenu === 'reservations' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Бронирования
              </button>
              <button
                onClick={() => setCabinetMenu('notifications')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  cabinetMenu === 'notifications' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Уведомления
              </button>
              <button
                onClick={() => setCabinetMenu('settings')}
                className={`w-full text-left px-3 py-2 text-sm hover:text-[#0EA5E9] transition-colors ${
                  cabinetMenu === 'settings' ? 'text-[#0EA5E9] font-medium' : 'text-gray-700'
                }`}
              >
                — Настройки
              </button>
            </CardContent>
          </Card>
        </aside>
        <div className="flex-1">
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-1">Система "Золотой рассвет" - Библиотекарь</h1>
      </div>

      <Tabs defaultValue="issue" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issue">Выдача/возврат</TabsTrigger>
          <TabsTrigger value="catalog">Каталог</TabsTrigger>
          <TabsTrigger value="readers">Читатели</TabsTrigger>
          <TabsTrigger value="reports">Отчёты</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">БЫСТРЫЕ ДЕЙСТВИЯ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="hover:text-[#0EA5E9] cursor-pointer">[Поиск читателя]</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">[Поиск книги]</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">[Новая выдача]</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">[Возврат книги]</div>
            <div className="hover:text-[#0EA5E9] cursor-pointer">[Списание]</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">СЕГОДНЯ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Статистика</div>
              <div className="mt-2 space-y-1 text-sm">
                <div>Выдано: <span className="font-medium">25</span></div>
                <div>Возвращено: <span className="font-medium">18</span></div>
                <div>Забронировано: <span className="font-medium">12</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">УВЕДОМЛЕНИЯ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="text-gray-700">3 книги с просрочкой</div>
            <div className="text-gray-700">Новый читатель</div>
            <div className="text-gray-700">Заканчивается бумага</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">АКТИВНЫЕ ЧИТАТЕЛИ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {activeReaders.map((reader) => (
              <Card key={reader.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-full mb-3 flex items-center justify-center mx-auto w-20 h-20">
                    <Icon name="User" size={32} className="text-gray-400" />
                  </div>
                  <div className="text-xs text-center">
                    <div className="font-medium mb-1">{reader.name}</div>
                    <div className="text-gray-600">Книг: {reader.books}</div>
                    {reader.overdueBooks > 0 && (
                      <Badge variant="destructive" className="mt-1 text-xs">
                        Просрочка: {reader.overdueBooks}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl mb-4">ВХОД В СИСТЕМУ</CardTitle>
          <div className="flex items-center justify-center gap-2 text-base">
            <Icon name="BookOpen" size={24} className="text-[#0EA5E9]" />
            <span className="font-medium">БИБЛИОТЕКА «БИБЛИОСФЕРА»</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-[#0EA5E9] rounded-lg p-6">
            <h3 className="text-center font-medium mb-6">АВТОРИЗАЦИЯ</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Логин:
                </label>
                <Input
                  value={loginData.login}
                  onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Пароль:
                </label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <button className="text-sm text-[#0EA5E9] hover:underline">
                  [ Забыли пароль? ]
                </button>
              </div>
              <div className="flex justify-center pt-2">
                <Button
                  className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 px-8"
                  onClick={() => {
                    setUserRole('librarian');
                    setCurrentPage('cabinet');
                  }}
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  ВОЙТИ В СИСТЕМУ
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600 pt-4">
                Или войти как:
                <div className="flex justify-center gap-4 mt-2">
                  <button
                    onClick={() => {
                      setUserRole('reader');
                      setCurrentPage('cabinet');
                    }}
                    className="text-[#0EA5E9] hover:underline"
                  >
                    [ Читатель ]
                  </button>
                  <button className="text-[#0EA5E9] hover:underline">
                    [ Библиотекарь ]
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setCurrentPage('admin');
                    }}
                    className="text-[#0EA5E9] hover:underline"
                  >
                    [ Админ ]
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-sm text-gray-600 hover:text-[#0EA5E9]"
            >
              [ &lt; Вернуться на главную ]
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-medium mb-1">Система "Золотой рассвет" - Администратор</h1>
      </div>

      <Tabs defaultValue="users" className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="reports">Отчёты</TabsTrigger>
          <TabsTrigger value="edit">Редактирование</TabsTrigger>
          <TabsTrigger value="system">Система</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">СТАТУС СИСТЕМЫ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>Система активна</div>
            <div>Нагрузка: ...%</div>
            <div>Пользователей: .../....</div>
            <div>Uptime: ...%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">СИСТЕМНЫЕ УВЕДОМЛЕНИЯ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="text-gray-700">Доступно обновление</div>
            <div className="text-gray-700">Резервная копия завершена</div>
            <div className="text-gray-700">2 крит. ошибки</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ЖУРНАЛ СОБЫТИЙ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {systemEvents.map((event) => (
              <div key={event.id} className="border-b pb-2 last:border-b-0">
                <div className="text-gray-500">{event.time}</div>
                <div className="text-gray-700">{event.event}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">БЫСТРЫЕ ДЕЙСТВИЯ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4">[Управление пользователями]</Button>
            <Button variant="outline" className="h-auto py-4">[Резервное копирование]</Button>
            <Button variant="outline" className="h-auto py-4">[Аналитика]</Button>
            <Button variant="outline" className="h-auto py-4">[Настройка безопасности]</Button>
            <Button variant="outline" className="h-auto py-4">[Просмотр логов]</Button>
            <Button variant="outline" className="h-auto py-4">[Обновления]</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      {renderNavigation()}
      
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'catalog' && renderCatalogPage()}
      {currentPage === 'cabinet' && renderLibrarianCabinet()}
      {currentPage === 'admin' && renderAdminPanel()}
      {currentPage === 'login' && renderLoginPage()}

      {userRole === 'guest' && currentPage === 'home' && (
        <div className="fixed bottom-8 right-8">
          <Card className="shadow-lg">
            <CardContent className="p-4 space-y-2">
              <div className="text-sm font-medium mb-3">Демо-режимы:</div>
              <Button 
                size="sm" 
                className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                onClick={() => setUserRole('librarian')}
              >
                Войти как библиотекарь
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="w-full"
                onClick={() => setUserRole('admin')}
              >
                Войти как администратор
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;