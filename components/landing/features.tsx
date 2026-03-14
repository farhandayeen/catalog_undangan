"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Smartphone, 
  Palette, 
  Music, 
  ClipboardCheck, 
  Images, 
  Clock 
} from "lucide-react"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Smartphone,
      title: t("features.responsive.title"),
      description: t("features.responsive.desc"),
    },
    {
      icon: Palette,
      title: t("features.customizable.title"),
      description: t("features.customizable.desc"),
    },
    {
      icon: Music,
      title: t("features.music.title"),
      description: t("features.music.desc"),
    },
    {
      icon: ClipboardCheck,
      title: t("features.rsvp.title"),
      description: t("features.rsvp.desc"),
    },
    {
      icon: Images,
      title: t("features.gallery.title"),
      description: t("features.gallery.desc"),
    },
    {
      icon: Clock,
      title: t("features.countdown.title"),
      description: t("features.countdown.desc"),
    },
  ]

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
