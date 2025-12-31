import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & Head Roaster",
      bio: "With 10 years of roasting experience, Sarah brings precision and passion to every batch.",
      image: "/friendly-person-in-coffee-roastery.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "Sourcing Director",
      bio: "Marcus travels to origin to build relationships with farmers and source the best beans.",
      image: "/friendly-person-working-with-coffee-equipment.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Quality Control",
      bio: "Emma cups every batch to ensure consistency and quality in every bag we ship.",
      image: "/friendly-person-smiling-in-coffee-shop.jpg",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-balance">From bean to cup, with purpose</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            We're a small team in Portland with a big passion for exceptional coffee and the people who grow it.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
            <img
              src="/coffee-farm-with-mountains-in-background--farmers-.jpg"
              alt="Coffee farm"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
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
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
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
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/person-examining-roasted-coffee-beans-closely--qua.jpg"
              alt="Quality control"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground">The passionate people behind Ember & Bean</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative h-72 mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Ready to taste the difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Explore our collection of carefully sourced, expertly roasted single-origin coffees
          </p>
          <Button size="lg" asChild className="text-base px-8 py-6">
            <Link href="/shop">Shop Coffee</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
