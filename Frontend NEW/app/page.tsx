import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Zap, Award } from "lucide-react"

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

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6 inline-block">
            <span className="text-sm font-medium tracking-widest uppercase px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              Artisan Coffee from Portland
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif mb-6 text-balance leading-tight">
            Small-batch roasting, <br />
            <span className="text-accent">extraordinary coffee</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-pretty leading-relaxed text-white/90 max-w-2xl mx-auto">
            We source single-origin beans from sustainable farms and roast them to perfection. Every bag tells a story
            of craftsmanship and care.
          </p>
          <Button size="lg" asChild className="text-base px-8 py-6 rounded-full font-medium">
            <Link href="/shop" className="flex items-center gap-2">
              Explore Our Coffees <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">What makes us different</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We're committed to transparency, quality, and building lasting relationships with farmers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <Leaf className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Transparent Sourcing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We know every farmer by name and visit our partner farms regularly. You'll know exactly where your
                coffee comes from.
              </p>
            </div>
            <div className="group p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Small-Batch Roasting</h3>
              <p className="text-muted-foreground leading-relaxed">
                We roast in small quantities to ensure quality and freshness. Your coffee is roasted to order, never
                sitting on a shelf.
              </p>
            </div>
            <div className="group p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Single-Origin Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                We celebrate the unique terroir of each origin. Every bag is a journey to a specific farm and region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/coffee-roasting-equipment--artisan-roastery-interi.jpg"
              alt="Our roastery"
              className="w-full h-full object-cover"
            />
          </div>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">
            Ready to discover your new favorite coffee?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 text-pretty">
            Browse our selection of carefully sourced, expertly roasted single-origin coffees
          </p>
          <Button size="lg" variant="secondary" asChild className="text-base px-8 py-6 font-medium">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
