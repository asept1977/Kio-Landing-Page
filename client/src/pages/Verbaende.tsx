import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
    headline: "Stellungnahmen in Rekordzeit",
    problemBullets: [
      "Last-Minute-Entwürfe",
      "Verteiltes Positionswissen",
      "Politischer Zeitdruck",
    ],
    intervention:
      "KIO analysiert neue Entwürfe, gleicht sie automatisch mit föderalem Verbandswissen ab und erzeugt belastbare Vorlagen.",
    impactNumber: "\u201370 %",
    impactLabel: "Recherchezeit",
    impactBullets: [
      "Konsistente Argumentation",
      "Schnellere Reaktionsfähigkeit",
    ],
  },
  {
    headline: "Policy Monitoring & Stakeholder-Analyse",
    problemBullets: [
      "Intransparente Gesetzgebung",
      "Verteilte Datenquellen",
      "Hoher Monitoring-Aufwand",
    ],
    intervention:
      "Integration parlamentarischer Daten, Lobbyregister und interner Dokumente. Automatisches Clustering und Frühwarnsystem.",
    impactNumber: "3\u00d7",
    impactLabel: "schnellere Positionierung",
    impactBullets: [
      "Strategisch fundierte Entscheidungen",
      "Reduzierter Rechercheaufwand",
    ],
  },
  {
    headline: "Föderale Wissensintegration",
    problemBullets: [
      "Silostrukturen",
      "Personengebundenes Wissen",
      "Redundante Abstimmungen",
    ],
    intervention:
      "Hierarchische Wissensarchitektur mit rollenbasiertem Zugriff und gemeinsamer semantischer Struktur.",
    impactNumber: "100 %",
    impactLabel: "Wissenstransparenz",
    impactBullets: [
      "Einheitliche Positionierung",
      "Nachhaltige Wissenssicherung",
    ],
  },
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
            <span className="text-sm font-bold text-[#ff6a00]" data-testid="text-nav-active">Verbände</span>
            <button
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-white/50"
              data-testid="button-nav-kontakt"
            >
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
      <section className="relative pt-36 pb-28 lg:pt-52 lg:pb-40 overflow-hidden" data-testid="section-hero-verbaende">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/6 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[#ff6a00] text-[11px] font-bold tracking-[0.3em] uppercase mb-12" data-testid="text-badge-verbaende">
              KIO für Verbände
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05] text-white" data-testid="text-hero-title-verbaende">
              Strategische
              <br />
              Handlungsfähigkeit
              <br />
              <span className="text-white/30">unter Zeitdruck.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm md:text-base text-white/30 mb-14 max-w-md mx-auto leading-relaxed" data-testid="text-hero-subtitle-verbaende">
              KIO orchestriert verteiltes Verbandswissen zu strategischer Wirkung.
            </motion.p>

            <motion.div variants={fadeUp}>
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

      {/* STRATEGIC FLOW TIMELINE */}
      <section id="timeline" className="py-24 lg:py-36 relative" data-testid="section-timeline">
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
                {/* Use case headline */}
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white text-center mb-16" data-testid={`text-timeline-title-${idx}`}>
                  {uc.headline}
                </motion.h2>

                {/* Vertical flow container */}
                <div className="relative pl-8 sm:pl-12">
                  {/* vertical line */}
                  <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-white/6 via-white/10 to-white/4" />

                  {/* STEP 1: PROBLEM */}
                  <motion.div variants={fadeUp} className="relative mb-12" data-testid={`timeline-problem-${idx}`}>
                    {/* dot */}
                    <div className="absolute -left-5 sm:-left-7 top-1 w-2.5 h-2.5 rounded-full bg-white/20 border border-white/10" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mb-3">Problem</p>
                    <ul className="space-y-1.5">
                      {uc.problemBullets.map((b, i) => (
                        <li key={i} className="text-sm text-white/40 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/15 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* STEP 2: INTERVENTION */}
                  <motion.div variants={fadeUp} className="relative mb-12" data-testid={`timeline-intervention-${idx}`}>
                    {/* dot */}
                    <div className="absolute -left-5 sm:-left-7 top-1 w-2.5 h-2.5 rounded-full bg-[#ff6a00]/40 border border-[#ff6a00]/20" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/40 mb-3">Intervention</p>
                    <p className="text-sm text-white/45 leading-relaxed max-w-lg">{uc.intervention}</p>
                  </motion.div>

                  {/* STEP 3: IMPACT */}
                  <motion.div variants={fadeUp} className="relative" data-testid={`timeline-impact-${idx}`}>
                    {/* glowing dot */}
                    <div className="absolute -left-5 sm:-left-7 top-6 w-2.5 h-2.5 rounded-full bg-[#ff6a00] shadow-[0_0_10px_rgba(255,106,0,0.4)]" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mb-4">Impact</p>
                    <div className="rounded-md bg-white/[0.03] border border-white/[0.06] p-6 sm:p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6a00]/[0.02] to-transparent pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-1" data-testid={`text-impact-number-${idx}`}>
                          {uc.impactNumber}
                        </p>
                        <p className="text-sm text-white/40 mb-5" data-testid={`text-impact-label-${idx}`}>{uc.impactLabel}</p>
                        <div className="space-y-2">
                          {uc.impactBullets.map((b, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/40 shrink-0" />
                              <span className="text-sm text-white/55 font-medium">{b}</span>
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

      {/* FINAL CTA */}
      <section id="cta-final" className="py-32 lg:py-44 relative" data-testid="section-cta-final">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
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
              <span className="text-white/30">zur strategischen Position.</span>
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
          <p className="text-sm text-white/25" data-testid="text-copyright-verbaende">&copy; 2026 KIO Ecosystem</p>
        </div>
      </footer>
    </div>
  );
}
