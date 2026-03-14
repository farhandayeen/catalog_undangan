"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Music, 
  Image as ImageIcon,
  MessageCircle,
  X,
  ChevronDown,
  Play,
  Pause
} from "lucide-react"
import Image from "next/image"

interface InvitationPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  invitation: {
    id: number
    image: string
    title: string
    titleEn: string
    category: string
  } | null
}

export function InvitationPreviewModal({ isOpen, onClose, invitation }: InvitationPreviewModalProps) {
  const { language, t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [rsvpStatus, setRsvpStatus] = useState<"attending" | "not-attending" | null>(null)
  const [wishes, setWishes] = useState("")
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Sample event date (30 days from now)
  const eventDate = new Date()
  eventDate.setDate(eventDate.getDate() + 30)

  useEffect(() => {
    if (!isOpen) {
      setShowContent(false)
      setRsvpStatus(null)
      setWishes("")
      return
    }

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate.getTime() - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  if (!invitation) return null

  const title = language === "id" ? invitation.title : invitation.titleEn

  // Sample couple names based on category
  const coupleNames = {
    wedding: { bride: "Putri Ayu", groom: "Budi Santoso" },
    engagement: { bride: "Sarah", groom: "Ahmad" },
    islamic: { bride: "Fatimah", groom: "Muhammad" },
    modern: { bride: "Maya", groom: "Dimas" },
  }
  
  const names = coupleNames[invitation.category as keyof typeof coupleNames] || coupleNames.wedding

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-card">
        {!showContent ? (
          // Cover Page
          <div className="relative h-[80vh] flex flex-col items-center justify-center">
            {/* Visually hidden title for accessibility */}
            <DialogHeader className="sr-only">
              <DialogTitle>{title} - {t("preview.title")}</DialogTitle>
              <DialogDescription>{t("preview.description")}</DialogDescription>
            </DialogHeader>
            <div className="absolute inset-0">
              <Image
                src={invitation.image}
                alt={title}
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
            </div>
            
            <div className="relative z-10 text-center px-6">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                {language === "id" ? "Undangan Pernikahan" : "Wedding Invitation"}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {names.bride}
              </h2>
              <div className="flex items-center justify-center gap-4 my-4">
                <span className="h-px w-12 bg-primary" />
                <Heart className="h-6 w-6 text-primary fill-primary" />
                <span className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-8">
                {names.groom}
              </h2>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
                <Calendar className="h-4 w-4" />
                <span>{eventDate.toLocaleDateString(language === "id" ? "id-ID" : "en-US", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}</span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">{t("preview.guestName")}</p>
                <p className="font-serif text-xl text-foreground">
                  {language === "id" ? "Bapak/Ibu/Saudara/i" : "Dear Guest"}
                </p>
              </div>

              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 animate-bounce"
                onClick={() => setShowContent(true)}
              >
                {t("preview.openInvitation")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Music Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-6 right-6 p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary" />
              ) : (
                <Play className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        ) : (
          // Content Page
          <div className="h-[80vh] overflow-y-auto">
            {/* Header with Close */}
            <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b p-4 flex items-center justify-between">
              <DialogHeader className="text-left">
                <DialogTitle className="font-serif text-xl">{title}</DialogTitle>
                <DialogDescription className="text-sm">{t("preview.description")}</DialogDescription>
              </DialogHeader>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              {/* Couple Section */}
              <section className="text-center py-8">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  {language === "id" ? "Mempelai" : "The Couple"}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-secondary/50 mx-auto mb-4 overflow-hidden">
                      <Image
                        src={invitation.image}
                        alt={names.bride}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{names.bride}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "id" ? "Putri dari Bapak & Ibu Surya" : "Daughter of Mr. & Mrs. Surya"}
                    </p>
                  </div>
                  <Heart className="h-8 w-8 text-primary fill-primary hidden sm:block" />
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-secondary/50 mx-auto mb-4 overflow-hidden">
                      <Image
                        src={invitation.image}
                        alt={names.groom}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{names.groom}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "id" ? "Putra dari Bapak & Ibu Wijaya" : "Son of Mr. & Mrs. Wijaya"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Countdown */}
              <section className="py-8 bg-secondary/30 rounded-2xl">
                <h3 className="font-serif text-2xl text-center mb-6">{t("preview.countdown")}</h3>
                <div className="flex justify-center gap-4 sm:gap-8">
                  {[
                    { value: countdown.days, label: t("preview.days") },
                    { value: countdown.hours, label: t("preview.hours") },
                    { value: countdown.minutes, label: t("preview.minutes") },
                    { value: countdown.seconds, label: t("preview.seconds") },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 sm:w-20 h-16 sm:h-20 bg-card rounded-lg flex items-center justify-center shadow-md">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Event Details */}
              <section className="py-8">
                <h3 className="font-serif text-2xl text-center mb-6">
                  {language === "id" ? "Acara Pernikahan" : "Wedding Event"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-secondary/30 rounded-xl p-6 text-center">
                    <h4 className="font-semibold text-foreground mb-2">
                      {language === "id" ? "Akad Nikah" : "Ceremony"}
                    </h4>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{eventDate.toLocaleDateString(language === "id" ? "id-ID" : "en-US")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">08:00 - 10:00 WIB</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 text-center">
                    <h4 className="font-semibold text-foreground mb-2">
                      {language === "id" ? "Resepsi" : "Reception"}
                    </h4>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{eventDate.toLocaleDateString(language === "id" ? "id-ID" : "en-US")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">11:00 - 14:00 WIB</p>
                  </div>
                </div>
                <div className="mt-6 bg-secondary/30 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium text-foreground">{t("preview.location")}</span>
                  </div>
                  <p className="text-muted-foreground">
                    Grand Ballroom Hotel Mulia, Jl. Asia Afrika No. 8, Jakarta Selatan
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    {language === "id" ? "Lihat Peta" : "View Map"}
                  </Button>
                </div>
              </section>

              {/* Gallery */}
              <section className="py-8">
                <h3 className="font-serif text-2xl text-center mb-6 flex items-center justify-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  {t("preview.gallery")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={invitation.image}
                        alt={`Gallery ${i}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* RSVP */}
              <section className="py-8 bg-secondary/30 rounded-2xl px-6">
                <h3 className="font-serif text-2xl text-center mb-6">{t("preview.rsvp")}</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button
                    variant={rsvpStatus === "attending" ? "default" : "outline"}
                    className={rsvpStatus === "attending" ? "bg-primary" : ""}
                    onClick={() => setRsvpStatus("attending")}
                  >
                    {t("preview.attending")}
                  </Button>
                  <Button
                    variant={rsvpStatus === "not-attending" ? "default" : "outline"}
                    className={rsvpStatus === "not-attending" ? "bg-primary" : ""}
                    onClick={() => setRsvpStatus("not-attending")}
                  >
                    {t("preview.notAttending")}
                  </Button>
                </div>
                {rsvpStatus && (
                  <p className="text-center text-sm text-primary">
                    {language === "id" 
                      ? `Terima kasih! Anda memilih: ${rsvpStatus === "attending" ? "Hadir" : "Tidak Hadir"}` 
                      : `Thank you! You selected: ${rsvpStatus === "attending" ? "Attending" : "Not Attending"}`}
                  </p>
                )}
              </section>

              {/* Wishes */}
              <section className="py-8">
                <h3 className="font-serif text-2xl text-center mb-6 flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  {t("preview.sendWishes")}
                </h3>
                <div className="max-w-md mx-auto space-y-4">
                  <Input 
                    placeholder={language === "id" ? "Nama Anda" : "Your Name"}
                    className="bg-background"
                  />
                  <textarea
                    placeholder={t("preview.wishesPlaceholder")}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    className="w-full h-24 px-3 py-2 rounded-md border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {t("preview.submit")}
                  </Button>
                </div>
              </section>

              {/* Order CTA */}
              <section className="py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  {language === "id" 
                    ? "Suka dengan desain ini? Pesan sekarang!" 
                    : "Love this design? Order now!"}
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                      language === "id" 
                        ? `Halo, saya tertarik dengan undangan "${invitation.title}"` 
                        : `Hello, I'm interested in the "${invitation.titleEn}" invitation`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("preview.orderNow")}
                  </a>
                </Button>
              </section>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
