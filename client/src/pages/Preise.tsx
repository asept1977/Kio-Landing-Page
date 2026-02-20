import { useState, useMemo, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Users,
  BrainCircuit,
  MessageSquareText,
  FileSearch,
  Database,
  BarChart3,
  Radio,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const KNOWLEDGE_STEPS = [
  { label: "100 MB", bytes: 100_000_000, price: 0 },
  { label: "1 GB", bytes: 1_000_000_000, price: 9 },
  { label: "10 GB", bytes: 10_000_000_000, price: 29 },
  { label: "50 GB", bytes: 50_000_000_000, price: 79 },
  { label: "200 GB", bytes: 200_000_000_000, price: 149 },
  { label: "500 GB", bytes: 500_000_000_000, price: 249 },
  { label: "1 TB", bytes: 1_000_000_000_000, price: 399 },
] as const;

const ADDONS = [
  { id: "company", label: "Unternehmensdaten", desc: "z.\u00A0B. Firmenstrukturen, Handelsregister", price: 19 },
  { id: "market", label: "Markt- & Regulierungsdaten", desc: "Branchenberichte, Gesetzesänderungen", price: 29 },
  { id: "monitoring", label: "Kontinuierliches Monitoring", desc: "Automatische Überwachung relevanter Quellen", price: 39 },
] as const;

const FAQ_ITEMS = [
  {
    q: "Warum startet KIO günstig?",
    a: "Wir glauben an transparente Preise. KIO wächst mit eurem tatsächlichen Bedarf — kein Overhead, keine versteckten Gebühren.",
  },
  {
    q: "Gibt es Abrechnungslimits oder Token-Budgets?",
    a: "Nein. Keine Token-Abrechnung. Kein Request-Limit. Der Preis richtet sich danach, wie KIO eingesetzt wird.",
  },
  {
    q: "Kann ich Add-ons später aktivieren?",
    a: "Ja, jederzeit. Add-ons lassen sich monatlich hinzufügen oder entfernen.",
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

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number | null>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    prevValue.current = value;

    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value]);

  return <>{display.toLocaleString("de-DE")}{suffix}</>;
}

function getKnowledgeDescription(idx: number): string {
  if (idx <= 1) return "einzelne Dokumente";
  if (idx <= 3) return "eine zentrale Wissensbasis";
  return "ein vollständiges Organisationsgedächtnis";
}

export default function Preise() {
  const [lang, setLang] = useState<Lang>("de");
  const [, navigate] = useLocation();

  const [userCount, setUserCount] = useState(10);
  const [workingMode, setWorkingMode] = useState<"daily" | "knowledge">("daily");
  const [knowledgeStep, setKnowledgeStep] = useState(0);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleAddon = (id: string) => {
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const prices = useMemo(() => {
    const userPrice = workingMode === "daily" ? 49 : 119;
    const knowledgePrice = KNOWLEDGE_STEPS[knowledgeStep].price;

    let addonsPerUser = 0;
    ADDONS.forEach((addon) => {
      if (addons[addon.id]) addonsPerUser += addon.price;
    });

    const totalMonthly = userCount * userPrice + knowledgePrice + userCount * addonsPerUser;

    return {
      userPrice,
      knowledgePrice,
      addonsPerUser,
      usersSubtotal: userCount * userPrice,
      addonsSubtotal: userCount * addonsPerUser,
      totalMonthly,
    };
  }, [userCount, workingMode, knowledgeStep, addons]);

  const activeAddonNames = ADDONS.filter((a) => addons[a.id]).map((a) => a.label);

  const summaryText = (() => {
    const parts: string[] = [];
    parts.push(`${userCount} Mitarbeitende nutzen KIO täglich.`);

    if (workingMode === "knowledge") {
      parts.push("KIO analysiert umfangreiche Dokumente und bereitet Ergebnisse auf.");
    } else {
      parts.push("KIO beantwortet Fragen und unterstützt bei täglichen Aufgaben.");
    }

    const knowledgeDesc = getKnowledgeDescription(knowledgeStep);
    parts.push(`KIO kennt ${knowledgeDesc} (${KNOWLEDGE_STEPS[knowledgeStep].label}).`);

    if (activeAddonNames.length > 0) {
      parts.push(`Zusätzlich aktiviert: ${activeAddonNames.join(", ")}.`);
    }

    return parts.join("\n");
  })();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} />

      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden" data-testid="section-hero-preise">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#001a33] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,0,0.08)_0%,_transparent_60%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1] text-white"
              data-testid="text-hero-title-preise"
            >
              Konfigurieren Sie, wie KIO in
              <br />
              <span className="text-white/40">Ihrer Organisation arbeitet</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-hero-subtitle-preise"
            >
              Der Preis richtet sich danach, wie KIO Ihre tägliche Arbeit unterstützt.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section id="configurator" className="py-16 lg:py-24 border-t border-gray-100" data-testid="section-configurator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            <div className="lg:col-span-3 space-y-10">

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl border border-gray-200 p-8"
                data-testid="configurator-step-users"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="text-lg font-bold text-gray-900" data-testid="text-step1-title">Wie viele Personen arbeiten mit KIO?</h3>
                </div>

                <input
                  type="range"
                  min={1}
                  max={500}
                  value={userCount}
                  onChange={(e) => setUserCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#ff6a00] [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff6a00] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#ff6a00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  data-testid="slider-users"
                />
                <p className="mt-4 text-base text-gray-600" data-testid="text-user-display">
                  <span className="text-2xl font-bold text-gray-900">{userCount}</span> {userCount === 1 ? "Mitarbeitende arbeitet" : "Mitarbeitende arbeiten"} mit KIO
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl border border-gray-200 p-8"
                data-testid="configurator-step-mode"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold text-gray-900" data-testid="text-step2-title">Wie intensiv soll KIO arbeiten?</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setWorkingMode("daily")}
                    className={`rounded-xl p-6 text-left transition-all border-2 ${
                      workingMode === "daily"
                        ? "border-[#ff6a00] bg-[#ff6a00]/5 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    data-testid="button-mode-daily"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      workingMode === "daily" ? "bg-[#ff6a00]/10 text-[#ff6a00]" : "bg-gray-100 text-gray-400"
                    }`}>
                      <MessageSquareText className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-gray-900 mb-1">Tägliche Assistenz</p>
                    <p className="text-sm text-gray-500 mb-3">KIO beantwortet Fragen und unterstützt bei täglichen Aufgaben</p>
                    <p className="text-lg font-bold text-gray-900">49 € <span className="text-sm font-normal text-gray-400">/ User</span></p>
                  </button>

                  <button
                    onClick={() => setWorkingMode("knowledge")}
                    className={`rounded-xl p-6 text-left transition-all border-2 ${
                      workingMode === "knowledge"
                        ? "border-[#ff6a00] bg-[#ff6a00]/5 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    data-testid="button-mode-knowledge"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      workingMode === "knowledge" ? "bg-[#ff6a00]/10 text-[#ff6a00]" : "bg-gray-100 text-gray-400"
                    }`}>
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-gray-900 mb-1">Wissensarbeit</p>
                    <p className="text-sm text-gray-500 mb-3">KIO analysiert umfangreiche Dokumente und bereitet Ergebnisse auf</p>
                    <p className="text-lg font-bold text-gray-900">119 € <span className="text-sm font-normal text-gray-400">/ User</span></p>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl border border-gray-200 p-8"
                data-testid="configurator-step-knowledge"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold text-gray-900" data-testid="text-step3-title">Wie viel Unternehmenswissen soll KIO kennen?</h3>
                </div>

                <input
                  type="range"
                  min={0}
                  max={6}
                  step={1}
                  value={knowledgeStep}
                  onChange={(e) => setKnowledgeStep(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#ff6a00] [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff6a00] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#ff6a00] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  data-testid="slider-knowledge"
                />

                <div className="flex justify-between mt-2 text-[11px] text-gray-400 font-medium">
                  {KNOWLEDGE_STEPS.map((step, idx) => (
                    <span
                      key={idx}
                      className={`${knowledgeStep === idx ? "text-[#ff6a00] font-bold" : ""}`}
                    >
                      {step.label}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-base text-gray-600" data-testid="text-knowledge-display">
                    <span className="font-bold text-gray-900">{KNOWLEDGE_STEPS[knowledgeStep].label}</span>
                    {" — "}
                    <span className="text-gray-500">{getKnowledgeDescription(knowledgeStep)}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-900" data-testid="text-knowledge-price">
                    {KNOWLEDGE_STEPS[knowledgeStep].price === 0 ? "inkl." : `+${KNOWLEDGE_STEPS[knowledgeStep].price} €/Monat`}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl border border-gray-200 p-8"
                data-testid="configurator-step-addons"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center text-sm font-bold">4</div>
                  <h3 className="text-lg font-bold text-gray-900" data-testid="text-step4-title">Zusätzliche Wissensquellen</h3>
                </div>

                <div className="space-y-3">
                  {ADDONS.map((addon) => (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-4 rounded-xl p-5 cursor-pointer transition-all border-2 ${
                        addons[addon.id]
                          ? "border-[#ff6a00] bg-[#ff6a00]/5"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      data-testid={`checkbox-addon-${addon.id}`}
                    >
                      <input
                        type="checkbox"
                        checked={!!addons[addon.id]}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#ff6a00] accent-[#ff6a00] cursor-pointer"
                        data-testid={`input-addon-${addon.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-gray-900">{addon.label}</p>
                          <p className="text-sm font-bold text-[#ff6a00] shrink-0">+{addon.price} € / User</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{addon.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm"
                  data-testid="summary-panel"
                >
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Ihre Konfiguration</h3>

                  <div className="text-sm text-gray-600 leading-relaxed space-y-2 mb-8" data-testid="text-summary">
                    {summaryText.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6 mb-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between" data-testid="breakdown-users">
                        <span className="text-gray-500">User ({userCount} × {prices.userPrice} €)</span>
                        <span className="font-bold text-gray-900">{prices.usersSubtotal.toLocaleString("de-DE")} €</span>
                      </div>
                      <div className="flex justify-between" data-testid="breakdown-knowledge">
                        <span className="text-gray-500">Wissen ({KNOWLEDGE_STEPS[knowledgeStep].label})</span>
                        <span className="font-bold text-gray-900">{prices.knowledgePrice.toLocaleString("de-DE")} €</span>
                      </div>
                      {prices.addonsPerUser > 0 && (
                        <div className="flex justify-between" data-testid="breakdown-addons">
                          <span className="text-gray-500">Zusatzquellen ({userCount} × {prices.addonsPerUser} €)</span>
                          <span className="font-bold text-gray-900">{prices.addonsSubtotal.toLocaleString("de-DE")} €</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm text-gray-500">Monatlicher Preis</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900" data-testid="text-total-price">
                      <AnimatedNumber value={prices.totalMonthly} /> €
                    </p>
                    <p className="text-xs text-gray-400 mt-1">pro Monat, zzgl. MwSt.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Button
                    onClick={() => navigate("/")}
                    className="w-full bg-[#ff6a00] hover:bg-[#e55f00] text-white font-semibold h-12 text-base"
                    data-testid="button-demo-summary"
                  >
                    Demo buchen <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Unverbindliches 20-Minuten-Gespräch
                  </p>
                </motion.div>

                <div className="rounded-xl bg-gray-50 border border-gray-100 p-5" data-testid="trust-badges">
                  <div className="space-y-2.5 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                      <span>Keine Token-Abrechnung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                      <span>Keine Request-Limits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                      <span>Monatlich kündbar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                      <span>DSGVO-konform, EU-Hosting</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 border-t border-gray-100" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-faq-title">
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
              <motion.div
                key={idx}
                variants={fadeUp}
                className="rounded-xl border border-gray-200 overflow-hidden"
                data-testid={`faq-item-${idx}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                  data-testid={`button-faq-${idx}`}
                >
                  <span className="text-sm font-bold text-gray-900">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed" data-testid={`text-faq-answer-${idx}`}>
                      {item.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-10 border-t border-gray-100" data-testid="section-note">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            Keine Token-Abrechnung. Keine Request-Limits. Der Preis richtet sich danach, wie KIO eingesetzt wird.
          </p>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
