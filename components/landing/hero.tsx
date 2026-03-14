"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const { t } = useLanguage()
  
  return (
      <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,192,192,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,207,232,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,241,242,0.15),transparent_70%)]" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200/40 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-200/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/60 text-rose-500 text-sm font-medium rounded-full mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              {t("hero.tagline")}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance bg-gradient-to-br from-neutral-800 via-rose-900 to-neutral-700 bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-base px-8 shadow-lg shadow-rose-200/50 border-0 transition-all duration-300">
                <a href="#catalog">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 border-rose-200 text-rose-600 hover:bg-rose-50/50 backdrop-blur-sm transition-all duration-300">
                <a
                  href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20undangan%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("hero.whatsapp")}
                </a>
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 ring-1 ring-rose-100/50 hover:shadow-2xl hover:shadow-rose-300/40 transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/invitation-1.jpg"
                    alt="Elegant wedding invitation design"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 ring-1 ring-rose-100/50 hover:shadow-2xl hover:shadow-rose-300/40 transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/invitation-3.jpg"
                    alt="Rustic bohemian invitation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 ring-1 ring-rose-100/50 hover:shadow-2xl hover:shadow-rose-300/40 transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/invitation-2.jpg"
                    alt="Modern minimalist invitation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 ring-1 ring-rose-100/50 hover:shadow-2xl hover:shadow-rose-300/40 transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/invitation-4.jpg"
                    alt="Tropical destination invitation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-rose-200/40 to-pink-200/30 rounded-full -z-10 blur-xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-bl from-pink-200/30 to-rose-100/20 rounded-full -z-10 blur-xl" />
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-rose-300/20 rounded-full -z-10 blur-lg" />
          </div>
        </div>
      </div>
    </section>
    ) 
  }