import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-blue-500 transition-colors flex items-center"
            >
              {index === 0 && <Home className="w-3 h-3 mr-1" />}
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
