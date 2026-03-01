import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/i18n";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  GitCompareArrows,
  ClipboardCheck,
  FileCheck2,
  Users,
  Landmark,
  Building2,
  Shield,
  Lock,
  Server,
  Check,
  UsersRound,
  GraduationCap,
  Layers,
  FolderOpen,
  HardDrive,
  Database,
  Mail,
  Globe,
} from "lucide-react";
import dataflowImg from "@assets/78B2D6D0-873E-4774-9DB1-0EF85D3DFFCC_1772401026461.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const whyBullets = [
  { icon: Eye, text: "Früherkennung politischer & regulatorischer Entwicklungen" },
  { icon: GitCompareArrows, text: "Konsistente Positionslinien & Abgleich mit Beschlusslagen" },
  { icon: ClipboardCheck, text: "Nachvollziehbare Entscheidungsgrundlagen für Gremien" },
  { icon: FileCheck2, text: "Dokumentation & Auditfähigkeit" },
];

const orgCards = [
  {
    icon: Landmark,
    title: "Politikberatungsagenturen",
    desc: "Mandatsbasierte Beratung mit strikter Vertraulichkeit.",
    criteria: [
      "Strikte Mandatstrennung / Wissensräume",
      "Issue- & Stakeholder-Monitoring",
      "Zeitkritische Briefings & Argumentationslinien",
    ],
    cta: "Mehr erfahren",
    href: "/public-affairs",
  },
  {
    icon: Users,
    title: "Verbände",
    desc: "Mitgliederbasierte Organisationen mit Fachreferaten und Beschlussstrukturen.",
    criteria: [
      "Positionspapiere & Beschlusslagen integrieren",
      "Stellungnahmen konsistent ableiten",
      "Mitgliederkommunikation beschleunigen",
    ],
    cta: "Mehr erfahren",
    href: "/verbaende",
  },
  {
    icon: Building2,
    title: "Wirtschaftsvertretungen",
    desc: "Organisationen mit gesetzlichem Auftrag und hohen Governance-Anforderungen.",
    criteria: [
      "Nachvollziehbarkeit & Dokumentation",
      "Audit-Logging optional",
      "Public-Sector-taugliche Architektur",
    ],
    cta: "Mehr erfahren",
    href: "#ihk",
  },
];

const securityTiers = [
  {
    icon: Shield,
    title: "Shared",
    desc: "Standardumgebung mit logischer Mandantentrennung. Ideal für erste Pilotprojekte und kleinere Teams.",
  },
  {
    icon: Lock,
    title: "Mandantenisoliert",
    desc: "Separate Datenräume pro Organisation oder Mandat. Geeignet für Beratungsunternehmen und Verbände mit vertraulichen Inhalten.",
  },
  {
    icon: Server,
    title: "Dediziert",
    desc: "Eigene Infrastruktur, vollständige Kontrolle. Für Organisationen mit höchsten Anforderungen an Datensouveränität und Compliance.",
  },
];

const trustStatements = [
  "EU-Hosting — Daten verbleiben in der Europäischen Union",
  "Keine Nutzung von Kundendaten für Modelltraining",
  "Dokumentierte Governance- und Zugriffskontrollen",
];

export default function Interessenvertretung() {
  const [, navigate] = useLocation();
  const [lang, setLang] = useState<Lang>("de");

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden" data-testid="section-hero-iv">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#001a33] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,0,0.08)_0%,_transparent_60%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-white/50 mb-10" data-testid="breadcrumb-iv">
              <Link href="/"><span className="cursor-pointer hover:text-white/70 transition-colors">KIO</span></Link>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">Interessenvertretung</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-white" data-testid="text-hero-title-iv">
              Professionelle Interessenvertretung
            </motion.h1>

            <motion.div variants={fadeUp} className="mb-8 space-y-2.5" data-testid="text-hero-tagline-iv">
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug flex items-center gap-3"><ArrowRight className="w-4 h-4 text-[#ff6a00]/70 shrink-0" /> Organisationswissen aktivieren.</p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug flex items-center gap-3"><ArrowRight className="w-4 h-4 text-[#ff6a00]/70 shrink-0" /> Positionen stärken.</p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-snug flex items-center gap-3"><ArrowRight className="w-4 h-4 text-[#ff6a00]/70 shrink-0" /> Handlungsfähigkeit sichern.</p>
            </motion.div>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/60 mb-12 max-w-3xl leading-relaxed" data-testid="text-hero-subtitle-iv">
              KIO verbindet internes Wissen, Positionsmanagement und kontinuierliches Monitoring zu einer belastbaren Entscheidungsgrundlage — mit höchster Governance- und Sicherheitskonformität.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-hero-contact-iv"
              >
                Architekturgespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("sicherheit")?.scrollIntoView({ behavior: "smooth" })}
                className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                data-testid="button-hero-security-iv"
              >
                Sicherheit ansehen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-dataflow-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={dataflowImg}
              alt="KIO Datenfluss – Externe Daten (DIP, Lobbyregister, Medienrecherche) und Interne Daten (SharePoint, Outlook, Dateisystem) fließen in KIO zusammen"
              className="w-full h-auto block"
              data-testid="img-dataflow-iv"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-warum-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-warum-title-iv">
              Warum Struktur entscheidend ist
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto" data-testid="text-warum-desc-iv">
              Professionelle Interessenvertretung lebt von Nachvollziehbarkeit, Konsistenz und Geschwindigkeit.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto"
          >
            {whyBullets.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                  data-testid={`iv-warum-bullet-${idx}`}
                >
                  <div className="w-9 h-9 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed pt-1.5">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-organisationen-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-org-title-iv">
              Drei Organisationsformen — drei Schwerpunkte
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {orgCards.map((card, idx) => {
              const Icon = card.icon;
              const cardContent = (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                  transition={{ duration: 0.2 }}
                  className="group cursor-pointer rounded-xl border border-border hover:border-[#ff6a00]/30 bg-background p-6 flex flex-col"
                  data-testid={`iv-org-card-${idx}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center mb-4 group-hover:bg-[#ff6a00]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#ff6a00]/60 group-hover:text-[#ff6a00] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[#ff6a00] transition-colors" data-testid={`text-iv-org-title-${idx}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-foreground/50 mb-4">{card.desc}</p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {card.criteria.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-sm text-foreground/60">
                        <Check className="w-4 h-4 text-[#ff6a00]/60 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="inline-flex items-center gap-1.5 text-[#ff6a00] text-sm font-semibold group-hover:gap-2.5 transition-all mt-auto"
                    data-testid={`link-iv-org-cta-${idx}`}
                  >
                    {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.div>
              );

              if (card.href?.startsWith("#")) {
                return (
                  <div key={idx} onClick={() => document.getElementById(card.href!.slice(1))?.scrollIntoView({ behavior: "smooth" })}>
                    {cardContent}
                  </div>
                );
              } else if (card.href) {
                return <Link key={idx} href={card.href}>{cardContent}</Link>;
              }
              return <div key={idx} onClick={handleContact}>{cardContent}</div>;
            })}
          </motion.div>
        </div>
      </section>

      <section id="sicherheit" className="py-8 lg:py-10 relative" data-testid="section-sicherheit-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-sicherheit-title-iv">
              Architektur & Sicherheit
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-lg mx-auto">
              Drei Sicherheitsstufen — je nach Anforderung und Organisationstyp.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-foreground/15 mb-12"
          >
            {securityTiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex-1 px-8 py-4 text-center"
                  data-testid={`iv-security-card-${idx}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3" data-testid={`text-iv-security-title-${idx}`}>
                    {tier.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{tier.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto space-y-3"
          >
            {trustStatements.map((statement, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex items-center gap-3" data-testid={`iv-trust-${idx}`}>
                <Check className="w-5 h-5 text-[#ff6a00] shrink-0" />
                <p className="text-sm text-foreground/60">{statement}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="ihk" className="py-8 lg:py-10 relative" data-testid="section-ihk-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-ihk-title-iv">
              KIO für Wirtschaftsvertretungen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto leading-relaxed" data-testid="text-ihk-desc-iv">
              Industrie- und Handelskammern tragen einen gesetzlichen Auftrag und arbeiten unter hohen Anforderungen an Transparenz, Dokumentation und Governance. KIO unterstützt diese Anforderungen durch eine auditierbare Architektur.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-foreground/15 mb-10"
          >
            {[
              { title: "Nachvollziehbarkeit", desc: "Jede Empfehlung und Analyse ist dokumentiert und jederzeit reproduzierbar." },
              { title: "Audit-Logging", desc: "Optional aktivierbares Audit-Log für alle Zugriffe und Verarbeitungsschritte." },
              { title: "Public-Sector-Architektur", desc: "Infrastruktur, die den Anforderungen öffentlich-rechtlicher Organisationen entspricht — inklusive EU-Hosting und Datensouveränität." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex-1 px-8 py-4 text-center"
                data-testid={`iv-ihk-feature-${idx}`}
              >
                <Check className="w-5 h-5 text-[#ff6a00] mx-auto mb-3" />
                <p className="font-bold text-foreground mb-1">{item.title}</p>
                <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <Button
              onClick={handleContact}
              className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
              data-testid="button-ihk-contact-iv"
            >
              Gespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-einfuehrung-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-einfuehrung-title-iv">
              Einführung & Projektumfang
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto" data-testid="text-einfuehrung-desc-iv">
              KIO wird als Organisationslösung eingeführt — strukturiert und begleitet.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-foreground/15"
          >
            {[
              { icon: UsersRound, title: "20 – 120 Nutzer", desc: "Typischer Projektumfang für die professionelle Interessenvertretung." },
              { icon: Layers, title: "Fachbereich oder Organisation", desc: "Einführung gezielt in einzelnen Fachbereichen oder organisationsweit." },
              { icon: GraduationCap, title: "Strukturiertes Onboarding", desc: "Begleitete Einführungsphase mit Schulung und Wissensaufbau." },
            ].map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex-1 px-8 py-4 text-center"
                  data-testid={`iv-fact-card-${idx}`}
                >
                  <div className="w-14 h-14 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{fact.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{fact.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-integrations-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-integrations-title-iv">
              Integrationen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-md mx-auto" data-testid="text-integrations-desc-iv">
              KIO verbindet sich mit Ihren bestehenden Arbeitsumgebungen.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4 flex items-center gap-2" data-testid="text-doc-label-iv">
              <FolderOpen className="w-4 h-4" /> Dokumente & Dateisysteme
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "SharePoint", icon: <FolderOpen className="w-6 h-6" /> },
                { name: "OneDrive", icon: <HardDrive className="w-6 h-6" /> },
                { name: "Filesystem", icon: <Database className="w-6 h-6" /> },
                { name: "Outlook", icon: <Mail className="w-6 h-6" /> },
              ].map((logo, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card rounded-md p-5 flex flex-col items-center justify-center gap-2 text-center min-h-[90px]"
                  data-testid={`doc-logo-iv-${idx}`}
                >
                  <div className="text-foreground/50">{logo.icon}</div>
                  <span className="text-[10px] font-semibold text-foreground/35 tracking-wide uppercase">{logo.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4 flex items-center gap-2" data-testid="text-external-label-iv">
              <Globe className="w-4 h-4" /> Externe Datenquellen
            </motion.p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "North Data", icon: <span className="text-[14px] font-bold tracking-tight">North Data</span> },
                { name: "Dun & Bradstreet", icon: <span className="text-[13px] font-bold tracking-tight">D&B</span> },
                { name: "Statista", icon: <span className="text-[14px] font-bold tracking-tight">Statista</span> },
                { name: "DIP", icon: <span className="text-[15px] font-bold tracking-tight">DIP</span> },
                { name: "Lobbyregister", icon: <span className="text-[13px] font-bold tracking-tight">Lobbyregister</span> },
              ].map((logo, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="glass-card rounded-md p-5 flex flex-col items-center justify-center gap-2 text-center min-h-[90px]"
                  data-testid={`external-logo-iv-${idx}`}
                >
                  <div className="text-foreground/50">{logo.icon}</div>
                  <span className="text-[10px] font-semibold text-foreground/35 tracking-wide uppercase">{logo.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 lg:py-10 relative" data-testid="section-preismodell-iv">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-preismodell-title-iv">
              Preismodell
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 mb-8 max-w-xl mx-auto leading-relaxed" data-testid="text-preismodell-desc-iv">
              KIO wird als Organisationslösung bereitgestellt. Das Modell richtet sich nach Nutzerzahl, Sicherheitsstufe und Integrationsanforderungen. Gerne erstellen wir ein individuelles Angebot.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-preismodell-contact-iv"
              >
                Gespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-14 relative" data-testid="section-cta-iv">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-cta-title-iv">
              Fundierte Positionen entstehen
              <br />
              <span className="text-foreground/40">durch strukturiertes Wissen.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-10">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-cta-contact-iv"
              >
                Architekturgespräch vereinbaren <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
