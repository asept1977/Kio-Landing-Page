import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft,
  Megaphone, Handshake, Headset, Cog, UserCheck,
  Leaf, BarChart3, Truck, Factory, LayoutDashboard,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

interface ModuleDef {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  icon: typeof Megaphone;
  enterprise?: boolean;
}

const moduleMap: Record<string, ModuleDef> = {
  marketing: {
    slug: "marketing",
    title: "KIO-Marketing",
    tagline: "Aus Signalen werden Kampagnen.",
    desc: "Markt- und Wettbewerbsintelligenz plus Content-Operations – aus Signalen werden Kampagnen, aus Daten wird Positionierung.",
    bullets: ["Wettbewerbsradar", "Kampagnen-ROI", "Messe- & Event-Intelligence"],
    icon: Megaphone,
  },
  sales: {
    slug: "sales",
    title: "KIO-Sales",
    tagline: "Vom ersten Kontakt zum Abschluss.",
    desc: "Automatisierte Termin- und Kundenbriefings, Deal-Insights und CRM-Updates – direkt im Kalender und in Teams.",
    bullets: ["Briefing im Kalender", "Teams-Copilot", "CRM-Updates nach Terminen"],
    icon: Handshake,
  },
  service: {
    slug: "service",
    title: "KIO-Service",
    tagline: "Schnellere Lösungen, höhere Margen.",
    desc: "Serviceeinsätze, Tickets und Maschinenhistorie werden zu einem lernenden System – für schnellere Lösungen und höhere Service-Margen.",
    bullets: ["Service-Briefings", "After-Service-Doku", "Ersatzteil- & Upgrade-Potenziale"],
    icon: Headset,
  },
  products: {
    slug: "products",
    title: "KIO-Products",
    tagline: "Engineering-Wissen zentral nutzbar.",
    desc: "Produkt- und Engineering-Wissen zentral nutzbar machen – Stücklisten, Änderungen und Qualitätsfeedback in einem Produktgedächtnis.",
    bullets: ["BOM/Varianten-Analyse", "Change-Impact", "Qualitätscluster"],
    icon: Cog,
  },
  hr: {
    slug: "hr",
    title: "KIO-HR",
    tagline: "HR-Prozesse, automatisiert.",
    desc: "HR-Self-Service und Prozessunterstützung – Urlaubsstand, Onboarding, Arbeitszeiten und Dokumentation automatisiert.",
    bullets: ["Personio/Clockodo", "On-/Offboarding", "Richtlinien & Nachweise"],
    icon: UserCheck,
  },
  esg: {
    slug: "esg",
    title: "KIO-ESG",
    tagline: "Compliance strukturiert dokumentieren.",
    desc: "CSRD/ESRS- und Lieferkettenanforderungen strukturieren, Daten zusammenführen und auditfähig dokumentieren.",
    bullets: ["CSRD-Intelligence", "Lieferketten-Risiken", "Audit-Trail & Nachweis"],
    icon: Leaf,
    enterprise: true,
  },
  finance: {
    slug: "finance",
    title: "KIO-Finance",
    tagline: "Szenarien statt Excel-Schleifen.",
    desc: "Forecasting, Deckungsbeiträge und Cashflow als Steuerungssystem – mit Szenarien statt Excel-Schleifen.",
    bullets: ["Rolling Forecast", "DB-Analysen", "Working-Capital Radar"],
    icon: BarChart3,
    enterprise: true,
  },
  procurement: {
    slug: "procurement",
    title: "KIO-Procurement",
    tagline: "Risiken erkennen, Kosten optimieren.",
    desc: "Lieferanten-, Preis- und Vertragsintelligenz – Risiken früh erkennen und Kosten nachhaltig optimieren.",
    bullets: ["Supplier Risk Radar", "Preis-/Index-Checks", "Fristen & Verträge"],
    icon: Truck,
    enterprise: true,
  },
  operations: {
    slug: "operations",
    title: "KIO-Operations",
    tagline: "Produktionsintelligenz in Echtzeit.",
    desc: "Produktions- und Prozessintelligenz – Engpässe, Qualität und Kosten transparent steuern, optional mit IoT/MES.",
    bullets: ["Bottleneck-Analyse", "Ausschuss/Qualität", "Predictive Patterns"],
    icon: Factory,
    enterprise: true,
  },
  executive: {
    slug: "executive",
    title: "KIO-Executive",
    tagline: "Entscheidungen auf einen Blick.",
    desc: "Vorstands- und Geschäftsführungs-Layer – KPI-Verdichtung, Risikoampel und Frühwarnsystem über alle Module hinweg.",
    bullets: ["Risiko-Matrix", "Strategie-Szenarien", "Executive Dashboard"],
    icon: LayoutDashboard,
    enterprise: true,
  },
};

interface ModulePageProps {
  slug: string;
}

export default function ModulePage({ slug }: ModulePageProps) {
  const [lang, setLang] = useState<Lang>("de");
  const [, navigate] = useLocation();
  const mod = moduleMap[slug];

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  if (!mod) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navigation lang={lang} setLang={setLang} forceScrolled />
        <div className="pt-40 text-center">
          <p className="text-foreground/50">Modul nicht gefunden.</p>
          <Link href="/industrie">
            <span className="text-[#ff6a00] text-sm font-semibold cursor-pointer">Zurück zur Übersicht</span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = mod.icon;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden" data-testid={`section-hero-module-${slug}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-4" data-testid={`breadcrumb-module-${slug}`}>
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <Link href="/industrie"><span className="cursor-pointer hover:text-foreground/60 transition-colors">Industrie</span></Link>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">{mod.title}</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mb-10">
              <Link href="/industrie#module">
                <span className="text-sm text-[#ff6a00] font-medium flex items-center gap-1.5 cursor-pointer hover:text-[#e55f00] transition-colors" data-testid={`link-back-industrie-${slug}`}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Zur Modulübersicht
                </span>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-lg bg-[#ff6a00]/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-[#ff6a00]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid={`text-module-page-title-${slug}`}>
                  {mod.title}
                </h1>
                {mod.enterprise && (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#ff6a00]/70 bg-[#ff6a00]/8 px-2 py-0.5 rounded mt-1 inline-block">Enterprise</span>
                )}
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-medium text-foreground/70 mb-6" data-testid={`text-module-tagline-${slug}`}>
              {mod.tagline}
            </motion.p>

            <motion.p variants={fadeUp} className="text-base text-foreground/50 leading-relaxed max-w-xl mb-8" data-testid={`text-module-desc-${slug}`}>
              {mod.desc}
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-3 mb-10">
              {mod.bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`module-bullet-${slug}-${i}`}>
                  <span className="w-2 h-2 rounded-full bg-[#ff6a00]/40 shrink-0" />
                  <span className="text-sm text-foreground/60 font-medium">{b}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid={`button-demo-module-${slug}`}
              >
                Demo anfragen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/preise")}
                className="font-semibold"
                data-testid={`button-pricing-module-${slug}`}
              >
                Preise ansehen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 relative border-t border-border" data-testid={`section-module-detail-${slug}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="glass-card rounded-lg p-10 md:p-14">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/50 mb-4">Coming soon</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid={`text-module-coming-${slug}`}>
                Detailseite in Vorbereitung
              </h2>
              <p className="text-foreground/50 leading-relaxed max-w-md mx-auto mb-8">
                Die vollständige Modulseite für {mod.title} wird in Kürze veröffentlicht. Vereinbaren Sie jetzt ein Gespräch, um mehr zu erfahren.
              </p>
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid={`button-contact-module-detail-${slug}`}
              >
                Gespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
