'use client';

import { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Breadcrumb from '@/components/ui/Breadcrumb';

const faqs = [
  { question: "Delivery timeframe?", answer: "2-4 business days for major cities." },
  { question: "Returns?", answer: "7-day no-questions return policy." }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <h1 className="text-4xl font-black mt-8 mb-12">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full text-left font-bold text-lg flex justify-between">
              <span>{faq.question}</span>
              {openIndex === i ? <Minus /> : <Plus />}
            </button>
            {openIndex === i && <p className="mt-4 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
