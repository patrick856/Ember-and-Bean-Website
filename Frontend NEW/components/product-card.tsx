"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/app/shop/page"

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card
      onClick={onSelect}
      className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 h-full flex flex-col"
    >
      <div className="relative h-72 overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-auto">
          <h3 className="text-xl font-serif mb-2 group-hover:text-primary transition-colors">{product.name}</h3>

          <p className="text-sm text-muted-foreground mb-4">
            {product.origin} • <span className="font-medium">{product.roastLevel}</span>
          </p>

          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {product.tastingNotes.slice(0, 2).map((note) => (
                <span key={note} className="text-xs px-2 py-1 bg-accent/10 text-accent-foreground rounded-full">
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-lg font-bold">${product.price12oz.toFixed(2)}</span>
            <span className="text-muted-foreground">12oz</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-lg font-bold">${product.price2lb.toFixed(2)}</span>
            <span className="text-muted-foreground">2lb</span>
          </div>

          <Button
            size="sm"
            className="w-full group/btn"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
