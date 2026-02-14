import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CalendarCheck, UserSearch, MessageSquareQuote, Radio, BookOpenCheck, Lightbulb, TrendingUp, Award, ShieldCheck } from "lucide-react";
import aixLogoPath from "@assets/image6.png";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const workflowSteps = [
  { label: "Termin angekündigt", desc: "Ein politischer Termin wird im Kalender erkannt oder manuell erfasst." },
  { label: "Stakeholder automatisch geladen", desc: "KIO identifiziert relevante Akteure, Positionen und Beziehungshistorie." },
  { label: "Argumentationslinien vorgeschlagen", desc: "Passende Talking Points und Gegenargumente werden aus dem Wissensbestand generiert." },
  { label: "Termin durchgeführt", desc: "Das Beratungsgespräch findet statt — vorbereitet, nicht improvisiert." },
  { label: "Wissen gespeichert", desc: "Ergebnisse, Kontakte und Erkenntnisse fließen zurück ins KIO-Wissensgedächtnis." },
];

const useCaseCards = [
  { icon: CalendarCheck, title: "Terminbriefing Ministerium", hover: "Automatische Zusammenstellung von Agenda, Stakeholder-Profilen und relevanten Vorgängen. Bereit in Minuten statt Stunden." },
  { icon: UserSearch, title: "Stakeholder Mapping", hover: "Dynamische Netzwerkanalyse über Fraktions-, Ausschuss- und Ländergrenzen hinweg. Beziehungswissen wird strukturiert sichtbar." },
  { icon: BookOpenCheck, title: "Positionshistorie", hover: "Chronologische Darstellung aller bisherigen Positionen, Stellungnahmen und Kommunikationslinien eines Mandats." },
  { icon: Radio, title: "Politikmonitoring", hover: "Echtzeit-Tracking von Gesetzgebungsprozessen, Ausschussaktivitäten und regulatorischen Entwicklungen mit automatischer Relevanzfilterung." },
  { icon: MessageSquareQuote, title: "Mandatshistorie Kunde", hover: "Vollständige Mandantenakte mit allen vergangenen Beratungen, Entscheidungen und Kontaktpunkten — sofort abrufbar." },
  { icon: Lightbulb, title: "Argumentationsvorschläge", hover: "KIO generiert kontextbasierte Argumentationslinien aus internem Wissen, Mandantenposition und aktuellem Regulierungsstand." },
];

const impactStatements = [
  { icon: TrendingUp, statement: "Mehr Mandate pro Berater", desc: "Durch systematisierte Vorbereitung steigt die Kapazität, ohne die Qualität zu senken." },
  { icon: Award, statement: "Gleichbleibende Qualität", desc: "Unabhängig von Person, Tagesform oder Personalwechsel — das Niveau bleibt konstant." },
  { icon: ShieldCheck, statement: "Kein Wissensverlust", desc: "Erfahrung bleibt im System, nicht im Kopf einzelner Mitarbeiter." },
];

export default function PublicAffairs() {
  const [, navigate] = useLocation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-black/[0.06]" data-testid="nav-public-affairs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-logo-pa">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded-md flex items-center justify-center text-white font-bold text-base tracking-tighter">
                K
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">KIO</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/">
              <span className="text-sm font-medium text-foreground/50 cursor-pointer" data-testid="link-nav-home-pa">Home</span>
            </Link>
            <span className="text-sm font-bold text-[#ff6a00]" data-testid="text-nav-active-pa">Public Affairs</span>
            <button
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-foreground/50"
              data-testid="button-nav-kontakt-pa"
            >
              Kontakt
            </button>
          </div>
          <div className="sm:hidden">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground/50 gap-1" data-testid="button-back-home-pa">
                <ArrowLeft className="w-4 h-4" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden" data-testid="section-hero-pa">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-10" data-testid="breadcrumb-pa">
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <span>Branchen</span>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">Public Affairs</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 leading-[1.1] text-foreground text-center" data-testid="text-hero-title-pa">
              Politische Beratung braucht kein weiteres Tool
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-6 text-foreground text-center" data-testid="text-hero-subheadline-pa">
              sondern ein Arbeitsgedächtnis
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 mb-12 max-w-xl leading-relaxed text-center mx-auto" data-testid="text-hero-subtitle-pa">
              KIO verbindet politische Quellen, Mandate und Dokumente zu nutzbarem Arbeitswissen.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center">
              <Button
                onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-demo-hero-pa"
              >
                Demo anfragen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="workflow" className="py-24 lg:py-32 relative" data-testid="section-workflow-pa">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-workflow-title-pa">
              Vom Termin zum Wissensvorsprung
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-lg" data-testid="text-workflow-desc-pa">
              Ein typischer Beratungsworkflow — unterstützt durch KIO.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative"
          >
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-[#ff6a00]/20 via-[#ff6a00]/10 to-transparent" />

            <div className="space-y-10">
              {workflowSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative pl-14"
                  data-testid={`pa-workflow-step-${idx}`}
                >
                  <div className="absolute left-3 top-1.5 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${idx === workflowSteps.length - 1 ? 'border-[#ff6a00] bg-[#ff6a00]' : 'border-[#ff6a00]/30 bg-background'}`}>
                      {idx === workflowSteps.length - 1 && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-base font-semibold text-foreground mb-1" data-testid={`text-pa-workflow-label-${idx}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="usecases" className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-usecases-pa">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-usecases-title-pa">
              Anwendungsfälle
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-usecases-desc-pa">
              Wie KIO politische Beratung im Alltag transformiert.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {useCaseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card rounded-md p-6 relative group cursor-default min-h-[180px] flex flex-col"
                  data-testid={`pa-usecase-card-${idx}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`transition-opacity duration-300 ${hoveredCard === idx ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="w-12 h-12 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-foreground" data-testid={`text-pa-usecase-title-${idx}`}>
                      {card.title}
                    </h3>
                  </div>
                  <div className={`absolute inset-0 p-6 flex items-center transition-opacity duration-300 ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-sm text-foreground/60 leading-relaxed" data-testid={`text-pa-usecase-hover-${idx}`}>
                      {card.hover}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="impact" className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-impact-pa">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-impact-title-pa">
              Organisatorischer Impact
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {impactStatements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card rounded-md p-8 text-center"
                  data-testid={`pa-impact-card-${idx}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`text-pa-impact-statement-${idx}`}>
                    {item.statement}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-base text-foreground/50 max-w-lg mx-auto leading-relaxed" data-testid="text-pa-impact-summary">
              KIO repliziert Erfahrung statt Personal zu erhöhen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-referenzen-pa">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-referenzen-title-pa">
              Referenzen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-referenzen-desc-pa">
              Public-Affairs-Beratungen, die auf KIO setzen.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-10"
          >
            <motion.a
              variants={fadeUp}
              href="https://www.miller-meier.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-md px-10 py-8 flex items-center justify-center hover-elevate transition-all"
              data-testid="link-referenz-miller-meier"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-foreground" data-testid="text-referenz-miller-meier">Miller &amp; Meier</span>
                <span className="text-xs text-foreground/40 font-medium tracking-wide">CONSULTING</span>
              </div>
            </motion.a>

            <motion.a
              variants={fadeUp}
              href="https://365sherpas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-md px-10 py-8 flex items-center justify-center hover-elevate transition-all"
              data-testid="link-referenz-365sherpas"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-foreground" data-testid="text-referenz-365sherpas">365Sherpas</span>
                <span className="text-xs text-foreground/40 font-medium tracking-wide">PUBLIC AFFAIRS</span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="cta-final" className="py-32 lg:py-44 relative" data-testid="section-cta-final-pa">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-cta-title-pa">
              Erfahrung wird nur wertvoll,
              <br />
              <span className="text-foreground/40">wenn sie verfügbar ist.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-10">
              <Button
                onClick={() => navigate("/")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-demo-cta-pa"
              >
                Demo anfragen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] py-10" data-testid="footer-pa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground/60">KIO</span>
          </div>
          <p className="text-sm text-foreground/30" data-testid="text-copyright-pa">&copy; 2026 KIO Ecosystem</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <a href="https://ai-xperience.io" target="_blank" rel="noopener noreferrer" data-testid="link-aix-logo-pa" className="inline-block opacity-60 hover:opacity-100 transition-opacity">
              <img src={aixLogoPath} alt="AI-Xperience" className="h-8 w-auto" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
