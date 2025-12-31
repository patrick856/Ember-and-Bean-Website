"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/app/shop/page"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [size, setSize] = useState<"12oz" | "2lb">("12oz")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const price = size === "12oz" ? product.price12oz : product.price2lb

  const handleAddToCart = () => {
    addItem(product, size, quantity)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-serif">{product.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">
                  Origin: <span className="text-foreground font-medium">{product.origin}</span>
                </p>
                <p className="text-muted-foreground">
                  Roast Level: <span className="text-foreground font-medium">{product.roastLevel}</span>
                </p>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              )}

              {product.tastingNotes && product.tastingNotes.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Tasting Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span key={note} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Bag Size</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSize("12oz")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      size === "12oz" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">12oz</div>
                    <div className="text-sm text-muted-foreground">${product.price12oz.toFixed(2)}</div>
                  </button>
                  <button
                    onClick={() => setSize("2lb")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      size === "2lb" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">2lb</div>
                    <div className="text-sm text-muted-foreground">${product.price2lb.toFixed(2)}</div>
                  </button>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span>${(price * quantity).toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
