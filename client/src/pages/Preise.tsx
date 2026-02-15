import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Users,
  Layers,
  Puzzle,
  Check,
  Plus,
  Minus,
  ChevronDown,
  Copy,
  Shield,
  ArrowRight,
  Database,
  Link2,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const ACTIVITY_LEVELS = [
  { label: "Antworten", surcharge: 0 },
  { label: "Vorbereiten", surcharge: 40 },
  { label: "Erledigen", surcharge: 90 },
  { label: "Überwachen", surcharge: 160 },
] as const;

const KNOWLEDGE_LEVELS = [
  { label: "Nur aktuelle Dokumente", cost: 0 },
  { label: "Team-Wissen", cost: 190 },
  { label: "Unternehmenswissen", cost: 490 },
  { label: "Organisationsgedächtnis", cost: 990 },
  { label: "Vollarchiv", cost: -1 },
] as const;

const EXTERNAL_ADDONS = [
  { id: "northdata", label: "North Data", price: 39 },
  { id: "dip", label: "DIP Bundestag", price: 35 },
  { id: "lobby", label: "Lobbyregister", price: 30 },
  { id: "statista", label: "Statista", price: 49 },
] as const;

const CONNECTOR_CATEGORIES = [
  { category: "HR", items: "Personio, Clockodo", price: 20 },
  { category: "ERP", items: "SAP, ProAlpha", price: 40 },
  { category: "CRM", items: "HubSpot, Salesforce", price: 40 },
  { category: "Wiki/Work", items: "Jira, Confluence", price: 20 },
] as const;

const FAQ_ITEMS = [
  {
    q: "Warum startet KIO günstig?",
    a: "Wir glauben an transparente Preise. KIO wächst mit eurem tatsächlichen Bedarf — kein Overhead, keine versteckten Gebühren.",
  },
  {
    q: "Speichert KIO alle E-Mails?",
    a: "Nein. KIO verarbeitet nur die Daten, die ihr freigebt. Jede Datenquelle wird explizit aktiviert.",
  },
  {
    q: "Kann ich Add-ons später aktivieren?",
    a: "Ja, jederzeit. Add-ons lassen sich monatlich hinzufügen oder entfernen.",
  },
  {
    q: "Wie funktioniert Wissenskapazität?",
    a: "Die Wissenskapazität bestimmt, wie viele Dokumente und Quellen KIO gleichzeitig verstehen und verknüpfen kann.",
  },
  {
    q: "Gibt es Enterprise / Sovereign Optionen?",
    a: "Ja. Für Organisationen mit besonderen Anforderungen bieten wir dedizierte Instanzen mit EU-Hosting und individueller Konfiguration.",
  },
  {
    q: "Welche Vertragslaufzeiten gibt es?",
    a: "KIO ist monatlich kündbar. Für Enterprise-Setups bieten wir Jahresverträge mit Vorteilskonditionen.",
  },
];

export default function Preise() {
  const [lang, setLang] = useState<Lang>("de");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [userCount, setUserCount] = useState(10);
  const [activityLevel, setActivityLevel] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState(0);

  const [externalAddons, setExternalAddons] = useState<Record<string, boolean>>({});
  const [connectorAddons, setConnectorAddons] = useState<Record<string, boolean>>({});

  const [addonTab, setAddonTab] = useState<"external" | "connectors">("external");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isEnterprise = knowledgeLevel === 4;

  const prices = useMemo(() => {
    const basePricePerUser = 29;
    const activitySurcharge = ACTIVITY_LEVELS[activityLevel].surcharge;
    const knowledgeCost = isEnterprise ? 0 : KNOWLEDGE_LEVELS[knowledgeLevel].cost;

    let externalTotal = 0;
    EXTERNAL_ADDONS.forEach((addon) => {
      if (externalAddons[addon.id]) {
        externalTotal += addon.price;
      }
    });

    let connectorTotal = 0;
    CONNECTOR_CATEGORIES.forEach((cat) => {
      if (connectorAddons[cat.category]) {
        connectorTotal += cat.price;
      }
    });

    const addonsPerUser = externalTotal + connectorTotal;
    const perUserTotal = basePricePerUser + activitySurcharge + addonsPerUser;
    const totalMonthly = perUserTotal * userCount + knowledgeCost;

    return {
      basePricePerUser,
      activitySurcharge,
      knowledgeCost,
      addonsPerUser,
      perUserTotal,
      totalMonthly,
    };
  }, [userCount, activityLevel, knowledgeLevel, externalAddons, connectorAddons, isEnterprise]);

  const handleCopySummary = async () => {
    const activity = ACTIVITY_LEVELS[activityLevel];
    const knowledge = KNOWLEDGE_LEVELS[knowledgeLevel];
    const activeExternals = EXTERNAL_ADDONS.filter((a) => externalAddons[a.id]);
    const activeConnectors = CONNECTOR_CATEGORIES.filter((c) => connectorAddons[c.category]);

    let summary = `KIO Setup-Zusammenfassung\n`;
    summary += `========================\n\n`;
    summary += `User: ${userCount}\n`;
    summary += `Aktivitätslevel: ${activity.label} (+${activity.surcharge} €/User)\n`;
    summary += `Wissenskapazität: ${knowledge.label}${isEnterprise ? " (Enterprise)" : ` (+${knowledge.cost} €/Monat)`}\n\n`;

    if (activeExternals.length > 0) {
      summary += `Externe Wissensquellen:\n`;
      activeExternals.forEach((a) => {
        summary += `  - ${a.label}: +${a.price} €/User\n`;
      });
      summary += `\n`;
    }

    if (activeConnectors.length > 0) {
      summary += `Interne Systeme:\n`;
      activeConnectors.forEach((c) => {
        summary += `  - ${c.category} (${c.items}): ab +${c.price} €/User\n`;
      });
      summary += `\n`;
    }

    summary += `---\n`;
    summary += `Basispreis: ${prices.basePricePerUser} €/User\n`;
    summary += `Aktivitätszuschlag: +${prices.activitySurcharge} €/User\n`;
    summary += `Add-ons: +${prices.addonsPerUser} €/User\n`;
    summary += `Wissenskapazität: ${isEnterprise ? "Enterprise (individuell)" : `+${prices.knowledgeCost} €/Monat`}\n`;
    summary += `\n`;
    summary += isEnterprise
      ? `Gesamtpreis: Individuelles Enterprise-Angebot\n`
      : `Gesamtpreis: ${prices.totalMonthly.toLocaleString("de-DE")} € / Monat\n`;

    try {
      await navigator.clipboard.writeText(summary);
      toast({ title: "Zusammenfassung kopiert", description: "Die Konfiguration wurde in die Zwischenablage kopiert." });
    } catch {
      toast({ title: "Fehler", description: "Konnte nicht kopiert werden.", variant: "destructive" });
    }
  };

  const toggleExternal = (id: string) => {
    setExternalAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleConnector = (category: string) => {
    setConnectorAddons((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} />

      {/* ===== 1) HERO ===== */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden" data-testid="section-hero-preise">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#001a33] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,0,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-white"
              data-testid="text-hero-title-preise"
            >
              Preise, die mit deinem
              <br />
              <span className="text-white/40">Nutzen wachsen</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-hero-subtitle-preise"
            >
              Starte klein — erweitere KIO um Wissen, Datenquellen und Automatisierung, sobald es sich lohnt.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => document.getElementById("cta-footer")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-demo-hero-preise"
              >
                Demo buchen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" })}
                className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm"
                data-testid="button-configure-hero-preise"
              >
                Angebot konfigurieren
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-10 text-xs text-white/30 tracking-widest uppercase font-bold"
              data-testid="text-trust-line"
            >
              DSGVO-konform • Enterprise Security • EU/Sovereign Optionen
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== 2) PRICING LOGIC ===== */}
      <section className="py-24 lg:py-32 relative border-t border-border" data-testid="section-pricing-logic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
              data-testid="text-pricing-logic-title"
            >
              So setzt sich der Preis zusammen
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Users className="w-7 h-7" />,
                title: "User",
                desc: "Wie viele Menschen mit KIO arbeiten",
                bullets: ["Flexible Skalierung", "Monatlich anpassbar"],
              },
              {
                icon: <Layers className="w-7 h-7" />,
                title: "Wissen",
                desc: "Wie viel KIO über dein Unternehmen versteht",
                bullets: ["Von Dokumenten bis Vollarchiv", "Wächst mit eurer Organisation"],
              },
              {
                icon: <Puzzle className="w-7 h-7" />,
                title: "Intelligence Add-ons",
                desc: "Welche externen Quellen KIO zusätzlich nutzt",
                bullets: ["Nur zahlen, was ihr braucht", "Jederzeit aktivierbar"],
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="glass-card glass-card-hover rounded-md p-8"
                data-testid={`card-pricing-logic-${idx}`}
              >
                <div className="w-14 h-14 rounded-md bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`text-pricing-logic-title-${idx}`}>
                  {card.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-4">{card.desc}</p>
                <ul className="space-y-2">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/50">
                      <Check className="w-4 h-4 text-[#ff6a00]/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 3) ENTRY PRICE ===== */}
      <section className="py-24 lg:py-32 relative border-t border-border" data-testid="section-entry-price">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-entry-price-title">
              Einstieg
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card rounded-md p-10 text-center max-w-xl mx-auto"
            data-testid="card-entry-price"
          >
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff6a00] mb-4">KIO Access</p>
            <p className="text-4xl md:text-5xl font-bold text-foreground mb-2" data-testid="text-entry-price-value">
              ab 29 €
            </p>
            <p className="text-sm text-foreground/50 mb-8">/ User / Monat</p>
            <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
              {["Q&A über interne Dokumente", "M365/Files optional", "Sichere Arbeitsoberfläche"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                  <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <p className="text-xs text-foreground/40">Erweiterungen jederzeit aktivierbar.</p>
          </motion.div>
        </div>
      </section>

      {/* ===== 4) CONFIGURATOR ===== */}
      <section id="configurator" className="py-24 lg:py-32 relative border-t border-border" data-testid="section-configurator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-configurator-title">
              Konfiguriere dein Setup
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {/* User Count */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-md p-8"
                data-testid="configurator-users"
              >
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase mb-4 block">
                  Anzahl User
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setUserCount((c) => Math.max(1, c - 1))}
                    data-testid="button-user-minus"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-3xl font-bold text-foreground min-w-[4rem] text-center" data-testid="text-user-count">
                    {userCount}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setUserCount((c) => c + 1)}
                    data-testid="button-user-plus"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Activity Level */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-md p-8"
                data-testid="configurator-activity"
              >
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase mb-4 block">
                  Aktivitätslevel
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ACTIVITY_LEVELS.map((level, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivityLevel(idx)}
                      className={`rounded-md px-4 py-3 text-sm font-bold transition-all ${
                        activityLevel === idx
                          ? "bg-[#ff6a00]/10 border border-[#ff6a00]/40 text-[#ff6a00]"
                          : "bg-card border border-border text-foreground/60"
                      }`}
                      data-testid={`button-activity-${idx}`}
                    >
                      {level.label}
                      <span className="block text-xs font-normal mt-1 opacity-60">
                        {level.surcharge === 0 ? "inkl." : `+${level.surcharge} €`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Knowledge Level */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-md p-8"
                data-testid="configurator-knowledge"
              >
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase mb-4 block">
                  Wissenskapazität
                </label>
                <div className="space-y-3">
                  {KNOWLEDGE_LEVELS.map((level, idx) => (
                    <button
                      key={idx}
                      onClick={() => setKnowledgeLevel(idx)}
                      className={`w-full rounded-md px-5 py-3 text-left text-sm font-bold transition-all flex items-center justify-between gap-4 ${
                        knowledgeLevel === idx
                          ? "bg-[#ff6a00]/10 border border-[#ff6a00]/40 text-[#ff6a00]"
                          : "bg-card border border-border text-foreground/60"
                      }`}
                      data-testid={`button-knowledge-${idx}`}
                    >
                      <span>{level.label}</span>
                      <span className="text-xs font-normal opacity-60">
                        {level.cost === -1 ? "Enterprise" : level.cost === 0 ? "inkl." : `+${level.cost} €/Monat`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5) ADD-ONS ===== */}
      <section className="py-24 lg:py-32 relative border-t border-border" data-testid="section-addons">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-addons-title">
              Intelligence Add-ons
            </motion.h2>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setAddonTab("external")}
              className={`rounded-md px-5 py-2.5 text-sm font-bold transition-all ${
                addonTab === "external"
                  ? "bg-[#ff6a00]/10 border border-[#ff6a00]/40 text-[#ff6a00]"
                  : "bg-card border border-border text-foreground/60"
              }`}
              data-testid="tab-external"
            >
              <Database className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              Externe Wissensquellen
            </button>
            <button
              onClick={() => setAddonTab("connectors")}
              className={`rounded-md px-5 py-2.5 text-sm font-bold transition-all ${
                addonTab === "connectors"
                  ? "bg-[#ff6a00]/10 border border-[#ff6a00]/40 text-[#ff6a00]"
                  : "bg-card border border-border text-foreground/60"
              }`}
              data-testid="tab-connectors"
            >
              <Link2 className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              Interne Systeme (Connectoren)
            </button>
          </div>

          {addonTab === "external" && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {EXTERNAL_ADDONS.map((addon) => (
                <motion.button
                  key={addon.id}
                  variants={fadeUp}
                  onClick={() => toggleExternal(addon.id)}
                  className={`glass-card rounded-md p-6 text-left transition-all flex items-center justify-between gap-4 ${
                    externalAddons[addon.id] ? "border-[#ff6a00]/40 bg-[#ff6a00]/5" : ""
                  }`}
                  data-testid={`toggle-addon-${addon.id}`}
                >
                  <div>
                    <p className="font-bold text-foreground text-sm">{addon.label}</p>
                    <p className="text-xs text-foreground/40 mt-1">+{addon.price} €/User/Monat</p>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-all flex items-center ${
                      externalAddons[addon.id] ? "bg-[#ff6a00] justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white mx-1" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {addonTab === "connectors" && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {CONNECTOR_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.category}
                  variants={fadeUp}
                  onClick={() => toggleConnector(cat.category)}
                  className={`glass-card rounded-md p-6 text-left transition-all flex items-center justify-between gap-4 ${
                    connectorAddons[cat.category] ? "border-[#ff6a00]/40 bg-[#ff6a00]/5" : ""
                  }`}
                  data-testid={`toggle-connector-${cat.category}`}
                >
                  <div>
                    <p className="font-bold text-foreground text-sm">{cat.category}</p>
                    <p className="text-xs text-foreground/40 mt-1">{cat.items}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">ab +{cat.price} €/User</p>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-all flex items-center ${
                      connectorAddons[cat.category] ? "bg-[#ff6a00] justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white mx-1" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== 6) FAQ ===== */}
      <section className="py-24 lg:py-32 relative border-t border-border" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-faq-title">
              Häufige Fragen
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-3"
          >
            {FAQ_ITEMS.map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="glass-card rounded-md overflow-visible" data-testid={`faq-item-${idx}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  data-testid={`button-faq-${idx}`}
                >
                  <span className="text-sm font-bold text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-foreground/40 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-foreground/60 leading-relaxed" data-testid={`text-faq-answer-${idx}`}>
                      {item.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 7) CTA FOOTER ===== */}
      <section id="cta-footer" className="py-32 lg:py-44 relative border-t border-border" data-testid="section-cta-footer">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.015] via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
              data-testid="text-cta-footer-title"
            >
              Lass uns dein Setup
              <br />
              <span className="text-foreground/40">in 20 Minuten konfigurieren.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button
                onClick={() => navigate("/")}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-demo-cta"
              >
                Demo buchen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-border text-foreground/80 bg-card backdrop-blur-sm"
                data-testid="button-kontakt-cta"
              >
                Kontakt
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />

      {/* Fixed Price Bar - Bottom full width, single line */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        data-testid="configurator-price-box"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap min-w-0">
            <span className="text-xs text-foreground/50 hidden sm:inline">{prices.perUserTotal} € / User</span>
            <span className="text-xs text-foreground/50 hidden sm:inline">{userCount} User</span>
            <span className="text-xs text-foreground/50 sm:hidden">{prices.perUserTotal} € &times; {userCount}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {isEnterprise ? (
              <span className="text-lg sm:text-xl font-bold text-[#ff6a00]" data-testid="text-total-price">Enterprise</span>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-[#ff6a00]" data-testid="text-total-price">
                {prices.totalMonthly.toLocaleString("de-DE")} €<span className="text-xs font-normal text-foreground/40 ml-1">/ Monat</span>
              </span>
            )}
            <Button
              onClick={handleCopySummary}
              variant="outline"
              size="sm"
              className="border-border text-foreground/80"
              data-testid="button-copy-summary"
            >
              <Copy className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Kopieren</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
