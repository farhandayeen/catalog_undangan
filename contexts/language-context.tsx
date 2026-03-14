"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "id" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.catalog": "Katalog",
    "nav.about": "Tentang Kami",
    "nav.contact": "Hubungi Kami",
    
    // Hero
    "hero.tagline": "Undangan Digital Premium",
    "hero.title": "Desain Elegan untuk Momen Spesial Anda",
    "hero.subtitle": "Koleksi undangan digital eksklusif untuk pernikahan, pertunangan, dan acara istimewa lainnya. Buat momen Anda lebih berkesan.",
    "hero.cta": "Lihat Katalog",
    "hero.whatsapp": "Pesan Sekarang",
    
    // Catalog
    "catalog.title": "Koleksi Undangan",
    "catalog.subtitle": "Temukan desain sempurna untuk acara Anda",
    "catalog.preview": "Lihat Demo",
    "catalog.order": "Pesan Sekarang",
    
    // Categories
    "category.all": "Semua",
    "category.wedding": "Pernikahan",
    "category.engagement": "Pertunangan",
    "category.birthday": "Ulang Tahun",
    "category.islamic": "Islami",
    "category.modern": "Modern",
    
    // Preview Modal
    "preview.title": "Preview Undangan",
    "preview.description": "Lihat tampilan interaktif undangan digital ini",
    "preview.openInvitation": "Buka Undangan",
    "preview.guestName": "Tamu Undangan",
    "preview.eventDate": "Tanggal Acara",
    "preview.location": "Lokasi Acara",
    "preview.rsvp": "Konfirmasi Kehadiran",
    "preview.attending": "Hadir",
    "preview.notAttending": "Tidak Hadir",
    "preview.sendWishes": "Kirim Ucapan",
    "preview.wishesPlaceholder": "Tuliskan ucapan Anda...",
    "preview.submit": "Kirim",
    "preview.gallery": "Galeri Foto",
    "preview.countdown": "Hitung Mundur",
    "preview.days": "Hari",
    "preview.hours": "Jam",
    "preview.minutes": "Menit",
    "preview.seconds": "Detik",
    "preview.loveStory": "Kisah Cinta",
    "preview.close": "Tutup Preview",
    "preview.orderNow": "Pesan Desain Ini",
    
    // Features
    "features.title": "Mengapa Memilih Kami?",
    "features.subtitle": "Keunggulan undangan digital kami",
    "features.responsive.title": "Desain Responsif",
    "features.responsive.desc": "Tampilan sempurna di semua perangkat",
    "features.customizable.title": "Dapat Dikustomisasi",
    "features.customizable.desc": "Sesuaikan dengan tema acara Anda",
    "features.music.title": "Musik Latar",
    "features.music.desc": "Tambahkan lagu favorit Anda",
    "features.rsvp.title": "RSVP Online",
    "features.rsvp.desc": "Kelola konfirmasi kehadiran dengan mudah",
    "features.gallery.title": "Galeri Foto",
    "features.gallery.desc": "Tampilkan momen indah Anda",
    "features.countdown.title": "Hitung Mundur",
    "features.countdown.desc": "Fitur countdown menuju hari H",
    
    // CTA
    "cta.title": "Siap Membuat Undangan Anda?",
    "cta.subtitle": "Konsultasikan kebutuhan Anda dengan tim kami secara gratis",
    "cta.button": "Hubungi via WhatsApp",
    
    // Footer
    "footer.description": "Solusi undangan digital premium untuk setiap momen spesial Anda.",
    "footer.quicklinks": "Tautan Cepat",
    "footer.contact": "Kontak",
    "footer.followus": "Ikuti Kami",
    "footer.rights": "Hak Cipta Dilindungi",
    
    // Theme
    "theme.light": "Mode Terang",
    "theme.dark": "Mode Gelap",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.about": "About Us",
    "nav.contact": "Contact Us",
    
    // Hero
    "hero.tagline": "Premium Digital Invitations",
    "hero.title": "Elegant Designs for Your Special Moments",
    "hero.subtitle": "Exclusive digital invitation collection for weddings, engagements, and other special events. Make your moments more memorable.",
    "hero.cta": "View Catalog",
    "hero.whatsapp": "Order Now",
    
    // Catalog
    "catalog.title": "Invitation Collection",
    "catalog.subtitle": "Find the perfect design for your event",
    "catalog.preview": "View Demo",
    "catalog.order": "Order Now",
    
    // Categories
    "category.all": "All",
    "category.wedding": "Wedding",
    "category.engagement": "Engagement",
    "category.birthday": "Birthday",
    "category.islamic": "Islamic",
    "category.modern": "Modern",
    
    // Preview Modal
    "preview.title": "Invitation Preview",
    "preview.description": "See the interactive preview of this digital invitation",
    "preview.openInvitation": "Open Invitation",
    "preview.guestName": "Guest Name",
    "preview.eventDate": "Event Date",
    "preview.location": "Event Location",
    "preview.rsvp": "RSVP",
    "preview.attending": "Attending",
    "preview.notAttending": "Not Attending",
    "preview.sendWishes": "Send Wishes",
    "preview.wishesPlaceholder": "Write your wishes...",
    "preview.submit": "Submit",
    "preview.gallery": "Photo Gallery",
    "preview.countdown": "Countdown",
    "preview.days": "Days",
    "preview.hours": "Hours",
    "preview.minutes": "Minutes",
    "preview.seconds": "Seconds",
    "preview.loveStory": "Love Story",
    "preview.close": "Close Preview",
    "preview.orderNow": "Order This Design",
    
    // Features
    "features.title": "Why Choose Us?",
    "features.subtitle": "Our digital invitation advantages",
    "features.responsive.title": "Responsive Design",
    "features.responsive.desc": "Perfect display on all devices",
    "features.customizable.title": "Customizable",
    "features.customizable.desc": "Tailor it to your event theme",
    "features.music.title": "Background Music",
    "features.music.desc": "Add your favorite songs",
    "features.rsvp.title": "Online RSVP",
    "features.rsvp.desc": "Easily manage attendance confirmations",
    "features.gallery.title": "Photo Gallery",
    "features.gallery.desc": "Showcase your beautiful moments",
    "features.countdown.title": "Countdown",
    "features.countdown.desc": "Countdown feature to the big day",
    
    // CTA
    "cta.title": "Ready to Create Your Invitation?",
    "cta.subtitle": "Consult your needs with our team for free",
    "cta.button": "Contact via WhatsApp",
    
    // Footer
    "footer.description": "Premium digital invitation solutions for every special moment.",
    "footer.quicklinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.followus": "Follow Us",
    "footer.rights": "All Rights Reserved",
    
    // Theme
    "theme.light": "Light Mode",
    "theme.dark": "Dark Mode",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id")

  useEffect(() => {
    // Detect user's browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("id")) {
      setLanguage("id")
    } else {
      setLanguage("en")
    }
  }, [])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
