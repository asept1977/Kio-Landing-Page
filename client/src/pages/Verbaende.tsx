import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import aixLogoPath from "@assets/image6.png";
import bvsBayernLogoPath from "@assets/image_1770791016833.png";

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
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-black/[0.06]" data-testid="nav-verbaende">
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
              <span className="text-sm font-medium text-foreground/50 cursor-pointer" data-testid="link-nav-home">Home</span>
            </Link>
            <span className="text-sm font-bold text-[#ff6a00]" data-testid="text-nav-active">Verbände</span>
            <button
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              className="text-sm font-medium text-foreground/50"
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

      <section className="relative pt-36 pb-28 lg:pt-52 lg:pb-40 overflow-hidden" data-testid="section-hero-verbaende">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-10" data-testid="breadcrumb-verbaende">
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <span>Lösungen</span>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">Verbände</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 leading-[1.1] text-foreground text-center" data-testid="text-hero-title-verbaende">
              Große Verbände haben kein Wissensproblem
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-6 text-foreground text-center" data-testid="text-hero-subheadline-verbaende">
              sondern verteilte Wissensinseln
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 mb-12 max-w-xl leading-relaxed text-center mx-auto" data-testid="text-hero-subtitle-verbaende">
              KIO verbindet Gremienwissen, Mitgliederpositionen und Dokumente zu gemeinsam nutzbarem Arbeitswissen.
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
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16" data-testid={`text-timeline-title-${idx}`}>
                  {uc.headline}
                </motion.h2>

                <div className="relative pl-8 sm:pl-12">
                  <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-black/[0.04] via-black/[0.08] to-black/[0.03]" />

                  <motion.div variants={fadeUp} className="relative mb-12" data-testid={`timeline-problem-${idx}`}>
                    <div className="absolute -left-5 sm:-left-7 top-1 w-2.5 h-2.5 rounded-full bg-foreground/20 border border-black/[0.08]" />
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
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/40 mb-3">Lösung</p>
                    <p className="text-sm text-foreground/50 leading-relaxed max-w-lg">{uc.intervention}</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="relative" data-testid={`timeline-impact-${idx}`}>
                    <div className="absolute -left-5 sm:-left-7 top-6 w-2.5 h-2.5 rounded-full bg-[#ff6a00] shadow-[0_0_10px_rgba(255,106,0,0.4)]" />
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/25 mb-4">Impact</p>
                    <div className="rounded-md bg-black/[0.02] border border-black/[0.06] p-6 sm:p-8 relative overflow-hidden">
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

      <section className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-referenzen">
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
              Vom Dokumentenchaos
              <br />
              <span className="text-foreground/40">zur strategischen Position.</span>
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

      <footer className="border-t border-black/[0.06] py-10" data-testid="footer-verbaende">
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
