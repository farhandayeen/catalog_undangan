"use client"

import { useState, useEffect} from "react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.catalog"), href: "#catalog" },
    { label: t("nav.about"), href: "#features" },
    { label: t("nav.contact"), href: "#contact" },
  ]

  return (
    <header className={ `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-md border-b border-rose-100"
        : "bg-gradient-to-b from-black/20 to-transparent border-b border-transparent"
    }` } >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-sm">ID</span>
            </div>
            <span className={`font-serif text-xl font-semibold transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}>InviteDream</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={ `text-sm font-medium transition-colors ${
                  scrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-white/90 hover:text-white"
                }` }
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("id")} className={language === "id" ? "bg-accent" : ""}>
                  🇮🇩 Bahasa Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">{theme === "light" ? t("theme.dark") : t("theme.light")}</span>
            </Button>

            {/* WhatsApp CTA */}
            <Button asChild className="hidden sm:flex bg-primary hover:bg-primary/90">
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20undangan%20digital"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.whatsapp")}
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setLanguage(language === "id" ? "en" : "id")
                }}
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === "id" ? "English" : "Indonesia"}
              </Button>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90">
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20undangan%20digital"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
