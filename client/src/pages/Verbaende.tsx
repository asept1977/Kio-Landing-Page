import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface TimelineCase {
  headline: string;
  problem: string[];
  intervention: string;
  impact: string[];
}

const timelineCases: TimelineCase[] = [
  {
    headline: "Stellungnahmen in Rekordzeit",
    problem: [
      "Last-Minute-Entwürfe",
      "Verteilte historische Positionen",
      "Zeitkritische politische Fristen",
    ],
    intervention:
      "KIO analysiert neue Entwürfe, gleicht sie mit föderalem Verbandswissen ab, erzeugt konsistente, argumentativ belastbare Vorlagen.",
    impact: [
      "\u201370 % Recherchezeit",
      "Konsistente Argumentationslinie",
      "Schnellere Reaktionsfähigkeit",
    ],
  },
  {
    headline: "Policy Monitoring & Stakeholder-Analyse",
    problem: [
      "Gesetzgebungsprozesse intransparent",
      "Initiativen verteilt über Datenquellen",
      "Hoher manueller Monitoring-Aufwand",
    ],
    intervention:
      "Integration parlamentarischer Daten (z.\u202fB. DIP), Lobbyregister und interner Dokumente. Automatisches Clustering und Frühwarnsystem.",
    impact: [
      "Frühere Positionierung",
      "Strategisch fundierte Entscheidungen",
      "Reduzierter Rechercheaufwand",
    ],
  },
  {
    headline: "Föderale Wissensintegration",
    problem: [
      "Silostrukturen",
      "Personengebundenes Wissen",
      "Redundante Abstimmungen",
    ],
    intervention:
      "Hierarchische Wissensarchitektur. Rollenbasierter Zugriff. Gemeinsame semantische Struktur über alle Verbandsebenen.",
    impact: [
      "Einheitliche Positionierung",
      "Transparente Dokumentenlage",
      "Nachhaltige Wissenssicherung",
    ],
  },
];

const techBasis = [
  "RAG & GraphRAG",
  "Knowledge Graph",
  "Multi-Agent Architecture",
  "MCP-Integration",
  "DSGVO-konform & europäisch betreibbar",
];

export default function Verbaende() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-white/5" data-testid="nav-verbaende">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-logo-verbaende">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded-md flex items-center justify-center text-white font-bold text-base tracking-tighter">
                K
              </div>
              <span className="font-bold text-lg tracking-tight text-white/90">KIO</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/">
              <span className="text-sm font-medium text-white/50 cursor-pointer" data-testid="link-nav-home">Home</span>
            </Link>
            <span className="text-sm font-bold text-[#ff6a00]" data-testid="text-nav-active">KIO für Verbände</span>
            <button onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-white/50" data-testid="button-nav-kontakt">
              Kontakt
            </button>
          </div>
          <div className="sm:hidden">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white/50 gap-1" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden" data-testid="section-hero-verbaende">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/8 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff6a00]/3 rounded-full blur-[160px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[#ff6a00] text-xs font-bold tracking-[0.25em] uppercase mb-10" data-testid="text-badge-verbaende">
              KIO für Verbände
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.08] text-white" data-testid="text-hero-title-verbaende">
              Strategische Handlungsfähigkeit
              <br />
              <span className="text-white/40">in komplexen Strukturen.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/35 mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle-verbaende">
              Verbände arbeiten unter Zeitdruck, in föderalen Strukturen und mit verteiltem Wissen.
              KIO orchestriert dieses Wissen zu strategischer Wirkung.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Button
                onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-briefing-hero"
              >
                Executive Briefing anfragen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-20">
              <ChevronDown className="w-5 h-5 text-white/15 mx-auto animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="py-24 lg:py-36 relative" data-testid="section-timeline">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent -translate-x-1/2" />

          <div className="space-y-28 lg:space-y-36">
            {timelineCases.map((uc, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="relative"
                data-testid={`timeline-step-${idx}`}
              >
                {/* timeline dot */}
                <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6a00] ring-4 ring-[#ff6a00]/10 ring-offset-4 ring-offset-background" />
                </div>

                {/* headline */}
                <motion.h3 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white text-center mb-12 lg:mb-16" data-testid={`text-timeline-title-${idx}`}>
                  {uc.headline}
                </motion.h3>

                {/* three-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                  {/* Problem */}
                  <motion.div variants={fadeUp} className="space-y-4" data-testid={`timeline-problem-${idx}`}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-4">Problem</p>
                    <ul className="space-y-3">
                      {uc.problem.map((p, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                          <span className="text-sm text-white/45 leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Intervention */}
                  <motion.div variants={fadeUp} className="space-y-4" data-testid={`timeline-intervention-${idx}`}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#ff6a00]/60 mb-4">Intervention</p>
                    <p className="text-sm text-white/55 leading-relaxed">{uc.intervention}</p>
                  </motion.div>

                  {/* Impact */}
                  <motion.div variants={fadeUp} data-testid={`timeline-impact-${idx}`}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-4">Impact</p>
                    <div className="rounded-md bg-white/[0.03] border border-white/[0.06] p-5 space-y-3">
                      {uc.impact.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/50 mt-1.5 shrink-0" />
                          <span className="text-sm text-white/70 font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH BASIS */}
      <section id="tech" className="py-20 lg:py-28 relative border-t border-white/5" data-testid="section-tech">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-8 text-center" data-testid="text-tech-title">
              Technologische Basis
            </motion.p>

            <motion.ul variants={stagger} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {techBasis.map((item, idx) => (
                <motion.li key={idx} variants={fadeUp} className="flex items-center gap-2.5" data-testid={`tech-item-${idx}`}>
                  <span className="w-1 h-1 rounded-full bg-[#ff6a00]/40" />
                  <span className="text-sm text-white/40 font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final" className="py-28 lg:py-40 relative" data-testid="section-cta-final">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.02] via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" data-testid="text-cta-title-verbaende">
              Vom Dokumentenchaos
              <br />
              <span className="text-white/40">zur strategischen Position.</span>
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

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10" data-testid="footer-verbaende">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-lg tracking-tight text-white/60">KIO</span>
          </div>
          <p className="text-sm text-white/30" data-testid="text-copyright-verbaende">&copy; 2026 KIO Ecosystem &mdash; Enterprise AI made simple.</p>
        </div>
      </footer>
    </div>
  );
}
