"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/app/shop/page"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [size, setSize] = useState<"12oz" | "2lb">("12oz")
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const price = size === "12oz" ? product.price12oz : product.price2lb

  const handleAddToCart = () => {
    addItem(product, size, quantity)
    setAddedToCart(true)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${size})`,
    })
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-6 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif">{product.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{product.origin}</p>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Origin & Roast */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Origin</p>
                    <p className="text-foreground font-medium">{product.origin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Roast Level</p>
                    <p className="text-foreground font-medium">{product.roastLevel}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              )}

              {/* Tasting Notes */}
              {product.tastingNotes && product.tastingNotes.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium text-sm uppercase tracking-wide text-foreground mb-3">Tasting Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1.5 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="font-medium text-sm uppercase tracking-wide text-foreground mb-4">Choose Size</h3>
                <div className="flex gap-3">
                  {(["12oz", "2lb"] as const).map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => setSize(sizeOption)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        size === sizeOption
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div>{sizeOption}</div>
                      <div className="text-sm font-normal">
                        ${(sizeOption === "12oz" ? product.price12oz : product.price2lb).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="font-medium text-sm uppercase tracking-wide text-foreground mb-4">Quantity</h3>
                <div className="flex items-center gap-4 bg-muted/30 rounded-xl p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg hover:bg-background transition-colors font-medium"
                  >
                    −
                  </button>
                  <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg hover:bg-background transition-colors font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-auto space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="text-3xl font-bold">${(price * quantity).toFixed(2)}</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full py-6 text-base font-medium"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" /> Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
