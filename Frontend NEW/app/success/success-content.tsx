"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Mail } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"

export function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  const sessionId = searchParams.get("session_id")
  const orderNumber = searchParams.get("order_id") || `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  useEffect(() => {
    setMounted(true)
    clearCart()

    const redirectTimer = setTimeout(() => {
      router.push("/")
    }, 10000)

    return () => clearTimeout(redirectTimer)
  }, [clearCart, router])

  if (!mounted) return null

  return (
    <main className="min-h-screen py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
              <CheckCircle2 className="h-20 w-20 text-accent relative" />
            </div>
          </div>
          <h1 className="text-5xl font-serif mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your order. We're getting your coffee ready to ship.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 mb-8 space-y-6">
          {/* Order Number */}
          <div className="flex items-center justify-between pb-6 border-b border-border/50">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-bold text-lg">{orderNumber}</span>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">
                  Check your email for an order confirmation and tracking information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Package className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Roasting & Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Your coffee will be roasted to order and shipped within 2-3 business days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fresh & Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy your coffee fresh. We recommend using it within 3 weeks of receiving it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-muted/40 rounded-2xl p-6 mb-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Have questions about your order?</p>
          <a href="mailto:hello@emberandbean.com" className="text-primary font-medium hover:underline">
            Contact us at hello@emberandbean.com
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 py-6 text-base" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button size="lg" variant="outline" className="flex-1 py-6 text-base bg-transparent" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>

        {/* Auto-redirect message */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          You will be automatically redirected to the home page in 10 seconds.
        </p>
      </div>
    </main>
  )
}
