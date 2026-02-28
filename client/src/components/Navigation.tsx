import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Globe, ChevronDown, Landmark, Users, Factory, Layers, LayoutGrid, Shield, RefreshCw, Briefcase, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface NavigationProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  forceScrolled?: boolean;
}

const branchLinks = [
  { href: "/interessenvertretung", labelDe: "Interessenvertretung", labelEn: "Professional Advocacy", descDe: "Politische & regulatorische Positionierung", descEn: "Political & regulatory positioning", icon: Briefcase },
  { href: "/public-affairs", labelDe: "Public Affairs", labelEn: "Public Affairs", descDe: "Gesetzgebung, Stakeholder & Positionen", descEn: "Legislation, stakeholders & positions", icon: Landmark },
  { href: "/verbaende", labelDe: "Verbände", labelEn: "Associations", descDe: "Bundesstrukturen & Mitgliederwissen", descEn: "Federal structures & member knowledge", icon: Users },
  { href: "/industrie", labelDe: "Industrie & Mittelstand", labelEn: "Industry & SME", descDe: "ERP, CRM & technische Dokumentation", descEn: "ERP, CRM & technical documentation", icon: Factory },
];

const oekosystemLinks = [
  { href: "/kio-oekosystem", labelDe: "Plattform-Übersicht", labelEn: "Platform Overview", descDe: "KIO Architektur & Funktionen", descEn: "KIO architecture & features", icon: LayoutGrid },
  { href: "/plattformarchitektur", labelDe: "Architektur", labelEn: "Architecture", descDe: "Internes & externes Wissen, Security", descEn: "Internal & external data, security", icon: Layers },
  { href: "/kio-oekosystem#security", labelDe: "Sicherheit", labelEn: "Security", descDe: "DSGVO, EU-Hosting & Zugriffskontrolle", descEn: "GDPR, EU hosting & access control", icon: Shield },
  { href: "/kio-oekosystem/updates", labelDe: "Produkt-Updates", labelEn: "Product Updates", descDe: "Neueste Entwicklungen & Features", descEn: "Latest developments & features", icon: RefreshCw },
];

export function Navigation({ lang, setLang, forceScrolled = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchenOpen, setBranchenOpen] = useState(false);
  const [oekosystemOpen, setOekosystemOpen] = useState(false);
  const branchenTimeout = useRef<ReturnType<typeof setTimeout>>();
  const oekosystemTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const oekosystemRef = useRef<HTMLDivElement>(null);
  const [location, navigate] = useLocation();
  const t = translations[lang].nav;

  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

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

  useEffect(() => {
    return () => {
      clearTimeout(branchenTimeout.current);
      clearTimeout(oekosystemTimeout.current);
    };
  }, []);

  const handleBranchenEnter = useCallback(() => {
    clearTimeout(branchenTimeout.current);
    clearTimeout(oekosystemTimeout.current);
    setBranchenOpen(true);
    setOekosystemOpen(false);
  }, []);

  const handleBranchenLeave = useCallback(() => {
    branchenTimeout.current = setTimeout(() => setBranchenOpen(false), 200);
  }, []);

  const handleOekoEnter = useCallback(() => {
    clearTimeout(oekosystemTimeout.current);
    clearTimeout(branchenTimeout.current);
    setOekosystemOpen(true);
    setBranchenOpen(false);
  }, []);

  const handleOekoLeave = useCallback(() => {
    oekosystemTimeout.current = setTimeout(() => setOekosystemOpen(false), 200);
  }, []);

  const handleSectionNav = (id: string) => {
    if (location === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
    setMobileMenuOpen(false);
  };

  const handleContact = () => {
    handleSectionNav("contact");
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const textBase = scrolled ? "text-foreground" : "text-white";
  const textMuted = scrolled ? "text-foreground/55" : "text-white/65";
  const textHover = scrolled ? "hover:text-foreground" : "hover:text-white";

  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group" data-testid="link-logo">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded-md flex items-center justify-center text-white font-bold text-base tracking-tighter">
                K
              </div>
              <span className={`font-bold text-lg tracking-tight ${textBase}`}>
                KIO
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleBranchenEnter}
              onMouseLeave={handleBranchenLeave}
            >
              <button
                data-testid="button-nav-solutions"
                onClick={() => { setBranchenOpen(!branchenOpen); setOekosystemOpen(false); }}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                  ["/public-affairs", "/verbaende", "/industrie"].some(p => isActive(p))
                    ? textBase
                    : `${textMuted} ${textHover}`
                }`}
              >
                {t.solutions}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${branchenOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {branchenOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-background border border-border rounded-md shadow-lg overflow-hidden"
                    data-testid="dropdown-branchen"
                  >
                    <div className="p-1.5">
                      {branchLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <Link key={link.href} href={link.href}>
                            <div
                              className={`flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors group/item ${
                                active ? "bg-[#ff6a00]/8" : "hover:bg-muted/60"
                              }`}
                              data-testid={`link-branch-${link.href.replace('/', '')}`}
                              onClick={() => setBranchenOpen(false)}
                            >
                              <div className={`mt-0.5 w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                                active ? "bg-[#ff6a00]/15 text-[#ff6a00]" : "bg-muted text-foreground/40 group-hover/item:text-foreground/60"
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-sm font-medium leading-tight ${
                                  active ? "text-foreground" : "text-foreground/80"
                                }`}>
                                  {lang === "de" ? link.labelDe : link.labelEn}
                                </div>
                                <div className="text-xs text-foreground/40 mt-0.5 leading-snug">
                                  {lang === "de" ? link.descDe : link.descEn}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              ref={oekosystemRef}
              onMouseEnter={handleOekoEnter}
              onMouseLeave={handleOekoLeave}
            >
              <button
                data-testid="button-nav-oekosystem"
                onClick={() => { setOekosystemOpen(!oekosystemOpen); setBranchenOpen(false); }}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                  isActive("/kio-oekosystem")
                    ? textBase
                    : `${textMuted} ${textHover}`
                }`}
              >
                {lang === "de" ? "KIO Plattform" : "KIO Platform"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${oekosystemOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {oekosystemOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-background border border-border rounded-md shadow-lg overflow-hidden"
                    data-testid="dropdown-oekosystem"
                  >
                    <div className="p-1.5">
                      {oekosystemLinks.map((link) => {
                        const Icon = link.icon;
                        const baseHref = link.href.split("#")[0];
                        const active = location === baseHref || (location.startsWith(baseHref) && baseHref !== "/kio-oekosystem");
                        return (
                          <Link key={link.href} href={link.href}>
                            <div
                              className={`flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors group/item ${
                                active ? "bg-[#ff6a00]/8" : "hover:bg-muted/60"
                              }`}
                              data-testid={`link-oeko-${link.labelEn.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={() => setOekosystemOpen(false)}
                            >
                              <div className={`mt-0.5 w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                                active ? "bg-[#ff6a00]/15 text-[#ff6a00]" : "bg-muted text-foreground/40 group-hover/item:text-foreground/60"
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-sm font-medium leading-tight ${
                                  active ? "text-foreground" : "text-foreground/80"
                                }`}>
                                  {lang === "de" ? link.labelDe : link.labelEn}
                                </div>
                                <div className="text-xs text-foreground/40 mt-0.5 leading-snug">
                                  {lang === "de" ? link.descDe : link.descEn}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={`flex items-center gap-2 ml-4 pl-4 border-l ${scrolled ? "border-border" : "border-white/20"}`}>
              <button
                onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${textMuted} ${textHover}`}
                data-testid="button-lang-toggle"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'DE' : 'EN'}
              </button>
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-medium text-sm"
                data-testid="button-nav-contact"
              >
                {t.contact}
              </Button>
              <a
                href="https://www.kio-space.de"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${textMuted} ${textHover}`}
                data-testid="link-login"
              >
                <UserCircle className="w-4 h-4" />
                Login
              </a>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
              className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors ${textMuted} ${textHover}`}
              data-testid="button-lang-toggle-mobile"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'DE' : 'EN'}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileExpanded(null); }}
              data-testid="button-mobile-menu"
              className={textMuted}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "branchen" ? null : "branchen")}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-foreground/80 rounded-md hover:bg-muted/50 transition-colors"
                  data-testid="button-mobile-branchen-toggle"
                >
                  {t.solutions}
                  <ChevronDown className={`w-4 h-4 text-foreground/40 transition-transform duration-200 ${mobileExpanded === "branchen" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "branchen" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pr-1 pb-1 space-y-0.5">
                        {branchLinks.map((link) => {
                          const Icon = link.icon;
                          const active = isActive(link.href);
                          return (
                            <Link key={link.href} href={link.href}>
                              <div
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                                  active ? "bg-[#ff6a00]/8" : "hover:bg-muted/50"
                                }`}
                                data-testid={`button-mobile-branch-${link.href.replace('/', '')}`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                                  active ? "bg-[#ff6a00]/15 text-[#ff6a00]" : "bg-muted text-foreground/40"
                                }`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className={`text-sm font-medium ${active ? "text-foreground" : "text-foreground/70"}`}>
                                    {lang === "de" ? link.labelDe : link.labelEn}
                                  </div>
                                  <div className="text-xs text-foreground/40 leading-snug">
                                    {lang === "de" ? link.descDe : link.descEn}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "plattform" ? null : "plattform")}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-foreground/80 rounded-md hover:bg-muted/50 transition-colors"
                  data-testid="button-mobile-plattform-toggle"
                >
                  {lang === "de" ? "KIO Plattform" : "KIO Platform"}
                  <ChevronDown className={`w-4 h-4 text-foreground/40 transition-transform duration-200 ${mobileExpanded === "plattform" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "plattform" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pr-1 pb-1 space-y-0.5">
                        {oekosystemLinks.map((link) => {
                          const Icon = link.icon;
                          const mobileBaseHref = link.href.split("#")[0];
                          const active = location === mobileBaseHref || (location.startsWith(mobileBaseHref) && mobileBaseHref !== "/kio-oekosystem");
                          return (
                            <Link key={link.href} href={link.href}>
                              <div
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                                  active ? "bg-[#ff6a00]/8" : "hover:bg-muted/50"
                                }`}
                                data-testid={`button-mobile-oeko-${link.labelEn.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                                  active ? "bg-[#ff6a00]/15 text-[#ff6a00]" : "bg-muted text-foreground/40"
                                }`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className={`text-sm font-medium ${active ? "text-foreground" : "text-foreground/70"}`}>
                                    {lang === "de" ? link.labelDe : link.labelEn}
                                  </div>
                                  <div className="text-xs text-foreground/40 leading-snug">
                                    {lang === "de" ? link.descDe : link.descEn}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-3 px-1 space-y-2">
                <a
                  href="https://www.kio-space.de"
                  className="block w-full text-center py-2 text-sm font-semibold text-foreground/60 hover:text-foreground border border-border rounded-md transition-colors"
                  data-testid="link-login-mobile"
                >
                  Login
                </a>
                <Button
                  onClick={handleContact}
                  className="w-full bg-[#ff6a00] border-[#ff6a00] text-white font-medium"
                  data-testid="button-mobile-contact"
                >
                  {t.contact}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
