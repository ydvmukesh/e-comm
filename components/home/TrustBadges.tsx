import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders over $50',
  },
  {
    icon: RotateCcw,
    title: '7-Day Returns',
    description: 'Easy return policy',
  },
  {
    icon: Shield,
    title: '100% Secure Payment',
    description: 'Your data is protected',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
