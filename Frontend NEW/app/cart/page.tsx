"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, ShoppingBag, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const [checkoutData, setCheckoutData] = useState({ name: "", email: "" })
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "error">("idle")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!checkoutData.name.trim()) {
      errors.name = "Name is required"
    }
    if (!checkoutData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.email)) {
      errors.email = "Please enter a valid email"
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCheckout = async () => {
    if (!validateForm()) return

    setCheckoutStatus("loading")

    try {
      const response = await fetch("https://api.example.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            size: item.size,
            quantity: item.quantity,
          })),
          customerName: checkoutData.name,
          customerEmail: checkoutData.email,
        }),
      })

      if (!response.ok) throw new Error("Checkout failed")

      const data = await response.json()

      // Redirect to Stripe checkout or success page
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (error) {
      setCheckoutStatus("error")
      console.error("[v0] Checkout error:", error)
    } finally {
      setCheckoutStatus("idle")
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          </div>
          <h1 className="text-4xl font-serif mb-3">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Looks like you haven't added any coffee to your cart yet. Explore our collection to find your new favorite.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Coffee</Link>
          </Button>
        </div>
      </main>
    )
  }

  const subtotal = getTotal()

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif mb-2">Your Cart</h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-6 p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif text-xl mb-1">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.product.origin} • <span className="font-medium">{item.size}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted/40 rounded-lg p-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 hover:bg-background rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-1.5 hover:bg-background rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-muted/40 p-8 rounded-2xl sticky top-24 space-y-6">
              <h2 className="text-2xl font-serif">Order Summary</h2>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pb-6 border-b border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-accent">Calculated at checkout</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline text-xl">
                <span className="font-medium">Total</span>
                <span className="font-bold text-2xl">${subtotal.toFixed(2)}</span>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="checkout-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="checkout-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={checkoutData.name}
                    onChange={(e) => {
                      setCheckoutData({ ...checkoutData, name: e.target.value })
                      if (validationErrors.name) {
                        const newErrors = { ...validationErrors }
                        delete newErrors.name
                        setValidationErrors(newErrors)
                      }
                    }}
                    className={`mt-2 ${validationErrors.name ? "border-destructive" : ""}`}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="checkout-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={checkoutData.email}
                    onChange={(e) => {
                      setCheckoutData({ ...checkoutData, email: e.target.value })
                      if (validationErrors.email) {
                        const newErrors = { ...validationErrors }
                        delete newErrors.email
                        setValidationErrors(newErrors)
                      }
                    }}
                    className={`mt-2 ${validationErrors.email ? "border-destructive" : ""}`}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full py-6 text-base font-medium"
                onClick={handleCheckout}
                disabled={checkoutStatus === "loading"}
              >
                {checkoutStatus === "loading" ? "Processing..." : "Proceed to Checkout"}
              </Button>

              {checkoutStatus === "error" && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Checkout failed. Please try again.</span>
                </div>
              )}

              {/* Continue Shopping */}
              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
