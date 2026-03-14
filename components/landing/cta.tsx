"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance">
          {t("cta.title")}
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 bg-background hover:bg-background/90 text-foreground text-base px-8 py-6"
        >
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20undangan%20digital"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {t("cta.button")}
          </a>
        </Button>
      </div>
    </section>
  )
}
