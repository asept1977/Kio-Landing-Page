import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, FileText, MessageCircleQuestion, CalendarCheck, RefreshCw, TrendingUp, Award, ShieldCheck } from "lucide-react";
import aixLogoPath from "@assets/image6.png";
import bvsBayernLogoPath from "@assets/image_1770791016833.png";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const realitaetSteps = [
  { label: "Referentenentwurf kommt kurzfristig", desc: "Neue Entwürfe treffen oft mit wenigen Tagen Vorlauf ein — die fachliche Bewertung beginnt unter Zeitdruck." },
  { label: "Fachreferate bewerten parallel", desc: "Mehrere Abteilungen arbeiten gleichzeitig an Einschätzungen, ohne voneinander zu wissen." },
  { label: "Landesverbände melden Einwände", desc: "Regionale Positionen fließen separat ein und müssen manuell konsolidiert werden." },
  { label: "Presse fragt vor Abschluss der Abstimmung", desc: "Medienanfragen kommen, bevor eine abgestimmte Position vorliegt." },
];

const mitKioSteps = [
  { label: "Bekannte Argumente werden sofort vorgeschlagen", desc: "KIO erkennt thematische Bezüge und liefert passende Argumentationslinien aus dem Verbandsgedächtnis." },
  { label: "Frühere Beschlüsse werden automatisch berücksichtigt", desc: "Bestehende Positionen fließen direkt in die Entwurfserstellung ein — ohne manuelle Recherche." },
  { label: "Abstimmung erfolgt entlang vorhandener Positionen", desc: "Statt bei null zu beginnen, wird auf Grundlage abgestimmter Standpunkte weitergearbeitet." },
  { label: "Antworten sind am selben Tag möglich", desc: "Der Verband kann innerhalb von Stunden reagieren — fundiert, konsistent und abgestimmt." },
];

const useCaseCards = [
  { icon: FileText, title: "Stellungnahme vorbereiten", hover: "KIO liefert bestehende Beschlüsse, Argumentationslinien und Referenzdokumente — die Stellungnahme steht in Minuten statt Tagen." },
  { icon: MessageCircleQuestion, title: "Talking Points erzeugen", hover: "Kontextbasierte Gesprächspunkte auf Basis interner Positionen, aktueller Entwicklungen und Stakeholder-Profilen." },
  { icon: CalendarCheck, title: "Mitgliederinformation erstellen", hover: "Relevante Sachverhalte, Verbandspositionen und Handlungsempfehlungen in einem konsistenten Dokument — sofort versandfertig." },
  { icon: RefreshCw, title: "Terminbriefing erzeugen", hover: "Automatische Zusammenstellung von Agenda, Stakeholder-Profilen und relevanten Vorgängen — bereit in Minuten." },
];

const impactStatements = [
  { icon: TrendingUp, statement: "Schnellere Positionierung", desc: "Durch sofort verfügbares Gremienwissen reagiert der Verband in Stunden statt Wochen." },
  { icon: Award, statement: "Konsistente Außenwirkung", desc: "Unabhängig von Person oder Landesverband — die Argumentation bleibt einheitlich." },
  { icon: ShieldCheck, statement: "Kein Wissensverlust", desc: "Erfahrung bleibt im System, nicht im Kopf einzelner Mitarbeiter." },
];

export default function Verbaende() {
  const [, navigate] = useLocation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border" data-testid="nav-verbaende">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-logo-verbaende">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded-md flex items-center justify-center text-white font-bold text-base tracking-tighter">
                K
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">KIO</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/">
              <span className="text-sm font-medium text-foreground/50 cursor-pointer hover:text-foreground/80 transition-colors" data-testid="link-nav-home">Home</span>
            </Link>
            <span className="text-sm font-bold text-[#ff6a00]" data-testid="text-nav-active">Verbände</span>
            <button
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-foreground/50 hover:text-foreground/80 transition-colors"
              data-testid="button-nav-kontakt"
            >
              Kontakt
            </button>
          </div>
          <div className="sm:hidden">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground/50 gap-1" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden" data-testid="section-hero-verbaende">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-10" data-testid="breadcrumb-verbaende">
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <span>Branchen</span>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">Verbände</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 leading-[1.1] text-foreground text-center" data-testid="text-hero-title-verbaende">
              Verbände haben selten zu wenig Information
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-6 text-foreground text-center" data-testid="text-hero-subheadline-verbaende">
              sondern zu wenig Zeit zur Abstimmung
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 mb-12 max-w-xl leading-relaxed text-center mx-auto" data-testid="text-hero-subtitle-verbaende">
              KIO macht aus verteilt liegendem Wissen sofort handlungsfähige Positionen.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center">
              <Button
                onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-briefing-hero"
              >
                Executive Briefing <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="realitaet" className="py-24 lg:py-32 relative" data-testid="section-realitaet-verbaende">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-realitaet-title-verbaende">
              Realität in großen Verbänden
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-lg" data-testid="text-realitaet-desc-verbaende">
              Typische Herausforderungen im Verbandsalltag — vor KIO.
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
              {realitaetSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative pl-14"
                  data-testid={`verbaende-realitaet-step-${idx}`}
                >
                  <div className="absolute left-3 top-1.5 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${idx === realitaetSteps.length - 1 ? 'border-[#ff6a00] bg-[#ff6a00]' : 'border-[#ff6a00]/30 bg-background'}`}>
                      {idx === realitaetSteps.length - 1 && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-base font-semibold text-foreground mb-1" data-testid={`text-verbaende-realitaet-label-${idx}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 pl-14"
          >
            <p className="text-sm font-semibold text-foreground/40 italic" data-testid="text-realitaet-fazit">
              Ergebnis: Reaktion statt Position.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="mit-kio" className="py-24 lg:py-32 relative border-t border-border" data-testid="section-mitkio-verbaende">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-mitkio-title-verbaende">
              Mit KIO
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-lg" data-testid="text-mitkio-desc-verbaende">
              Derselbe Verband — mit organisationalem Arbeitsgedächtnis.
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
              {mitKioSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="relative pl-14"
                  data-testid={`verbaende-mitkio-step-${idx}`}
                >
                  <div className="absolute left-3 top-1.5 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${idx === mitKioSteps.length - 1 ? 'border-[#ff6a00] bg-[#ff6a00]' : 'border-[#ff6a00]/30 bg-background'}`}>
                      {idx === mitKioSteps.length - 1 && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-base font-semibold text-foreground mb-1" data-testid={`text-verbaende-mitkio-label-${idx}`}>
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

      <section id="beispiele" className="py-24 lg:py-32 relative border-t border-border" data-testid="section-beispiele-verbaende">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-beispiele-title-verbaende">
              Anwendungsfälle
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-beispiele-desc-verbaende">
              Wie KIO den Verbandsalltag im Alltag transformiert.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {useCaseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card rounded-md p-6 relative group cursor-default min-h-[180px] flex flex-col"
                  data-testid={`verbaende-usecase-card-${idx}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`transition-opacity duration-300 ${hoveredCard === idx ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="w-12 h-12 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-foreground" data-testid={`text-verbaende-usecase-title-${idx}`}>
                      {card.title}
                    </h3>
                  </div>
                  <div className={`absolute inset-0 p-6 flex items-center transition-opacity duration-300 ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-sm text-foreground/60 leading-relaxed" data-testid={`text-verbaende-usecase-hover-${idx}`}>
                      {card.hover}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="wirkung" className="py-24 lg:py-32 relative border-t border-border" data-testid="section-wirkung-verbaende">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-wirkung-title-verbaende">
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
                  data-testid={`verbaende-impact-card-${idx}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`text-verbaende-impact-statement-${idx}`}>
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
            variants={stagger}
            className="text-center"
          >
            <motion.h3 variants={fadeUp} className="text-xl md:text-2xl font-bold text-foreground mb-2" data-testid="text-verbaende-wirkung-headline">
              Der Unterschied ist nicht schneller schreiben
            </motion.h3>
            <motion.p variants={fadeUp} className="text-base text-foreground/50 max-w-lg mx-auto leading-relaxed" data-testid="text-verbaende-wirkung-summary">
              sondern rechtzeitig sprechen. Der Verband wird gestaltend statt reagierend.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative border-t border-border" data-testid="section-referenzen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-referenzen-title">
              Referenzen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-referenzen-desc">
              Verbände, die bereits auf KIO setzen.
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
              href="https://bvs-bayern.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-md px-10 py-8 flex items-center justify-center hover-elevate transition-all"
              data-testid="link-referenz-bvs"
            >
              <img
                src={bvsBayernLogoPath}
                alt="BVS Bayern - Sportverband für para, reha, inklusion"
                className="h-12 w-auto"
                data-testid="img-referenz-bvs"
              />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="cta-final" className="py-32 lg:py-44 relative" data-testid="section-cta-final">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-cta-title-verbaende">
              Erfahrung wird nur wertvoll,
              <br />
              <span className="text-foreground/40">wenn sie verfügbar ist.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-10">
              <Button
                onClick={() => navigate("/")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-executive-briefing"
              >
                Strategiegespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border py-10" data-testid="footer-verbaende">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground/60">KIO</span>
          </div>
          <p className="text-sm text-foreground/30" data-testid="text-copyright-verbaende">&copy; 2026 KIO Ecosystem</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <a href="https://ai-xperience.io" target="_blank" rel="noopener noreferrer" data-testid="link-aix-logo-verbaende" className="inline-block opacity-60 hover:opacity-100 transition-opacity">
              <img src={aixLogoPath} alt="AI-Xperience" className="h-8 w-auto" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
