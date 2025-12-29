import { Truck, RotateCcw, ShieldCheck, MessageSquare } from "lucide-react"

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "For all orders ₹200",
  },
  {
    icon: RotateCcw,
    title: "Returns",
    description: "Cancellation after 1 day",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payments",
    description: "Guarantee secure payments",
  },
  {
    icon: MessageSquare,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
]

export function TrustFeatures() {
  return (
    <section className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex items-start gap-2 md:gap-4 transition-transform hover:translate-y-[-2px]">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl text-slate-900">
                <feature.icon className="size-8 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-slate-900 md:text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
