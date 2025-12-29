import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Earbuds',
    slug: 'earbuds',
    description: 'True wireless earbuds with premium sound quality',
    image: '/images/categories/earbuds.jpg',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Headphones',
    slug: 'headphones',
    description: 'Over-ear and on-ear headphones for immersive audio',
    image: '/images/categories/headphones.jpg',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Chargers',
    slug: 'chargers',
    description: 'Fast charging solutions for all your devices',
    image: '/images/categories/chargers.jpg',
    productCount: 32,
  },
  {
    id: '4',
    name: 'Smart Watches',
    slug: 'smart-watches',
    description: 'Stay connected with the latest smartwatch technology',
    image: '/images/categories/smartwatches.jpg',
    productCount: 15,
  },
];
