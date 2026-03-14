"use client"

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Catalog } from "@/components/landing/catalog"
import { Features } from "@/components/landing/features"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Catalog />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
