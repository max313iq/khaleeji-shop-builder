
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Store, User, Plus, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: ShoppingBag },
    { name: 'استكشاف المتاجر', href: '/explore', icon: Store },
    { name: 'المنتجات', href: '/products', icon: Store },
    { name: 'إنشاء متجر', href: '/create-store', icon: Plus },
  ];

  const authLinks = [
    { name: 'تسجيل الدخول', href: '/login', icon: LogIn },
    { name: 'إنشاء حساب', href: '/register', icon: UserPlus },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
              <div className="premium-gradient p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-pulse-glow">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">
                  متجري
                </span>
                <Sparkles className="h-4 w-4 text-premium-gold animate-pulse" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive(item.href)
                      ? 'premium-gradient text-white shadow-lg glow'
                      : 'text-gray-600 hover:text-premium-blue hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Links and Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <ThemeToggle />
            {authLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant={item.href === '/register' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex items-center space-x-2 rtl:space-x-reverse transition-all duration-300 transform hover:scale-105 ${
                      item.href === '/register' 
                        ? 'premium-gradient text-white border-0 hover:shadow-lg glow' 
                        : 'border-2 border-premium-blue/20 hover:border-premium-blue hover:bg-premium-blue/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-white/20"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-effect rounded-xl mt-2 mb-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'premium-gradient text-white shadow-md'
                        : 'text-gray-600 hover:text-premium-blue hover:bg-white/30 dark:text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                {authLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-premium-blue hover:bg-white/30 transition-all duration-300 dark:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
