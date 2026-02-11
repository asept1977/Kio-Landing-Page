import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface NavigationProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export function Navigation({ lang, setLang }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group" data-testid="link-logo">
              <div className="w-9 h-9 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded-md flex items-center justify-center text-white font-bold text-lg tracking-tighter">
                K
              </div>
              <span className="font-bold text-xl tracking-tight text-white/90">
                KIO
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button data-testid="button-nav-solutions" onClick={() => scrollToSection("solutions")} className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors">
              {t.solutions}
            </button>
            <button data-testid="button-nav-architecture" onClick={() => scrollToSection("architecture")} className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors">
              {t.architecture}
            </button>
            <button data-testid="button-nav-sovereignty" onClick={() => scrollToSection("sovereignty")} className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors">
              {t.sovereignty}
            </button>

            <div className="flex items-center gap-3 border-l border-white/10 pl-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
                className="text-xs font-bold text-white/50 gap-1.5"
                data-testid="button-lang-toggle"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'DE' : 'EN'}
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-medium"
                data-testid="button-nav-contact"
              >
                {t.contact}
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
              className="text-xs font-bold text-white/50 gap-1"
              data-testid="button-lang-toggle-mobile"
            >
              {lang === 'en' ? 'DE' : 'EN'}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
              {mobileMenuOpen ? <X className="text-white/60" /> : <Menu className="text-white/60" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => scrollToSection("solutions")} className="block w-full text-left text-lg font-medium text-white/80" data-testid="button-mobile-solutions">
                {t.solutions}
              </button>
              <button onClick={() => scrollToSection("architecture")} className="block w-full text-left text-lg font-medium text-white/80" data-testid="button-mobile-architecture">
                {t.architecture}
              </button>
              <button onClick={() => scrollToSection("sovereignty")} className="block w-full text-left text-lg font-medium text-white/80" data-testid="button-mobile-sovereignty">
                {t.sovereignty}
              </button>
              <Button onClick={() => scrollToSection("contact")} className="w-full bg-[#ff6a00] border-[#ff6a00] text-white" data-testid="button-mobile-contact">
                {t.contact}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
