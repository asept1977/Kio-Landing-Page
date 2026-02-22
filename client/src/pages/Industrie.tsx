import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, Database, Users, Mail, Share2, Shield,
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

interface UseCaseStep {
  headline: string;
  problemBullets: string[];
  intervention: string;
  impactNumber: string;
  impactLabel: string;
  impactBullets: string[];
}

const useCases: UseCaseStep[] = [
  {
    headline: "Außendienst-Briefing",
    problemBullets: [
      "Kundenhistorie verteilt über CRM, Angebote und Service",
      "Vorbereitung zeitaufwendig",
    ],
    intervention:
      "Automatisches Kunden-Briefing aus CRM, ERP, Tickets und Kommunikation.",
    impactNumber: "\u201380 %",
    impactLabel: "Vorbereitungszeit",
    impactBullets: [
      "Gezieltere Gespräche",
      "Höhere Abschlussquote",
    ],
  },
  {
    headline: "Angebotserstellung aus ERP",
    problemBullets: [
      "Angebote werden neu aufgebaut",
      "Kalkulation schwer vergleichbar",
    ],
    intervention:
      "Analyse früherer Angebote und Stücklisten aus ERP zur Vorschlagserstellung.",
    impactNumber: "2\u00d7",
    impactLabel: "schnellere Angebote",
    impactBullets: [
      "Konsistente Preise",
      "Höhere Marge",
    ],
  },
  {
    headline: "Service & Reklamationen",
    problemBullets: [
      "Unvollständige Maschinenhistorie",
      "Mehrere Rückfragen nötig",
    ],
    intervention:
      "Automatische Zusammenfassung der Kunden- und Maschinenakte.",
    impactNumber: "\u201360 %",
    impactLabel: "Bearbeitungszeit",
    impactBullets: [
      "Schnellere Lösung",
      "Zufriedenere Kunden",
    ],
  },
  {
    headline: "Projektwissen wiederverwenden",
    problemBullets: [
      "Erfahrung geht verloren",
      "Doppelarbeit im Engineering",
    ],
    intervention:
      "Findet ähnliche Projekte und Entscheidungen aus Unternehmensdaten.",
    impactNumber: "\u201340 %",
    impactLabel: "Aufwand bei Folgeprojekten",
    impactBullets: [
      "Weniger Doppelarbeit",
      "Schnellere Umsetzung",
    ],
  },
];

const techFeatures = [
  { icon: <Database className="w-6 h-6" />, label: "ERP Integration" },
  { icon: <Users className="w-6 h-6" />, label: "CRM Integration" },
  { icon: <Mail className="w-6 h-6" />, label: "E-Mail & Dokumente" },
  { icon: <Share2 className="w-6 h-6" />, label: "Knowledge Graph" },
  { icon: <Shield className="w-6 h-6" />, label: "DSGVO-konform" },
];

type ModuleCategory = "all" | "go-to-market" | "operations" | "governance";

interface ModuleCard {
  slug: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: typeof Megaphone;
  category: ModuleCategory[];
  enterprise?: boolean;
}

const modules: ModuleCard[] = [
  {
    slug: "marketing",
    title: "KIO-Marketing",
    desc: "Markt- und Wettbewerbsintelligenz plus Content-Operations – aus Signalen werden Kampagnen, aus Daten wird Positionierung.",
    bullets: ["Wettbewerbsradar", "Kampagnen-ROI", "Messe- & Event-Intelligence"],
    icon: Megaphone,
    category: ["go-to-market"],
  },
  {
    slug: "sales",
    title: "KIO-Sales",
    desc: "Automatisierte Termin- und Kundenbriefings, Deal-Insights und CRM-Updates – direkt im Kalender und in Teams.",
    bullets: ["Briefing im Kalender", "Teams-Copilot", "CRM-Updates nach Terminen"],
    icon: Handshake,
    category: ["go-to-market"],
  },
  {
    slug: "service",
    title: "KIO-Service",
    desc: "Serviceeinsätze, Tickets und Maschinenhistorie werden zu einem lernenden System – für schnellere Lösungen und höhere Service-Margen.",
    bullets: ["Service-Briefings", "After-Service-Doku", "Ersatzteil- & Upgrade-Potenziale"],
    icon: Headset,
    category: ["operations"],
  },
  {
    slug: "products",
    title: "KIO-Products",
    desc: "Produkt- und Engineering-Wissen zentral nutzbar machen – Stücklisten, Änderungen und Qualitätsfeedback in einem Produktgedächtnis.",
    bullets: ["BOM/Varianten-Analyse", "Change-Impact", "Qualitätscluster"],
    icon: Cog,
    category: ["operations"],
  },
  {
    slug: "hr",
    title: "KIO-HR",
    desc: "HR-Self-Service und Prozessunterstützung – Urlaubsstand, Onboarding, Arbeitszeiten und Dokumentation automatisiert.",
    bullets: ["Personio/Clockodo", "On-/Offboarding", "Richtlinien & Nachweise"],
    icon: UserCheck,
    category: ["operations"],
  },
  {
    slug: "esg",
    title: "KIO-ESG",
    desc: "CSRD/ESRS- und Lieferkettenanforderungen strukturieren, Daten zusammenführen und auditfähig dokumentieren.",
    bullets: ["CSRD-Intelligence", "Lieferketten-Risiken", "Audit-Trail & Nachweis"],
    icon: Leaf,
    category: ["governance"],
    enterprise: true,
  },
  {
    slug: "finance",
    title: "KIO-Finance",
    desc: "Forecasting, Deckungsbeiträge und Cashflow als Steuerungssystem – mit Szenarien statt Excel-Schleifen.",
    bullets: ["Rolling Forecast", "DB-Analysen", "Working-Capital Radar"],
    icon: BarChart3,
    category: ["governance"],
    enterprise: true,
  },
  {
    slug: "procurement",
    title: "KIO-Procurement",
    desc: "Lieferanten-, Preis- und Vertragsintelligenz – Risiken früh erkennen und Kosten nachhaltig optimieren.",
    bullets: ["Supplier Risk Radar", "Preis-/Index-Checks", "Fristen & Verträge"],
    icon: Truck,
    category: ["operations"],
    enterprise: true,
  },
  {
    slug: "operations",
    title: "KIO-Operations",
    desc: "Produktions- und Prozessintelligenz – Engpässe, Qualität und Kosten transparent steuern, optional mit IoT/MES.",
    bullets: ["Bottleneck-Analyse", "Ausschuss/Qualität", "Predictive Patterns"],
    icon: Factory,
    category: ["operations"],
    enterprise: true,
  },
  {
    slug: "executive",
    title: "KIO-Executive",
    desc: "Vorstands- und Geschäftsführungs-Layer – KPI-Verdichtung, Risikoampel und Frühwarnsystem über alle Module hinweg.",
    bullets: ["Risiko-Matrix", "Strategie-Szenarien", "Executive Dashboard"],
    icon: LayoutDashboard,
    category: ["governance"],
    enterprise: true,
  },
];

const filterChips: { label: string; value: ModuleCategory }[] = [
  { label: "Alle", value: "all" },
  { label: "Go-to-Market", value: "go-to-market" },
  { label: "Operations", value: "operations" },
  { label: "Governance", value: "governance" },
];

export default function Industrie() {
  const [lang, setLang] = useState<Lang>('de');
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState<ModuleCategory>("all");

  const filteredModules = activeFilter === "all"
    ? modules
    : modules.filter(m => m.category.includes(activeFilter));

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-36 pb-28 lg:pt-52 lg:pb-40 overflow-hidden" data-testid="section-hero-industrie">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[#ff6a00] text-lg md:text-2xl font-bold tracking-[0.25em] uppercase mb-12" data-testid="text-badge-industrie">
              KIO FÜR INDUSTRIE & MITTELSTAND
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05] text-foreground" data-testid="text-hero-title-industrie">
              Operative
              <br />
              <span className="text-foreground/40">Exzellenz.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm md:text-base text-foreground/40 mb-14 max-w-lg mx-auto leading-relaxed" data-testid="text-hero-subtitle-industrie">
              Operatives Wissen genau dann verfügbar, wenn Entscheidungen getroffen werden. KIO verbindet ERP, CRM und Kommunikation zu einem intelligenten Arbeitsassistenten.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => document.getElementById("module")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-module-hero"
              >
                Module entdecken <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleContact}
                className="font-semibold"
                data-testid="button-demo-hero"
              >
                Demo anfragen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="timeline" className="py-14 lg:py-20 relative" data-testid="section-timeline">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 lg:space-y-44">
            {useCases.map((uc, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
                className="relative"
                data-testid={`timeline-step-${idx}`}
              >
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10" data-testid={`text-timeline-title-${idx}`}>
                  {uc.headline}
                </motion.h2>

                <div className="relative pl-8 sm:pl-12">
                  <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-border/40 via-border to-border/30" />

                  <motion.div variants={fadeUp} className="relative mb-12" data-testid={`timeline-problem-${idx}`}>
                    <div className="absolute -left-5 sm:-left-7 top-1 w-2.5 h-2.5 rounded-full bg-foreground/20 border border-border" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/40 mb-3">Problem</p>
                    <ul className="space-y-1.5">
                      {uc.problemBullets.map((b, i) => (
                        <li key={i} className="text-sm text-foreground/60 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeUp} className="relative mb-12" data-testid={`timeline-intervention-${idx}`}>
                    <div className="absolute -left-5 sm:-left-7 top-1 w-2.5 h-2.5 rounded-full bg-[#ff6a00]/40 border border-[#ff6a00]/20" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/40 mb-3">KIO</p>
                    <p className="text-sm text-foreground/50 leading-relaxed max-w-lg">{uc.intervention}</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="relative" data-testid={`timeline-impact-${idx}`}>
                    <div className="absolute -left-5 sm:-left-7 top-6 w-2.5 h-2.5 rounded-full bg-[#ff6a00] shadow-[0_0_10px_rgba(255,106,0,0.4)]" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/25 mb-4">Impact</p>
                    <div className="rounded-md bg-card border border-border p-6 sm:p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6a00]/[0.02] to-transparent pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-1" data-testid={`text-impact-number-${idx}`}>
                          {uc.impactNumber}
                        </p>
                        <p className="text-sm text-foreground/50 mb-5" data-testid={`text-impact-label-${idx}`}>{uc.impactLabel}</p>
                        <div className="space-y-2">
                          {uc.impactBullets.map((b, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/40 shrink-0" />
                              <span className="text-sm text-foreground/60 font-medium">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="module" className="py-14 lg:py-24 relative border-t border-border" data-testid="section-module-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-module-grid-title">
              KIO Module für Industrie & Mittelstand
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-2xl mx-auto leading-relaxed" data-testid="text-module-grid-subtitle">
              Aktiviere genau die Bausteine, die du brauchst – integriert in Teams, verbunden mit ERP/CRM, aufgebaut für messbare Effizienzgewinne.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-2 mb-10"
            data-testid="module-filter-chips"
          >
            {filterChips.map((chip) => (
              <Button
                key={chip.value}
                variant={activeFilter === chip.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(chip.value)}
                className={`rounded-full ${
                  activeFilter === chip.value
                    ? "bg-[#ff6a00] border-[#ff6a00] text-white"
                    : ""
                }`}
                data-testid={`chip-filter-${chip.value}`}
              >
                {chip.label}
              </Button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            data-testid="module-grid"
          >
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/module/${mod.slug}`}>
                    <div
                      className="group bg-card border border-border rounded-lg p-5 cursor-pointer transition-all duration-200 hover-elevate flex flex-col h-full relative"
                      data-testid={`module-card-${mod.slug}`}
                    >
                      {mod.enterprise && (
                        <span className="absolute top-3 right-3 text-[9px] font-bold tracking-wider uppercase text-[#ff6a00]/70 bg-[#ff6a00]/8 px-1.5 py-0.5 rounded" data-testid={`badge-enterprise-${mod.slug}`}>
                          Enterprise
                        </span>
                      )}
                      <div className="w-10 h-10 rounded-md bg-[#ff6a00]/8 flex items-center justify-center mb-4 group-hover:bg-[#ff6a00]/15 transition-colors">
                        <Icon className="w-5 h-5 text-[#ff6a00]" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground mb-2 leading-snug" data-testid={`text-module-title-${mod.slug}`}>
                        {mod.title}
                      </h3>
                      <p className="text-xs text-foreground/50 leading-relaxed mb-3 flex-1" data-testid={`text-module-desc-${mod.slug}`}>
                        {mod.desc}
                      </p>
                      <ul className="space-y-1 mb-4">
                        {mod.bullets.map((b, i) => (
                          <li key={i} className="text-[11px] text-foreground/40 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#ff6a00]/40 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <span className="text-[#ff6a00] text-xs font-semibold flex items-center gap-1 mt-auto group-hover:gap-2 transition-all" data-testid={`link-module-${mod.slug}`}>
                        Mehr erfahren <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-14 text-center"
          >
            <motion.p variants={fadeUp} className="text-sm text-foreground/40 max-w-xl mx-auto mb-6 leading-relaxed" data-testid="text-module-cta-desc">
              KIO läuft dort, wo deine Teams arbeiten: Microsoft Teams – mit klarer Mandantentrennung und Governance.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate("/kio-oekosystem")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-suite-entdecken"
              >
                Suite entdecken <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleContact}
                className="font-semibold"
                data-testid="button-demo-anfragen"
              >
                Demo anfragen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 relative border-t border-border" data-testid="section-tech">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-tech-title">
              Technologie
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-tech-desc">
              KIO integriert sich nahtlos in Ihre bestehende Systemlandschaft.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {techFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="glass-card rounded-md p-6 flex flex-col items-center gap-3 text-center"
                data-testid={`tech-feature-${idx}`}
              >
                <div className="text-[#ff6a00]/60">{feat.icon}</div>
                <span className="text-xs font-bold text-foreground/50 tracking-wide uppercase">{feat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="cta-final" className="py-20 lg:py-28 relative" data-testid="section-cta-final">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-cta-title-industrie">
              Vom Systembestand
              <br />
              <span className="text-foreground/40">zum Wettbewerbsvorteil.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-10">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-strategiegespraech"
              >
                Strategiegespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
