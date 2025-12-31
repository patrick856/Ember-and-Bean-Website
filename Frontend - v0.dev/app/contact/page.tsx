"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://api.example.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send message")

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-balance">Get in Touch</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-2"
                />
              </div>

              <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && <p className="text-sm text-green-600">Thank you! We'll get back to you soon.</p>}
              {status === "error" && (
                <p className="text-sm text-destructive">Sorry, something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif mb-8">Visit Us</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Our Roastery</p>
                    <p className="text-muted-foreground">
                      1234 NW Industrial St
                      <br />
                      Portland, OR 97209
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:hello@emberandbean.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@emberandbean.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a
                      href="tel:+15035551234"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      (503) 555-1234
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-2xl">
              <h3 className="text-xl font-serif mb-3">Roastery Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 8am - 5pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 bg-muted rounded-2xl overflow-hidden">
              <img src="/map-of-portland-oregon-with-pin-marker.jpg" alt="Location map" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
