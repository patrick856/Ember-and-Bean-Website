"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart()
  const [checkoutData, setCheckoutData] = useState({ name: "", email: "" })
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "error">("idle")

  const handleCheckout = async () => {
    if (!checkoutData.name || !checkoutData.email) {
      alert("Please fill in your name and email")
      return
    }

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

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (error) {
      setCheckoutStatus("error")
      alert("Checkout failed. Please try again.")
    } finally {
      setCheckoutStatus("idle")
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any coffee to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Coffee</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-6 p-6 bg-card rounded-2xl border">
                <img
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-serif text-xl mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product.origin} • {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-background rounded disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-background rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-8 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold">${getTotal().toFixed(2)}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="checkout-name">Name</Label>
                  <Input
                    id="checkout-name"
                    type="text"
                    required
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    required
                    value={checkoutData.email}
                    onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mb-4"
                onClick={handleCheckout}
                disabled={checkoutStatus === "loading"}
              >
                {checkoutStatus === "loading" ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
