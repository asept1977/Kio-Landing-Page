import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Shield,
  Network,
  Layers,
  Cpu,
  Link2,
  FileSearch,
  Radio,
  BookOpen,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

interface UseCase {
  id: string;
  icon: JSX.Element;
  title: string;
  problem: string;
  solution: string;
  value: string;
}

const useCases: UseCase[] = [
  {
    id: "uc-1",
    icon: <FileSearch className="w-6 h-6" />,
    title: "Stellungnahmen in Rekordzeit",
    problem:
      "Last-Minute-Entwürfe, verteilte historische Positionen, manuelle Suche über Dutzende Dokumente, extremer Zeitdruck bei politischen Fristen.",
    solution:
      "KIO indexiert alle bestehenden Positionen, baut eine hierarchische Wissensstruktur auf, analysiert eingehende Entwürfe, gleicht sie mit vergangenen Stellungnahmen ab und erstellt konsistente, argumentativ schlüssige Entwürfe.",
    value:
      "60\u201380 % Zeitersparnis, konsistente Argumentation über alle Ebenen, schnellere Reaktionsfähigkeit, weniger Engpässe in Stoßzeiten.",
  },
  {
    id: "uc-2",
    icon: <Radio className="w-6 h-6" />,
    title: "Policy Monitoring & Stakeholder-Analyse",
    problem:
      "Initiativen verstreut über Parlamentsdatenbanken, Gesetzgebungsprozesse schwer nachvollziehbar, Stakeholder-Landschaft intransparent, manuelles Monitoring bindet Kapazitäten.",
    solution:
      "Integration externer Quellen (DIP, Lobbyregister, Medien) und interner Dokumente. Automatisches Clustering, Frühwarnsystem bei relevanten Entwicklungen und dynamische Stakeholder-Maps.",
    value:
      "Frühere Positionierung, bessere Strategieentscheidungen, deutlich weniger Rechercheaufwand, höherer politischer Impact.",
  },
  {
    id: "uc-3",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Föderale Wissensintegration",
    problem:
      "Paralleles Arbeiten ohne Abstimmung, Wissenssilos zwischen Bund-/Landes-/Fachebene, personengebundenes Wissen, Redundanzen und Inkonsistenzen.",
    solution:
      "Hierarchische Wissensarchitektur mit rollenbasiertem Zugriff, geteilte semantische Schicht über alle Verbandsebenen und kontextbasierter Zugang pro Organisationseinheit.",
    value:
      "Einheitliche Positionierung, volle Transparenz über Wissensbestände, schnellere Abstimmungen, nachhaltige Wissenssicherung.",
  },
  {
    id: "uc-4",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Mitgliederkommunikation & Service",
    problem:
      "Wiederkehrende Anfragen zu denselben Themen, Überlastung der Geschäftsstelle, ungleiche Wissensstände bei Mitgliedern.",
    solution:
      "KI-Assistent für Mitarbeiter mit kontextbasierten Antworten aus dem gesamten Verbandswissen: Zusammenfassungen, Antwortvorschläge und Service-Templates.",
    value:
      "Schnellerer Service, höhere Mitgliederzufriedenheit, geringere Arbeitslast, skalierbarer Betrieb ohne zusätzliches Personal.",
  },
  {
    id: "uc-5",
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Konsistenzprüfung & Compliance",
    problem:
      "Mehrere Dokumentversionen im Umlauf, manuelle Übertragung in Register, Reputationsrisiko bei widersprüchlichen öffentlichen Aussagen.",
    solution:
      "Automatische Konsistenzprüfungen zwischen Dokumenten, Änderungsanalyse, Versionshistorie und Abgleich zwischen internen Positionen und öffentlichen Registereinträgen.",
    value:
      "Weniger Compliance-Risiken, höheres Vertrauen bei Stakeholdern, professioneller Außenauftritt.",
  },
];

const whyPoints = [
  "Föderale Strukturen (Bund / Landes- / Fachverbände)",
  "Verteilte Dokumente & Versionen",
  "Kurze Fristen für Stellungnahmen",
  "Hoher manueller Koordinationsaufwand",
];

const techStack = [
  { icon: <Layers className="w-5 h-5" />, label: "RAG + GraphRAG" },
  { icon: <Network className="w-5 h-5" />, label: "Knowledge Graph (Neo4j)" },
  { icon: <Cpu className="w-5 h-5" />, label: "Vector DB (Qdrant)" },
  { icon: <Shield className="w-5 h-5" />, label: "Multi-Agent Architecture" },
  { icon: <Link2 className="w-5 h-5" />, label: "MCP Connectors (SharePoint / Email / ERP / CRM)" },
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
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden animated-gradient" data-testid="section-hero-verbaende">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#ff6a00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#003366]/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-semibold text-xs tracking-widest mb-8 border border-[#ff6a00]/20" data-testid="text-badge-verbaende">
                KIO FÜR VERBÄNDE
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.08]" data-testid="text-hero-title-verbaende">
              <span className="text-white">Komplexität reduzieren.</span>
              <br />
              <span className="text-gradient">Position stärken.</span>
              <br />
              <span className="text-white">Wissen nutzbar machen.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/40 mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle-verbaende">
              Verbände arbeiten in föderalen Strukturen mit verteiltem Wissen. KIO bringt Geschwindigkeit, Konsistenz und Transparenz in Ihre Organisation.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-demo-hero"
              >
                Demo anfragen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("use-cases")?.scrollIntoView({ behavior: "smooth" })}
                className="border-white/10 text-white/70"
                data-testid="button-usecases-hero"
              >
                Use Cases ansehen
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14">
              <ChevronDown className="w-5 h-5 text-white/20 mx-auto animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY KIO */}
      <section id="warum" className="py-20 lg:py-28 relative" data-testid="section-warum">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-warum-title">
              Warum KIO im Verband?
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {whyPoints.map((point, idx) => (
              <motion.div key={idx} variants={fadeUp} className="glass-card rounded-md p-5 flex items-start gap-4" data-testid={`why-point-${idx}`}>
                <div className="w-2 h-2 mt-2 rounded-full bg-[#ff6a00] shrink-0" />
                <span className="text-sm font-medium text-white/70">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="py-20 lg:py-28 relative border-y border-white/5" data-testid="section-usecases">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-usecases-title">
              Use Cases
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-white/40 max-w-lg mx-auto">
              Fünf konkrete Anwendungsfälle. Jeder mit Problem, Lösung und messbarem Wertbeitrag.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-6">
            {useCases.map((uc, idx) => (
              <motion.div key={uc.id} variants={fadeUp} className="glass-card glass-card-hover rounded-md p-6 sm:p-8 transition-all duration-500" data-testid={`card-usecase-${idx}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#ff6a00]/10 text-[#ff6a00] rounded-md flex items-center justify-center shrink-0">
                    {uc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white" data-testid={`text-usecase-title-${idx}`}>{uc.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-400/80">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold tracking-wider uppercase">Problem</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed" data-testid={`text-problem-${idx}`}>{uc.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#ff6a00]">
                      <Lightbulb className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold tracking-wider uppercase">KIO-Lösung</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed" data-testid={`text-solution-${idx}`}>{uc.solution}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400/80">
                      <TrendingUp className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold tracking-wider uppercase">Wertbeitrag</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed" data-testid={`text-value-${idx}`}>{uc.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECH BASIS */}
      <section id="tech" className="py-20 lg:py-28 relative" data-testid="section-tech">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-3" data-testid="text-tech-title">
              Technische Basis
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-white/30">Kurz & glaubwürdig</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {techStack.map((tech, idx) => (
              <motion.div key={idx} variants={fadeUp} className="glass-card rounded-md px-5 py-3 flex items-center gap-3" data-testid={`tech-item-${idx}`}>
                <span className="text-[#ff6a00]/60">{tech.icon}</span>
                <span className="text-sm font-medium text-white/70">{tech.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-white/40 font-medium" data-testid="text-tech-compliance">
            DSGVO-konform, europäisch betreibbar, rollenbasiert.
          </motion.p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final" className="py-20 lg:py-28 relative border-t border-white/5" data-testid="section-cta-final">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/3 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title-verbaende">
              Vom Dokumentenchaos zur
              <br />
              <span className="text-gradient">Position mit Wirkung.</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Button
                onClick={() => navigate("/")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-executive-briefing"
              >
                Executive Briefing planen <ArrowRight className="ml-2 w-4 h-4" />
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
