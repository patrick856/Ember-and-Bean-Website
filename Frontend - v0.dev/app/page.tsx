import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="/coffee-beans-being-poured-into-roaster--warm-light.jpg"
          alt="Coffee roasting at Ember & Bean"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-serif mb-6 text-balance">
            Small-batch roasting, <br />
            extraordinary coffee
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty leading-relaxed text-white/90">
            We source single-origin beans from sustainable farms and roast them to perfection in Portland, Oregon
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full">
            <Link href="/shop">
              Explore Our Coffees <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">
              Crafted with intention, roasted with care
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              At Ember & Bean, we believe exceptional coffee starts with exceptional relationships. We work directly
              with farmers who share our commitment to sustainability and quality, ensuring every bean tells a story of
              craftsmanship and care.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              Our small-batch approach means we can carefully monitor every roast, bringing out the unique
              characteristics that make each origin special. From the first crack to the final cool, we're obsessed with
              perfection.
            </p>
            <Button variant="outline" asChild size="lg">
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <img src="/coffee-roasting-equipment--artisan-roastery-interi.jpg" alt="Our roastery" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center text-balance">What makes us different</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-serif mb-4">Transparent Sourcing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We know every farmer by name and visit our partner farms regularly. You'll know exactly where your
                coffee comes from.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔥</span>
              </div>
              <h3 className="text-2xl font-serif mb-4">Small-Batch Roasting</h3>
              <p className="text-muted-foreground leading-relaxed">
                We roast in small quantities to ensure quality and freshness. Your coffee is roasted to order, never
                sitting on a shelf.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="text-2xl font-serif mb-4">Single-Origin Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                We celebrate the unique terroir of each origin. Every bag is a journey to a specific farm and region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">
            Ready to discover your new favorite coffee?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Browse our selection of carefully sourced, expertly roasted single-origin coffees
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
