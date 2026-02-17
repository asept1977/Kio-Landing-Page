import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface NavigationProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const branchLinks = [
  { href: "/public-affairs", labelDe: "Public Affairs", labelEn: "Public Affairs" },
  { href: "/verbaende", labelDe: "Verbände", labelEn: "Associations" },
  { href: "/industrie", labelDe: "Industrie & Mittelstand", labelEn: "Industry & SME" },
];

const oekosystemLinks = [
  { href: "/kio-oekosystem", labelDe: "Plattform", labelEn: "Platform" },
  { href: "/kio-oekosystem#architecture", labelDe: "Architektur", labelEn: "Architecture" },
  { href: "/kio-oekosystem#security", labelDe: "Sicherheit", labelEn: "Security" },
  { href: "/kio-oekosystem/updates", labelDe: "Updates", labelEn: "Updates" },
];

export function Navigation({ lang, setLang }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchenOpen, setBranchenOpen] = useState(false);
  const [oekosystemOpen, setOekosystemOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const oekosystemRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBranchenOpen(false);
      }
      if (oekosystemRef.current && !oekosystemRef.current.contains(e.target as Node)) {
        setOekosystemOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
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
              <span className={`font-bold text-xl tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
                KIO
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative" ref={dropdownRef}>
              <button
                data-testid="button-nav-solutions"
                onClick={() => { setBranchenOpen(!branchenOpen); setOekosystemOpen(false); }}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                {t.solutions}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${branchenOpen ? 'rotate-180' : ''}`} />
              </button>
              {branchenOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background/95 backdrop-blur-xl border border-border rounded-md shadow-lg py-2" data-testid="dropdown-branchen">
                  {branchLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className="block px-4 py-2.5 text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05] transition-colors cursor-pointer"
                        data-testid={`link-branch-${link.href.replace('/', '')}`}
                        onClick={() => setBranchenOpen(false)}
                      >
                        {lang === "de" ? link.labelDe : link.labelEn}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={oekosystemRef}>
              <button
                data-testid="button-nav-oekosystem"
                onClick={() => { setOekosystemOpen(!oekosystemOpen); setBranchenOpen(false); }}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.startsWith("/kio-oekosystem")
                    ? (scrolled ? "text-foreground" : "text-white")
                    : (scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white")
                }`}
              >
                {lang === "de" ? "KI Ökosystem" : "AI Ecosystem"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${oekosystemOpen ? 'rotate-180' : ''}`} />
              </button>
              {oekosystemOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background/95 backdrop-blur-xl border border-border rounded-md shadow-lg py-2" data-testid="dropdown-oekosystem">
                  {oekosystemLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className="block px-4 py-2.5 text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05] transition-colors cursor-pointer"
                        data-testid={`link-oeko-${link.labelEn.toLowerCase()}`}
                        onClick={() => setOekosystemOpen(false)}
                      >
                        {lang === "de" ? link.labelDe : link.labelEn}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/preise">
              <span data-testid="button-nav-preise" className={`text-sm font-medium transition-colors cursor-pointer ${location === "/preise" ? (scrolled ? "text-foreground" : "text-white") : (scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white")}`}>
                {lang === "de" ? "Preise" : "Pricing"}
              </span>
            </Link>
            <button data-testid="button-nav-roi" onClick={() => scrollToSection("roi")} className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"}`}>
              {t.roi}
            </button>
            <button data-testid="button-nav-sovereignty" onClick={() => scrollToSection("sovereignty")} className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white"}`}>
              {t.sovereignty}
            </button>

            <div className={`flex items-center gap-3 border-l ${scrolled ? "border-border" : "border-white/20"} pl-8`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
                className={`text-xs font-bold gap-1.5 ${scrolled ? "text-foreground/60" : "text-white/70"}`}
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
              className={`text-xs font-bold gap-1 ${scrolled ? "text-foreground/60" : "text-white/70"}`}
              data-testid="button-lang-toggle-mobile"
            >
              {lang === 'en' ? 'DE' : 'EN'}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
              {mobileMenuOpen ? <X className={scrolled ? "text-foreground/60" : "text-white/70"} /> : <Menu className={scrolled ? "text-foreground/60" : "text-white/70"} />}
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
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <p className="text-xs font-bold text-foreground/30 tracking-widest uppercase">{t.solutions}</p>
              {branchLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block w-full text-left text-base font-medium text-foreground/80 pl-3 cursor-pointer"
                    data-testid={`button-mobile-branch-${link.href.replace('/', '')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {lang === "de" ? link.labelDe : link.labelEn}
                  </span>
                </Link>
              ))}

              <p className="text-xs font-bold text-foreground/30 tracking-widest uppercase pt-2">{lang === "de" ? "KI Ökosystem" : "AI Ecosystem"}</p>
              {oekosystemLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block w-full text-left text-base font-medium text-foreground/80 pl-3 cursor-pointer"
                    data-testid={`button-mobile-oeko-${link.labelEn.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {lang === "de" ? link.labelDe : link.labelEn}
                  </span>
                </Link>
              ))}

              <Link href="/preise">
                <span
                  className="block w-full text-left text-lg font-medium text-foreground/80 cursor-pointer"
                  data-testid="button-mobile-preise"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {lang === "de" ? "Preise" : "Pricing"}
                </span>
              </Link>
              <button onClick={() => scrollToSection("roi")} className="block w-full text-left text-lg font-medium text-foreground/80" data-testid="button-mobile-roi">
                {t.roi}
              </button>
              <button onClick={() => scrollToSection("sovereignty")} className="block w-full text-left text-lg font-medium text-foreground/80" data-testid="button-mobile-sovereignty">
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
