"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Loader2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Product = {
  id: string
  name: string
  origin: string
  roastLevel: string
  price12oz: number
  price2lb: number
  image: string
  description?: string
  tastingNotes?: string[]
}

const ROAST_LEVELS = ["Light", "Medium", "Dark"]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.example.com/api/products")
        if (!response.ok) throw new Error("Failed to load products")
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = selectedRoast ? products.filter((p) => p.roastLevel === selectedRoast) : products

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Oops! Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="text-primary hover:underline font-medium">
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-balance">Our Coffee Collection</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
            Discover exceptional single-origin coffees sourced directly from sustainable farms around the world.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filter by roast level</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRoast === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRoast(null)}
              className="rounded-full"
            >
              All ({products.length})
            </Button>
            {ROAST_LEVELS.map((level) => {
              const count = products.filter((p) => p.roastLevel === level).length
              return (
                <Button
                  key={level}
                  variant={selectedRoast === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRoast(level)}
                  className="rounded-full"
                >
                  {level} ({count})
                </Button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-6">No products available for selected filter</p>
            <Button variant="outline" onClick={() => setSelectedRoast(null)}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  )
}
