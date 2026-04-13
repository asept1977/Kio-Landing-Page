import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/lib/i18n";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Wrench,
  Shield,
  Handshake,
  Star,
  CheckCircle2,
  Users,
  BarChart3,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const partnerTiers = [
  {
    stufe: "Referral",
    year1: "20 %",
    recurring: "0 %",
    fokus: "Empfehlung & Lead-Übergabe",
    leistung: "Aktive Kundenbeziehung, Lead-Qualifikation",
    fit: "Berater, Anwälte, Netzwerkpartner",
  },
  {
    stufe: "Sales",
    year1: "25 %",
    recurring: "7,5 %",
    fokus: "Vertrieb & Erstimplementierung",
    leistung: "Eigenständiger Vertrieb, Onboarding-Begleitung",
    fit: "IT-Systemhäuser, Unternehmensberatungen",
    highlighted: true,
  },
  {
    stufe: "Strategic",
    year1: "30 %",
    recurring: "12 %",
    fokus: "Strategische Integration & Ausbau",
    leistung: "Vollständige Betreuung, eigene KIO-Praxis",
    fit: "Große Beratungshäuser, spezialisierte IT-Partner",
  },
];

const serviceModell = [
  {
    icon: Star,
    title: "Einführung",
    desc: "Strukturiertes Onboarding, Kickoff-Workshop, Wissensarchitektur & erstes Assistenten-Setup. Typisch 3–6 Wochen.",
  },
  {
    icon: Wrench,
    title: "Integration",
    desc: "Anbindung interner Systeme (SharePoint, Outlook, ERP/CRM), Zugriffskontrollen & Governance-Framework.",
  },
  {
    icon: TrendingUp,
    title: "Optimierung",
    desc: "Analyse der Nutzungsqualität, Prompt-Engineering, Erweiterung der Wissensbasen & Nutzer-Enablement.",
  },
  {
    icon: BarChart3,
    title: "Weiterentwicklung",
    desc: "Neue Module, zusätzliche Nutzergruppen, Reporting & strategische Roadmap-Beratung.",
  },
];

const grundsaetze = [
  {
    icon: Shield,
    title: "Transparente Vergütung",
    desc: "Klare Provisionsstruktur ohne versteckte Klauseln. Auszahlung innerhalb von 30 Tagen nach Rechnungsstellung.",
  },
  {
    icon: CheckCircle2,
    title: "Deal Registration",
    desc: "Ihr Lead gehört Ihnen. Registrierte Deals sind 12 Monate geschützt — auch wenn der Kunde direkt auf AI-Xperience zugeht.",
  },
  {
    icon: Handshake,
    title: "Serviceorientierung",
    desc: "AI-Xperience unterstützt Sie mit Präsentationsmaterialien, technischen Workshops und Presales-Begleitung.",
  },
  {
    icon: Users,
    title: "Partnerschaft",
    desc: "Quartalsweise Reviews, frühzeitiger Zugang zu neuen Features und direkter Kontakt zur Produktleitung.",
  },
];

const faqs = [
  {
    q: "Wie lange dauert die Aufnahme ins Partnerprogramm?",
    a: "Nach Unterzeichnung des Partnervertrags erfolgt das Onboarding innerhalb von 5 Werktagen. Sie erhalten Zugang zu Materialien, Demo-Umgebung und Ihrem festen Ansprechpartner.",
  },
  {
    q: "Kann ich als Referral-Partner später zur Sales-Stufe wechseln?",
    a: "Ja — die Partnerstufen sind nicht starr. Bei nachgewiesenem Vertriebserfolg und absolviertem Produkttraining erfolgt der Stufenaufstieg auf Antrag.",
  },
  {
    q: "Wie wird die Recurring-Provision berechnet?",
    a: "Die Recurring-Provision gilt auf die jährliche Lizenzsumme des betreuten Kunden und wird pro Quartal abgerechnet, solange das Vertragsverhältnis besteht.",
  },
];

export default function Partnerprogramm() {
  const [lang, setLang] = useState<Lang>("de");
  const [, navigate] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#05284F] relative overflow-hidden" data-testid="section-hero-partner">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#05284F] to-[#001a33]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6a00]/5 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#ff6a00]/10 border border-[#ff6a00]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-[#ff6a00] text-sm font-semibold">Partnerprogramm</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white" data-testid="text-hero-title-partner">
              KIO Partnerprogramm
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl leading-relaxed">
              Aufbau eines skalierbaren AI-Geschäfts für Systemhäuser und Beratungen — mit klaren Konditionen, geschützten Deals und echtem Servicegeschäft.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-partner-cta"
              >
                Partner werden <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("verguetung")?.scrollIntoView({ behavior: "smooth" })}
                className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                data-testid="button-partner-verguetung"
              >
                Vergütung ansehen
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Überblick */}
      <section className="py-16" data-testid="section-ueberblick-partner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Was das Programm bietet
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto">
              Drei strategische Vorteile, die Ihr AI-Dienstleistungsgeschäft strukturieren.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: "Wiederkehrende Umsätze", desc: "Recurring-Provisionen auf laufende Lizenzen schaffen planbare Einnahmen — unabhängig vom Erstprojekt." },
              { icon: Wrench, title: "Servicegeschäft", desc: "Einführung, Integration und Optimierung sind eigenständige Leistungsfelder mit attraktiven Margen." },
              { icon: Shield, title: "Klare Governance", desc: "Deal Registration, transparente Provisionsabrechnungen und definierte Eskalationswege." },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="rounded-xl border border-border bg-background p-6 flex flex-col" data-testid={`card-ueberblick-${idx}`}>
                  <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#ff6a00]/70" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Partnerstufen Tabelle */}
      <section id="verguetung" className="py-16 bg-slate-50/50" data-testid="section-partnerstufen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partnerstufen & Vergütung
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto">
              Drei Stufen mit klaren Anforderungen und steigenden Provisionen.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            {/* Desktop Tabelle */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm" data-testid="table-partnerstufen">
                <thead>
                  <tr className="bg-[#05284F] text-white">
                    <th className="text-left px-5 py-4 font-semibold">Partnerstufe</th>
                    <th className="text-left px-5 py-4 font-semibold">Year 1 Provision</th>
                    <th className="text-left px-5 py-4 font-semibold">Recurring</th>
                    <th className="text-left px-5 py-4 font-semibold">Fokus</th>
                    <th className="text-left px-5 py-4 font-semibold">Leistungsprofil</th>
                    <th className="text-left px-5 py-4 font-semibold">Typischer Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerTiers.map((tier, idx) => (
                    <tr key={idx} className={`border-t border-border ${tier.highlighted ? "bg-[#ff6a00]/4" : "bg-background"}`}>
                      <td className="px-5 py-4 font-bold text-foreground">
                        {tier.stufe}
                        {tier.highlighted && <span className="ml-2 text-[10px] bg-[#ff6a00] text-white px-1.5 py-0.5 rounded-full font-semibold">Empfohlen</span>}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#ff6a00]">{tier.year1}</td>
                      <td className="px-5 py-4 text-foreground/70">{tier.recurring}</td>
                      <td className="px-5 py-4 text-foreground/70">{tier.fokus}</td>
                      <td className="px-5 py-4 text-foreground/70">{tier.leistung}</td>
                      <td className="px-5 py-4 text-foreground/70">{tier.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {partnerTiers.map((tier, idx) => (
                <div key={idx} className={`rounded-xl border p-5 ${tier.highlighted ? "border-[#ff6a00]/30 bg-[#ff6a00]/4" : "border-border bg-background"}`} data-testid={`card-tier-mobile-${idx}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-bold text-foreground text-base">{tier.stufe}</h3>
                    {tier.highlighted && <span className="text-[10px] bg-[#ff6a00] text-white px-1.5 py-0.5 rounded-full font-semibold">Empfohlen</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-foreground/40 text-xs block mb-0.5">Year 1</span><span className="font-semibold text-[#ff6a00]">{tier.year1}</span></div>
                    <div><span className="text-foreground/40 text-xs block mb-0.5">Recurring</span><span className="text-foreground/70">{tier.recurring}</span></div>
                    <div className="col-span-2"><span className="text-foreground/40 text-xs block mb-0.5">Fokus</span><span className="text-foreground/70">{tier.fokus}</span></div>
                    <div className="col-span-2"><span className="text-foreground/40 text-xs block mb-0.5">Typischer Fit</span><span className="text-foreground/70">{tier.fit}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leistungsmodell */}
      <section className="py-16" data-testid="section-leistungsmodell">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Leistungsmodell
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto">
              Vier Phasen strukturieren das Servicegeschäft — von der Einführung bis zur kontinuierlichen Weiterentwicklung.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceModell.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="rounded-xl border border-border bg-background p-6 flex gap-4" data-testid={`card-service-${idx}`}>
                  <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#ff6a00]/70" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Wirtschaftlichkeitsbeispiel */}
      <section className="py-16 bg-slate-50/50" data-testid="section-wirtschaftlichkeit">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Wirtschaftlichkeitsbeispiel
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto">
              Exemplarische Kalkulation für einen Kunden mit 70 Nutzern (Sales-Partner-Stufe).
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            {/* Desktop */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-border" data-testid="table-wirtschaftlichkeit">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#05284F] text-white">
                    <th className="text-left px-5 py-4 font-semibold">Parameter</th>
                    <th className="text-left px-5 py-4 font-semibold">Wert</th>
                    <th className="text-left px-5 py-4 font-semibold">Anmerkung</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Nutzeranzahl", wert: "70 User", note: "Mittelständisches Unternehmen" },
                    { param: "Lizenzpreis", wert: "69 € / User / Monat", note: "Standardlizenz" },
                    { param: "Jahresumsatz", wert: "57.960 €", note: "70 × 69 € × 12" },
                    { param: "Provision Jahr 1", wert: "17.388 €", note: "30 % (Strategic) bzw. 25 % (Sales)" },
                    { param: "Recurring p.a.", wert: "6.955 €", note: "12 % (Strategic) bzw. 7,5 % (Sales)" },
                    { param: "Setup-Leistungen", wert: "20.000 – 50.000 €", note: "Einmalig, abhängig vom Scope" },
                    { param: "Folgejahr Services", wert: "8.000 – 15.000 €", note: "Optimierung, neue Module" },
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-t border-border ${idx % 2 === 0 ? "bg-background" : "bg-slate-50/50"}`}>
                      <td className="px-5 py-3.5 font-semibold text-foreground">{row.param}</td>
                      <td className="px-5 py-3.5 font-semibold text-[#ff6a00]">{row.wert}</td>
                      <td className="px-5 py-3.5 text-foreground/50">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
              {[
                { param: "Nutzeranzahl", wert: "70 User" },
                { param: "Lizenzpreis", wert: "69 € / User / Monat" },
                { param: "Jahresumsatz", wert: "57.960 €" },
                { param: "Provision Jahr 1", wert: "17.388 €" },
                { param: "Recurring p.a.", wert: "6.955 €" },
                { param: "Setup-Leistungen", wert: "20.000 – 50.000 €" },
                { param: "Folgejahr Services", wert: "8.000 – 15.000 €" },
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground/60 font-medium">{row.param}</span>
                  <span className="text-sm font-bold text-[#ff6a00]">{row.wert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programmgrundsätze */}
      <section className="py-16" data-testid="section-grundsaetze">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Programmgrundsätze
            </motion.h2>
            <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto">
              Vier Prinzipien, die die Zusammenarbeit definieren.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {grundsaetze.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="rounded-xl border border-border bg-background p-6 flex gap-4" data-testid={`card-grundsatz-${idx}`}>
                  <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#ff6a00]/70" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50/50" data-testid="section-faq-partner">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Häufige Fragen
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} variants={fadeUp} className="rounded-xl border border-border bg-background overflow-hidden" data-testid={`faq-item-${idx}`}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  data-testid={`button-faq-${idx}`}
                >
                  <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-foreground/40 shrink-0" /> : <ChevronDown className="w-4 h-4 text-foreground/40 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#05284F] relative overflow-hidden" data-testid="section-cta-partner">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#001a33]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6a00]/5 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-5">
              Bereit, Partner zu werden?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10 text-lg leading-relaxed">
              Sprechen Sie mit uns über Ihre Ausgangssituation — wir finden gemeinsam die passende Partnerstufe und nächste Schritte.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-cta-partner-bottom"
              >
                Partner werden <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleContact}
                className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                data-testid="button-cta-kontakt-bottom"
              >
                Erstgespräch vereinbaren
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
