'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSent(true);
  };

  const inputClass = "w-full pl-6 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition text-gray-900 font-bold placeholder:font-medium placeholder:text-gray-300";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

      <div className="mt-12 mb-20 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900">Get in touch</h1>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Have a question about a product or order? We're here to help. 
          Send us a message and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-gray-50/50 p-4 md:p-8 rounded-[3rem]">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-8 bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mt-16" />
          
          <div className="space-y-2 relative">
            <h2 className="text-3xl font-black">Contact Information</h2>
            <p className="text-blue-100 font-medium">Say something to start a live chat!</p>
          </div>

          <div className="space-y-8 py-10 relative">
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <Phone className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg">+1 (234) 567 8910</span>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <Mail className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg">support@electroshop.com</span>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg leading-snug">132 Dartmouth Street Boston,<br/> Massachusetts 02156 United States</span>
            </div>
          </div>

          {/* Social icons placeholder */}
          <div className="flex space-x-4 pt-4 relative">
             {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 bg-white/10 rounded-full hover:bg-white/30 cursor-pointer transition" />)}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 p-4 md:p-8">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 font-medium max-w-sm">
                Thank you for reaching out. A support agent will contact you shortly.
              </p>
              <button 
                onClick={() => setIsSent(false)}
                className="text-blue-500 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input placeholder="Your Name" className={inputClass} required />
                <input placeholder="Email Address" type="email" className={inputClass} required />
              </div>
              <input placeholder="Subject" className={inputClass} required />
              <textarea 
                placeholder="How can we help?" 
                rows={6} 
                className={cn(inputClass, "resize-none")} 
                required 
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-gray-900 text-white px-12 py-5 rounded-[2rem] font-black flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-2xl shadow-gray-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
