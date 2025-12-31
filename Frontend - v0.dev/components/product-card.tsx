"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import type { Product } from "@/app/shop/page"

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg" onClick={onSelect}>
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">{product.name}</h3>

        <p className="text-sm text-muted-foreground mb-4">
          {product.origin} • {product.roastLevel}
        </p>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-lg font-medium">${product.price12oz.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">12oz</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-lg font-medium">${product.price2lb.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">2lb</span>
        </div>

        <Button className="w-full" size="lg">
          View Details
        </Button>
      </div>
    </Card>
  )
}
