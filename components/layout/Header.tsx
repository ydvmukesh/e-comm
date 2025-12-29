'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  User as UserIcon, 
  Menu, 
  ChevronDown,
  Package,
  LogOut,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuthStore } from '@/lib/store/authStore';
import MobileNav from './MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCartStore();
  const { user, isAuthenticated, logout, openAuthModal } = useAuthStore();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/products' },
    { label: 'Earbuds', href: '/products?category=earbuds' },
    { label: 'Headphones', href: '/products?category=headphones' },
    { label: 'Smart Watches', href: '/products?category=smart-watches' },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-[100] transition-all duration-500",
      isScrolled 
        ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-100/50 py-3" 
        : "bg-white py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">Electro<span className="text-blue-500">Shop</span></span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search premium accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
            />
          </form>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold tracking-tight transition-all",
                  pathname === link.href 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons Context */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link 
              href="/cart"
              className="relative p-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-100 hidden sm:block" />

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition group"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">
                    {user?.name.charAt(0)}
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-[101]" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100 p-3 z-[102] animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="px-4 py-3 mb-2 border-b border-gray-50">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Welcome</p>
                        <p className="text-sm font-black text-gray-900 truncate">{user?.name}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-2xl text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        href="/orders" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-2xl text-sm font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
                      >
                        <Package className="w-4 h-4" />
                        <span>Order History</span>
                      </Link>
                      <Link 
                        href="/profile#settings" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-2xl text-sm font-bold text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <div className="h-px bg-gray-50 my-2" />
                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center space-x-3 p-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => openAuthModal('login')}
                className="hidden sm:flex items-center space-x-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shadow-xl shadow-gray-200"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-blue-50 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;
