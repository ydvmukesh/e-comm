import { tr } from "date-fns/locale"

export interface FilterOption {
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  name: string
  options: FilterOption[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  domain: "electronics" | "fashion" | "home"
  subcategories: Subcategory[]
  filterGroups: FilterGroup[]
}

export interface ProductAttribute {
  name: string
  value: string
}

export interface ProductVariant {
  id: string
  name: string // e.g., "Color", "Size"
  options: { label: string; value: string; inStock: boolean }[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  brand?: string
  image: string
  images: string[] // Added for gallery
  variants?: ProductVariant[] // Added for options
  rating: number
  reviews: number
  featured?: boolean
  inStock: boolean
  features?: string[]
  attributes?: ProductAttribute[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    slug: "electronics",
    image: "/electronics-category.png",
    description: "Discover cutting-edge technology and premium electronics",
    domain: "electronics",
    subcategories: [
      { id: "sub1", name: "Earbuds", slug: "earbuds" },
      { id: "sub2", name: "Headphones", slug: "headphones" },
      { id: "sub3", name: "Chargers", slug: "chargers" },
      { id: "sub4", name: "Smart Devices", slug: "smart-devices" },
    ],
    filterGroups: [
      {
        id: "brand",
        name: "Brand",
        options: [
          { label: "Apple", value: "apple" },
          { label: "Sony", value: "sony" },
          { label: "Bose", value: "bose" },
          { label: "Samsung", value: "samsung" },
        ],
      },
      {
        id: "connectivity",
        name: "Connectivity",
        options: [
          { label: "Wireless", value: "wireless" },
          { label: "Wired", value: "wired" },
        ],
      },
    ],
  },
  {
    id: "cat2",
    name: "Fashion",
    slug: "fashion",
    image: "/fashion-category.png",
    description: "Timeless fashion pieces for the modern wardrobe",
    domain: "fashion",
    subcategories: [
      { id: "sub5", name: "Shirts", slug: "shirts" },
      { id: "sub6", name: "T-Shirts", slug: "tshirts" },
      { id: "sub7", name: "Accessories", slug: "accessories" },
      { id: "sub8", name: "Jeans", slug: "jeans" },
    ],
    filterGroups: [
      {
        id: "size",
        name: "Size",
        options: [
          { label: "S", value: "s" },
          { label: "M", value: "m" },
          { label: "L", value: "l" },
          { label: "XL", value: "xl" },
        ],
      },
      {
        id: "material",
        name: "Material",
        options: [
          { label: "Cotton", value: "cotton" },
          { label: "Linen", value: "linen" },
          { label: "Silk", value: "silk" },
          { label: "Denim", value: "denim" },
        ],
      },
    ],
  },
  {
    id: "cat3",
    name: "Home Decor",
    slug: "home-decor",
    image: "/home-decor-category.png",
    description: "Elegant pieces to transform your living space",
    domain: "home",
    subcategories: [
      { id: "sub9", name: "Lighting", slug: "lighting" },
      { id: "sub10", name: "Tableware", slug: "tableware" },
      { id: "sub11", name: "Decorative", slug: "decorative" },
      { id: "sub12", name: "Furniture", slug: "furniture" },
    ],
    filterGroups: [
      {
        id: "room",
        name: "Room",
        options: [
          { label: "Living Room", value: "living" },
          { label: "Bedroom", value: "bedroom" },
          { label: "Office", value: "office" },
          { label: "Kitchen", value: "kitchen" },
        ],
      },
    ],
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "A clean, modern desk lamp with adjustable brightness and color temperature.",
    price: 89,
    category: "Home Decor",
    subcategory: "lighting",
    brand: "Modern Home",
    image: "/minimalist-desk-lamp.png",
    images: ["/minimalist-desk-lamp.png", "/ceramic-coffee-set.png", "/minimalist-desk-lamp.png"],
    variants: [
      {
        id: "color",
        name: "Color",
        options: [
          { label: "Matte Black", value: "black", inStock: true },
          { label: "Snow White", value: "white", inStock: true },
          { label: "Soft Sand", value: "sand", inStock: false },
        ],
      },
    ],
    rating: 4.8,
    reviews: 124,
    featured: true,
    inStock: true,
    features: ["Dimmable", "USB Charging Port", "LED Technology"],
    attributes: [
      { name: "Room", value: "office" },
      { name: "Style", value: "minimalist" },
    ],
  },
  {
    id: "2",
    name: "Premium Wireless Headphones",
    description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
    price: 299,
    originalPrice: 349,
    category: "Electronics",
    subcategory: "headphones",
    brand: "Sony",
    image: "/premium-headphones.png",
    images: ["/premium-headphones.png", "/premium-headphones.png", "/premium-headphones.png"],
    variants: [
      {
        id: "color",
        name: "Finish",
        options: [
          { label: "Midnight Blue", value: "blue", inStock: true },
          { label: "Graphite", value: "graphite", inStock: true },
        ],
      },
    ],
    rating: 4.9,
    reviews: 850,
    featured: true,
    inStock: true,
    features: ["Noise Cancelling", "Bluetooth 5.2", "40h Battery"],
    attributes: [
      { name: "Brand", value: "sony" },
      { name: "Connectivity", value: "wireless" },
    ],
  },
  {
    id: "3",
    name: "Cotton Linen Shirt",
    description: "Breathable and stylish shirt made from a premium cotton-linen blend.",
    price: 65,
    category: "Fashion",
    subcategory: "shirts",
    brand: "Classic Wear",
    image: "/light-blue-linen-shirt.png",
    images: ["/light-blue-linen-shirt.png", "/light-blue-linen-shirt.png"],
    variants: [
      {
        id: "size",
        name: "Size",
        options: [
          { label: "S", value: "s", inStock: true },
          { label: "M", value: "m", inStock: true },
          { label: "L", value: "l", inStock: true },
          { label: "XL", value: "xl", inStock: false },
        ],
      },
      {
        id: "color",
        name: "Color",
        options: [
          { label: "Sky Blue", value: "sky-blue", inStock: true },
          { label: "Pure White", value: "white", inStock: true },
        ],
      },
    ],
    rating: 4.5,
    reviews: 210,
    featured: true,
    inStock: true,
    features: ["100% Organic", "Breathable", "Pre-shrunk"],
    attributes: [
      { name: "Size", value: "m" },
      { name: "Material", value: "linen" },
    ],
  },
  {
    id: "4",
    name: "Ceramic Coffee Set",
    description: "Handcrafted ceramic mugs and dripper set for the perfect morning brew.",
    price: 45,
    category: "Home Decor",
    subcategory: "tableware",
    brand: "Artisan Co",
    image: "/ceramic-coffee-set.png",
    images: ["/ceramic-coffee-set.png", "/minimalist-desk-lamp.png", "/premium-headphones.png"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    features: ["Dishwasher Safe", "Hand-glazed", "Gift Boxed"],
    attributes: [{ name: "Room", value: "kitchen" }],
  },
  {
    id: "5",
    name: "Noise Cancelling Earbuds",
    description: "Compact earbuds with world-class noise cancellation and spatial audio.",
    price: 199,
    category: "Electronics",
    subcategory: "earbuds",
    brand: "Apple",
    image: "/minimalist-desk-lamp.png",
    images: ["/minimalist-desk-lamp.png", "/premium-headphones.png", "/ceramic-coffee-set.png"],
    variants: [
      {
        id: "color",
        name: "Color",
        options: [
          { label: "Matte Black", value: "black", inStock: true },
          { label: "Snow White", value: "white", inStock: true },
        ],
      },
    ],
    rating: 4.6,
    reviews: 312,
    featured: true,
    inStock: true,
    features: ["IPX4 Water Resistant", "Transparency Mode"],
    attributes: [
      { name: "Brand", value: "apple" },
      { name: "Connectivity", value: "wireless" },
    ],
  },
  {
    id: "6",
    name: "USB-C Fast Charger",
    description: "65W fast charging adapter with multiple port support.",
    price: 39,
    category: "Electronics",
    subcategory: "chargers",
    brand: "Samsung",
    image: "/ceramic-coffee-set.png",
    images: ["/ceramic-coffee-set.png"],
    rating: 4.4,
    reviews: 89,
    featured: true,
    inStock: true,
    features: ["65W Power", "Multi-port", "Compact Design"],
    attributes: [
      { name: "Brand", value: "samsung" },
      { name: "Connectivity", value: "wired" },
    ],
  },
  {
    id: "7",
    name: "Cotton T-Shirt Pack",
    description: "Premium cotton t-shirts in classic colors. Pack of 3.",
    price: 45,
    category: "Fashion",
    subcategory: "tshirts",
    brand: "Essential Basics",
    image: "/cotton-tshirts.jpg",
    images: ["/cotton-tshirts.jpg"],
    rating: 4.6,
    reviews: 234,
    featured: false,
    inStock: true,
    features: ["100% Cotton", "Pre-shrunk", "Pack of 3"],
    attributes: [
      { name: "Size", value: "m" },
      { name: "Material", value: "cotton" },
    ],
  },
  {
    id: "8",
    name: "Leather Wallet",
    description: "Minimalist leather wallet with RFID protection.",
    price: 55,
    category: "Fashion",
    subcategory: "accessories",
    brand: "Premium Leather",
    image: "/leather-wallet.jpg",
    images: ["/leather-wallet.jpg"],
    rating: 4.7,
    reviews: 156,
    featured: false,
    inStock: false,
    features: ["RFID Protection", "Genuine Leather", "Slim Design"],
    attributes: [{ name: "Material", value: "leather" }],
  },
  {
    id: "9",
    name: "USB-C Fast Charger",
    description: "65W fast charging adapter with multiple port support.",
    price: 39,
    category: "Electronics",
    subcategory: "chargers",
    brand: "Samsung",
    image: "/ceramic-coffee-set.png",
    images: ["/ceramic-coffee-set.png"],
    rating: 4.4,
    reviews: 89,
    featured: false,
    inStock: true,
    features: ["65W Power", "Multi-port", "Compact Design"],
    attributes: [
      { name: "Brand", value: "samsung" },
      { name: "Connectivity", value: "wired" },
    ],
  },
  {
    id: "10",
    name: "Cotton T-Shirt Pack",
    description: "Premium cotton t-shirts in classic colors. Pack of 3.",
    price: 45,
    category: "Fashion",
    subcategory: "tshirts",
    brand: "Essential Basics",
    image: "/cotton-tshirts.jpg",
    images: ["/cotton-tshirts.jpg"],
    rating: 4.6,
    reviews: 234,
    featured: false,
    inStock: true,
    features: ["100% Cotton", "Pre-shrunk", "Pack of 3"],
    attributes: [
      { name: "Size", value: "m" },
      { name: "Material", value: "cotton" },
    ],
  },
  {
    id: "11",
    name: "Leather Wallet",
    description: "Minimalist leather wallet with RFID protection.",
    price: 55,
    category: "Fashion",
    subcategory: "accessories",
    brand: "Premium Leather",
    image: "/leather-wallet.jpg",
    images: ["/leather-wallet.jpg"],
    rating: 4.7,
    reviews: 156,
    featured: false,
    inStock: false,
    features: ["RFID Protection", "Genuine Leather", "Slim Design"],
    attributes: [{ name: "Material", value: "leather" }],
  }
]

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Architect",
    content:
      "The quality of the products is exceptional. Every item I've purchased has a timeless design that fits perfectly in my studio.",
    avatar: "/woman-portrait.png",
    rating: 5,
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Graphic Designer",
    content:
      "Minimal and functional. Exactly what I was looking for. The customer service was also incredibly helpful when I had a question about my order.",
    avatar: "/thoughtful-man-portrait.png",
    rating: 5,
  },
  {
    id: "t3",
    name: "Emma Williams",
    role: "Interior Designer",
    content:
      "Outstanding experience from start to finish. The products arrived beautifully packaged and the attention to detail is remarkable.",
    avatar: "/woman-portrait.png",
    rating: 5,
  },
  {
    id: "t4",
    name: "David Martinez",
    role: "Software Engineer",
    content:
      "I've ordered multiple times and each experience has been flawless. The product quality consistently exceeds expectations.",
    avatar: "/thoughtful-man-portrait.png",
    rating: 5,
  },
  {
    id: "t5",
    name: "Lisa Anderson",
    role: "Marketing Director",
    content:
      "The perfect blend of style and functionality. These products have transformed my workspace into something I'm truly proud of.",
    avatar: "/woman-portrait.png",
    rating: 5,
  },
  {
    id: "t6",
    name: "James Wilson",
    role: "Creative Director",
    content:
      "Exceptional craftsmanship and beautiful design. Every purchase feels like an investment in quality and timeless style.",
    avatar: "/thoughtful-man-portrait.png",
    rating: 5,
  }
]
