import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, Database, Bot, Wrench, Users, Link2, Brain, Play, Shield, Lock, Server, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import updatesData from "@/data/updates.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const categoryColors: Record<string, string> = {
  "Fähigkeit": "bg-[#ff6a00]/10 text-[#ff6a00] border-[#ff6a00]/20",
  "Integration": "bg-[#5b9bd5]/10 text-[#5b9bd5] border-[#5b9bd5]/20",
  "Plattform": "bg-[#05284F]/10 text-[#05284F] border-[#05284F]/20",
  "Sicherheit": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const latestUpdates = [...updatesData]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function KioOekosystem() {
  const [lang, setLang] = useState<Lang>('de');

  useEffect(() => {
    document.title = "KIO Plattform — KIO | Enterprise AI Ecosystem";
  }, []);

  const howItWorks = [
    {
      icon: <Link2 className="w-7 h-7" />,
      title: "Verbinden",
      desc: "KIO integriert bestehende Systeme statt sie zu ersetzen.",
      color: "bg-[#ff6a00]/10 text-[#ff6a00]",
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Verstehen",
      desc: "Informationen werden strukturiert, zugeordnet und kontextualisiert.",
      color: "bg-[#5b9bd5]/15 text-[#5b9bd5]",
    },
    {
      icon: <Play className="w-7 h-7" />,
      title: "Ausführen",
      desc: "Ergebnisse entstehen direkt im Arbeitskontext — nicht in einem separaten Tool.",
      color: "bg-[#05284F]/10 text-[#05284F]",
    },
  ];

  const architectureCards = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Datenquellen",
      desc: "ERP, CRM, Dateien, E-Mails, politische Quellen",
      color: "text-[#ff6a00]",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Agenten",
      desc: "Spezialisierte Aufgabenlogiken je nach Fachbereich",
      color: "text-[#5b9bd5]",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Werkzeuge",
      desc: "Analysieren, Schreiben, Strukturieren, Überwachen",
      color: "text-[#05284F]",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Assistenten",
      desc: "Direkte Zusammenarbeit im Arbeitsalltag",
      color: "text-emerald-600",
    },
  ];

  const securityPoints = [
    { icon: <Shield className="w-5 h-5" />, text: "Kein Training auf Kundendaten" },
    { icon: <Lock className="w-5 h-5" />, text: "Kontrollierte Datenflüsse" },
    { icon: <Server className="w-5 h-5" />, text: "Europäische Hostingoptionen" },
    { icon: <KeyRound className="w-5 h-5" />, text: "Rollenbasierte Zugriffe" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden" data-testid="section-hero-oekosystem">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-10" data-testid="breadcrumb-oekosystem">
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">KIO Plattform</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-foreground text-center" data-testid="text-hero-title-oekosystem">
              Das Betriebssystem für Organisationswissen
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 max-w-xl leading-relaxed text-center mx-auto" data-testid="text-hero-subtitle-oekosystem">
              KIO verbindet Datenquellen, Dokumente und Kommunikation zu einer arbeitsfähigen Wissensbasis.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 relative" data-testid="section-how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-how-title">
                Wie KIO arbeitet
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {howItWorks.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp}>
                  <Card className="p-6 h-full" data-testid={`card-how-${idx}`}>
                    <div className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 ${item.color}`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="architecture" className="py-14 lg:py-20 relative border-t border-border" data-testid="section-architecture">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" data-testid="text-arch-title">
                Keine einzelne KI — sondern ein koordiniertes System
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureCards.map((card, idx) => (
                <motion.div key={idx} variants={fadeUp}>
                  <Card className="p-6 h-full" data-testid={`card-arch-${idx}`}>
                    <div className={`mb-4 ${card.color}`}>
                      {card.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{card.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 relative border-t border-border" data-testid="section-updates-teaser">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-updates-title">
                KIO wird jede Woche weiterentwickelt
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {latestUpdates.map((update, idx) => (
                <motion.div key={idx} variants={fadeUp}>
                  <Card className="p-6 h-full flex flex-col" data-testid={`card-update-teaser-${idx}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-foreground/40 font-medium">
                        {new Date(update.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </span>
                      <Badge variant="outline" className={`text-[10px] font-semibold no-default-hover-elevate no-default-active-elevate ${categoryColors[update.category] || ""}`}>
                        {update.category}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{update.title}</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed line-clamp-2">{update.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/kio-oekosystem/updates">
                <Button variant="outline" className="font-medium" data-testid="button-all-updates">
                  Alle Updates ansehen <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="security" className="py-14 lg:py-20 relative border-t border-border" data-testid="section-security">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-security-title">
                Für sensible Organisationen gebaut
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityPoints.map((point, idx) => (
                <motion.div key={idx} variants={fadeUp}>
                  <Card className="p-5 flex items-start gap-4" data-testid={`card-security-${idx}`}>
                    <div className="text-[#ff6a00] mt-0.5 shrink-0">{point.icon}</div>
                    <span className="text-sm font-medium text-foreground/70">{point.text}</span>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
