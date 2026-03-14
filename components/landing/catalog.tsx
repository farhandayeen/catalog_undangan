"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, MessageCircle } from "lucide-react"
import Image from "next/image"
import { InvitationPreviewModal } from "./invitation-preview-modal"

interface Invitation {
  id: number
  image: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: string
}

const invitations: Invitation[] = [
  {
    id: 1,
    image: "/images/invitation-1.jpg",
    title: "Bunga Sakura",
    titleEn: "Cherry Blossom",
    description: "Desain romantis dengan sentuhan bunga sakura dan warna pastel yang lembut, cocok untuk pernikahan bernuansa Jepang.",
    descriptionEn: "Romantic design with cherry blossom touches and soft pastel colors, perfect for Japanese-themed weddings.",
    category: "wedding",
  },
  {
    id: 2,
    image: "/images/invitation-2.jpg",
    title: "Emas Modern",
    titleEn: "Modern Gold",
    description: "Perpaduan elegan antara aksen emas dan desain minimalis modern untuk kesan mewah nan berkelas.",
    descriptionEn: "Elegant blend of gold accents and modern minimalist design for a luxurious impression.",
    category: "modern",
  },
  {
    id: 3,
    image: "/images/invitation-3.jpg",
    title: "Rustic Bohemian",
    titleEn: "Rustic Bohemian",
    description: "Nuansa alam dengan bunga kering dan warna earth tone yang hangat untuk pernikahan outdoor.",
    descriptionEn: "Natural vibes with dried flowers and warm earth tones for outdoor weddings.",
    category: "wedding",
  },
  {
    id: 4,
    image: "/images/invitation-4.jpg",
    title: "Tropis Eksotis",
    titleEn: "Exotic Tropical",
    description: "Tema tropis dengan daun monstera dan aksen hijau zamrud untuk suasana segar dan modern.",
    descriptionEn: "Tropical theme with monstera leaves and emerald accents for a fresh, modern atmosphere.",
    category: "modern",
  },
  {
    id: 5,
    image: "/images/invitation-5.jpg",
    title: "Klasik Elegan",
    titleEn: "Classic Elegant",
    description: "Desain klasik dengan frame ornamen vintage dan tipografi serif yang timeless dan anggun.",
    descriptionEn: "Classic design with vintage ornament frames and timeless, elegant serif typography.",
    category: "engagement",
  },
  {
    id: 6,
    image: "/images/invitation-6.jpg",
    title: "Islami Premium",
    titleEn: "Premium Islamic",
    description: "Undangan Islami dengan kaligrafi Arab indah dan pola geometris khas seni Islam yang elegan.",
    descriptionEn: "Islamic invitation with beautiful Arabic calligraphy and elegant geometric Islamic art patterns.",
    category: "islamic",
  },
]

export function Catalog() {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (invitation: Invitation) => {
    setSelectedInvitation(invitation)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setSelectedInvitation(null)
  }

  const categories = [
    { id: "all", label: t("category.all") },
    { id: "wedding", label: t("category.wedding") },
    { id: "engagement", label: t("category.engagement") },
    { id: "islamic", label: t("category.islamic") },
    { id: "modern", label: t("category.modern") },
  ]

  const filteredInvitations = activeCategory === "all"
    ? invitations
    : invitations.filter(inv => inv.category === activeCategory)

  return (
    <section id="catalog" className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("catalog.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("catalog.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id 
                ? "bg-primary hover:bg-primary/90" 
                : "hover:bg-primary/10"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Invitation Grid */}
        <div className="grid grid-cols-2 gap-2">
          {filteredInvitations.map((invitation) => (
            <Card 
              key={invitation.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={invitation.image}
                    alt={language === "id" ? invitation.title : invitation.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on Hover */}
                 {/* <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="secondary" 
                        className="bg-background hover:bg-background/90 text-foreground"
                        onClick={() => handlePreview(invitation)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {t("catalog.preview")}
                      </Button>
                      <Button 
                        asChild
                        className="bg-primary hover:bg-primary/90"
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
                          {t("catalog.order")}
                        </a>
                      </Button>
                    </div>
                  </div> */}
                </div>
                {/* Content */}
                <div className="p-2 flex flex-col gap-1.5">
                  <h3 className="font-serif text-sm font-semibold text-card-foreground">
                    {language === "id" ? invitation.title : invitation.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {language === "id" ? invitation.description : invitation.descriptionEn}
                  </p>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePreview(invitation)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t("catalog.preview")}
                    </Button>
                    <Button 
                      asChild
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
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
                        {t("catalog.order")}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <InvitationPreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        invitation={selectedInvitation}
      />
    </section>
  )
}
