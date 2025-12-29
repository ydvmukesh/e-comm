'use client';

import { X, Home, ShoppingBag, User, Settings, Package, HelpCircle, Phone, Menu } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { user, isAuthenticated, openAuthModal } = useAuthStore();

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop All', href: '/products', icon: ShoppingBag },
    { label: 'Categories', href: '/#categories', icon: Menu },
  ];

  const accountLinks = isAuthenticated ? [
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'My Orders', href: '/orders', icon: Package },
    { label: 'Account Settings', href: '/profile#settings', icon: Settings },
  ] : [];

  const footerLinks = [
    { label: 'FAQ', href: '/faq', icon: HelpCircle },
    { label: 'Contact Us', href: '/contact', icon: Phone },
  ];

  return (
    <div className={cn(
      "fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
    )}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-out Menu */}
      <div className={cn(
        "absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black">
                {isAuthenticated ? user?.name.charAt(0) : 'E'}
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 leading-none">ElectroShop</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Premium Store</span>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Links Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Main Nav */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Navigation</h3>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Account Nav */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Your Account</h3>
            {isAuthenticated ? (
               accountLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-4 rounded-2xl text-gray-600 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span>{link.label}</span>
                    </Link>
                  );
                })
            ) : (
              <button 
                onClick={() => { onClose(); openAuthModal('login'); }}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition shadow-xl shadow-gray-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span>Login / Register</span>
              </button>
            )}
          </div>

          {/* Support Nav */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Support</h3>
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-4 rounded-2xl text-gray-500 font-bold hover:bg-amber-50 hover:text-amber-600 transition group"
                >
                  <Icon className="w-5 h-5 ml-2 mr-2" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50/80 border-t border-gray-100">
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">
             &copy; 2025 ELECTROSHOP. ALL RIGHTS RESERVED.
           </p>
        </div>
      </div>
    </div>
  );
}
