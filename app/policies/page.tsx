"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { Shield, FileText, Truck, RotateCcw, Mail, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

function InfoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "privacy"

  const handleTabChange = (value: string) => {
    router.push(`/policies?tab=${value}`, { scroll: false })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Legal & Policies</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Learn about our policies, terms, and how we handle your data and orders.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="overflow-x-auto md:overflow-visible scrollbar-hide flex justify-start md:grid h-auto w-full max-w-3xl grid-cols-3 gap-2 rounded-xl p-2 shadow-sm lg:grid-cols-5">
            <TabsTrigger value="privacy" className="rounded-lg gap-2 py-3">
              <Shield className="size-4" />
              <span className="hiddens sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="refund" className="rounded-lg gap-2 py-3">
              <RotateCcw className="size-4" />
              <span className="hiddens sm:inline">Refund</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-lg gap-2 py-3">
              <Truck className="size-4" />
              <span className="hiddens sm:inline">Shipping</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="rounded-lg gap-2 py-3">
              <FileText className="size-4" />
              <span className="hiddens sm:inline">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="rounded-lg gap-2 py-3">
              <HelpCircle className="size-4" />
              <span className="hiddens sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Privacy Policy Tab */}
          <TabsContent value="privacy" className="space-y-6 outline-none">
            <Card className="border-none shadow-sm">
              <CardContent className="prose prose-sm max-w-none p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="size-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-bold m-0">Privacy Policy</h2>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Last updated: December 28, 2025
                </p>

                <section className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect information you provide directly to us, including your name, email address, 
                      shipping address, phone number, and payment information when you create an account or 
                      place an order. We also automatically collect certain information about your device and 
                      how you interact with our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Your data is used to process orders, send updates about your purchases, improve our 
                      services, and communicate with you about products and promotions. We never sell your 
                      personal information to third parties.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">3. Data Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We implement industry-standard security measures to protect your personal information, 
                      including SSL encryption for all data transmissions and secure storage of sensitive data. 
                      We regularly review and update our security practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">4. Your Rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You have the right to access, update, or delete your personal information at any time. 
                      You can also opt out of marketing communications. Contact our support team to exercise 
                      these rights.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">5. Cookies</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies and similar technologies to improve your browsing experience, analyze 
                      site traffic, and personalize content. You can control cookie preferences through your 
                      browser settings.
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Refund Policy Tab */}
          <TabsContent value="refund" className="space-y-6 outline-none">
            <Card className="border-none shadow-sm">
              <CardContent className="prose prose-sm max-w-none p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <RotateCcw className="size-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-bold m-0">Refund Policy</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Last updated: December 28, 2025
                </p>

                <section className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">30-Day Money-Back Guarantee</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer a 30-day money-back guarantee on all purchases. If you're not completely 
                      satisfied with your order, you can return it for a full refund within 30 days of 
                      delivery.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Return Conditions</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      To be eligible for a return, items must meet the following conditions:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Items must be in original condition with tags attached</li>
                      <li>Items must be unused and unwashed</li>
                      <li>Items must be in original packaging</li>
                      <li>Proof of purchase is required</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Refund Process</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Once we receive your return, we'll inspect the item and process your refund within 
                      5-7 business days. Refunds will be issued to the original payment method. Shipping 
                      costs are non-refundable unless the return is due to our error.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Exchanges</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer free exchanges for different sizes or colors. Contact our customer service 
                      team to initiate an exchange. The fastest way to ensure you get what you want is to 
                      return the item and make a separate purchase.
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Policy Tab */}
          <TabsContent value="shipping" className="space-y-6 outline-none">
            <Card className="border-none shadow-sm">
              <CardContent className="prose prose-sm max-w-none p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="size-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-bold m-0">Shipping Policy</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Last updated: December 28, 2025
                </p>

                <section className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Shipping Methods</h3>
                    <div className="space-y-4">
                      <div className="rounded-xl border p-4 bg-muted/20">
                        <h4 className="font-bold mb-2">Standard Shipping (3-5 business days)</h4>
                        <p className="text-sm text-muted-foreground m-0">
                          Free on orders over $100, otherwise $9.99
                        </p>
                      </div>
                      <div className="rounded-xl border p-4 bg-muted/20">
                        <h4 className="font-bold mb-2">Express Shipping (1-2 business days)</h4>
                        <p className="text-sm text-muted-foreground m-0">
                          $19.99 flat rate
                        </p>
                      </div>
                      <div className="rounded-xl border p-4 bg-muted/20">
                        <h4 className="font-bold mb-2">Next Day Delivery</h4>
                        <p className="text-sm text-muted-foreground m-0">
                          $29.99 flat rate (order before 2 PM)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">International Shipping</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We ship to over 100 countries worldwide. International shipping typically takes 
                      7-14 business days. Customs duties and import taxes may apply and are the 
                      responsibility of the customer.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Order Processing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Orders are processed within 1-2 business days. You'll receive a tracking number 
                      via email once your order ships. Orders placed on weekends or holidays will be 
                      processed the next business day.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Order Tracking</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Track your order anytime using the tracking number provided in your shipping 
                      confirmation email. For any issues with delivery, contact our customer service team.
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms of Service Tab */}
          <TabsContent value="terms" className="space-y-6 outline-none">
            <Card className="border-none shadow-sm">
              <CardContent className="prose prose-sm max-w-none p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="size-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-bold m-0">Terms of Service</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Last updated: December 28, 2025
                </p>

                <section className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using Elegance's website and services, you agree to be bound by these 
                      Terms of Service and all applicable laws and regulations. If you do not agree with any 
                      of these terms, you are prohibited from using this site.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">2. Use License</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Permission is granted to temporarily access the materials on Elegance's website for 
                      personal, non-commercial transitory viewing only. This is the grant of a license, not 
                      a transfer of title, and under this license you may not modify or copy the materials, 
                      use the materials for any commercial purpose, or attempt to decompile or reverse 
                      engineer any software contained on the website.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">3. Account Responsibilities</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You are responsible for maintaining the confidentiality of your account and password 
                      and for restricting access to your computer. You agree to accept responsibility for 
                      all activities that occur under your account or password.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">4. Product Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We strive to provide accurate product descriptions and pricing. However, we do not 
                      warrant that product descriptions or other content on this site is accurate, complete, 
                      reliable, current, or error-free. We reserve the right to correct any errors and to 
                      change or update information at any time without prior notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">5. Intellectual Property</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All content on this site, including text, graphics, logos, images, and software, is 
                      the property of Elegance and is protected by copyright laws. Unauthorized use of any 
                      materials on this site may violate copyright, trademark, and other laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In no event shall Elegance be liable for any damages (including, without limitation, 
                      damages for loss of data or profit, or due to business interruption) arising out of 
                      the use or inability to use the materials on our website.
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6 outline-none">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="size-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-bold">FAQs</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  Find answers to common questions about our products, orders, shipping, and more.
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {/* Ordering & Payment */}
                  <AccordionItem value="item-1" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      How do I place an order?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Simply browse our products, add items to your cart, and proceed to checkout. You'll need to 
                      provide your shipping address and payment information. Once your order is confirmed, you'll 
                      receive an email confirmation with your order details and tracking information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, 
                      and digital wallets like Apple Pay and Google Pay. All transactions are securely processed 
                      through our encrypted payment gateway.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      How long does shipping take?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Standard shipping typically takes 3-5 business days within the country. Express shipping 
                      takes 1-2 business days. International orders may take 7-14 business days depending on the 
                      destination and customs processing. Free shipping is available on orders over ₹5000.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      Can I track my order?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Yes! Once your order ships, you'll receive a tracking number via email. You can use this 
                      number to track your package in real-time. You can also track your order by logging into 
                      your account and viewing your order history.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Returns & Refunds */}
                  <AccordionItem value="item-5" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      What is your return policy?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      We offer a 30-day money-back guarantee. If you're not completely satisfied with your 
                      purchase, you can return it in its original condition with tags attached for a full refund 
                      or exchange. Items must be unused and in original packaging. Return shipping is free for 
                      defective or incorrect items.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      How do I initiate a return?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      To start a return, log into your account, go to your order history, and click "Return Item" 
                      next to the product you wish to return. Follow the prompts to print your return label and 
                      drop off the package at any authorized shipping location. You can also contact our customer 
                      service team for assistance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      When will I receive my refund?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Once we receive your return, we'll inspect the item and process your refund within 5-7 
                      business days. Refunds will be issued to your original payment method. Please allow 3-5 
                      additional business days for the refund to appear in your account, depending on your bank 
                      or card issuer.
                    </AccordionContent>
                  </AccordionItem>

                  {/* Products & Account */}
                  <AccordionItem value="item-8" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      Are the products authentic?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Yes, absolutely! We guarantee 100% authentic products. All items are sourced directly from 
                      authorized distributors and manufacturers. Every product comes with authenticity certificates 
                      where applicable, and we stand behind the quality of everything we sell.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      Do I need an account to make a purchase?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      No, you can checkout as a guest. However, creating an account offers benefits like faster 
                      checkout, order tracking, wishlist management, and access to exclusive deals. It's free and 
                      takes just a minute to sign up!
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10" className="rounded-2xl border px-6">
                    <AccordionTrigger className="hover:no-underline font-semibold py-6 text-left">
                      How can I contact customer support?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      Our customer support team is available 24/7! You can reach us via email at 
                      support@elegance.com, call us at (+099) 532-786-9843, or use the contact form on our 
                      Contact Us page. We typically respond to emails within 24 hours.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <Card className="mt-20 overflow-hidden rounded-3xl border-2 border-primary/20 bg-linear-to-br from-primary/5 to-transparent shadow-sm">
        <CardContent className="p-6 sm:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                <Mail className="size-8" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Still Have Questions?</h2>
                <p className="text-base text-muted-foreground">
                  We're here to help you 24/7
                </p>
              </div>
            </div>

            <p className="mb-8 text-center text-lg text-muted-foreground leading-relaxed">
              Our dedicated support team is ready to assist you. Send us a message and we'll get back to you within 24 hours, 
              or check out our comprehensive FAQ section for instant answers.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/30">
                <Link href="/contact">
                  <Mail className="size-5" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl border-2">
                <Link href="/policies?tab=faq">
                  <FileText className="size-5" />
                  View FAQ
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span>Expert Assistance</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InfoPage() {
  return (
    <Suspense fallback={null}>
      <InfoContent />
    </Suspense>
  )
}
