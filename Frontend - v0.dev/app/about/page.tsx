export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-balance">From bean to cup, with purpose</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            We're a small team in Portland with a big passion for exceptional coffee and the people who grow it
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <img src="/coffee-farm-with-mountains-in-background--farmers-.jpg" alt="Coffee farm" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-6">Our Story</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Ember & Bean was born from a simple belief: coffee tastes better when you know its story. In 2019, we
              started with a small roaster in Portland and a commitment to building direct relationships with coffee
              farmers.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              We've traveled to origin countries, walked through coffee farms at altitude, and shared meals with the
              families who grow our beans. These relationships aren't transactional—they're partnerships built on mutual
              respect and fair compensation.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Today, we're proud to work with a network of sustainable farms across Central and South America, Africa,
              and Asia. Every bag we roast carries the dedication of farmers, the richness of terroir, and our obsession
              with craft.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-serif mb-6">Our Philosophy</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              We believe in transparency at every step. When you buy our coffee, you're not just getting a bag of
              beans—you're supporting sustainable farming practices, fair wages, and a commitment to quality over
              quantity.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Our small-batch approach means we can carefully control every variable in the roasting process. We profile
              each origin to highlight its unique characteristics, whether that's the bright acidity of an Ethiopian
              natural or the chocolate notes of a Colombian washed coffee.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We're not chasing trends or cutting corners. We're dedicated to the craft of roasting exceptional coffee,
              one batch at a time.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden order-1 md:order-2">
            <img src="/person-examining-roasted-coffee-beans-closely--qua.jpg" alt="Quality control" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                <img src="/friendly-person-in-coffee-roastery.jpg" alt="Sarah Chen" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Sarah Chen</h3>
              <p className="text-muted-foreground mb-3">Founder & Head Roaster</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                With 10 years of roasting experience, Sarah brings precision and passion to every batch.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                <img src="/friendly-person-working-with-coffee-equipment.jpg" alt="Marcus Johnson" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Marcus Johnson</h3>
              <p className="text-muted-foreground mb-3">Sourcing Director</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Marcus travels to origin to build relationships with farmers and source the best beans.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                <img src="/friendly-person-smiling-in-coffee-shop.jpg" alt="Emma Rodriguez" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif mb-2">Emma Rodriguez</h3>
              <p className="text-muted-foreground mb-3">Quality Control</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Emma cups every batch to ensure consistency and quality in every bag we ship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
