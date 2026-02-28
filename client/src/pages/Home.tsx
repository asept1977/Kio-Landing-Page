import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { RoiCalculator } from "@/components/RoiCalculator";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Landmark,
  Users,
  Factory,
  ArrowRight,
  Shield,
  Lock,
  Globe2,
  Database,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>('de');
  const [, navigate] = useLocation();

  const t = translations[lang];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const targetCards = [
    {
      icon: <Landmark className="w-6 h-6" />,
      title: t.targets.card1Title,
      desc: t.targets.card1Desc,
      accent: "bg-[#05284F]/[0.06] text-[#05284F]/70",
      link: "/interessenvertretung",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.targets.card2Title,
      desc: t.targets.card2Desc,
      accent: "bg-[#05284F]/[0.06] text-[#05284F]/70",
      link: "/verbaende",
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: t.targets.card3Title,
      desc: t.targets.card3Desc,
      accent: "bg-[#05284F]/[0.06] text-[#05284F]/70",
      link: "/industrie",
    },
  ];


  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e] selection:bg-[#ff6a00]/10">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-36 pb-28 lg:pt-52 lg:pb-40 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-[#fafbfc]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2e5ea] to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#f0f1f3] text-[#5a6072] font-medium text-xs tracking-widest uppercase border border-[#e2e5ea]" data-testid="text-hero-badge">
                  Enterprise KI-Ökosystem
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-3 leading-[1.05] text-[#0d1b2a]" data-testid="text-hero-title">
                  KIO
                </h1>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <span className="text-sm md:text-base font-semibold tracking-wide text-[#3a7bd5]">Knowledge</span>
                  <span className="w-1 h-1 rounded-full bg-[#ccd0d8]" />
                  <span className="text-sm md:text-base font-semibold tracking-wide text-[#e06b20]">Intelligence</span>
                  <span className="w-1 h-1 rounded-full bg-[#ccd0d8]" />
                  <span className="text-sm md:text-base font-semibold tracking-wide text-[#5a6072]">Orchestrated</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center mt-8 mb-10">
                <p className="text-base md:text-lg font-medium text-[#3a3f4b] leading-relaxed" data-testid="text-hero-definition">
                  {lang === "de"
                    ? "KIO verbindet internes und externes Wissen mit Systemen und Aufgaben, damit Entscheidungen schneller und sicherer getroffen werden."
                    : "KIO connects internal and external knowledge with systems and tasks so decisions are made faster and with greater confidence."}
                </p>
                <p className="text-sm text-[#8a90a0] mt-3" data-testid="text-hero-definition-sub">
                  {lang === "de"
                    ? "KIO wirkt im Hintergrund – damit Mitarbeitende im Alltag weniger suchen und mehr entscheiden."
                    : "KIO works in the background – so employees spend less time searching and more time deciding."}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#0d1b2a] hover:bg-[#1a2d42] text-white font-medium px-6"
                  data-testid="button-explore"
                >
                  {t.hero.cta1} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-[#d0d4dc] text-[#3a3f4b] hover:bg-[#f5f6f8] font-medium px-6"
                  data-testid="button-strategy"
                >
                  {t.hero.cta2}
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-14">
                <ChevronDown className="w-5 h-5 text-[#c0c4cc] mx-auto animate-bounce" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-20 lg:py-28 relative bg-white" data-testid="section-solutions">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-3" data-testid="text-solutions-title">
              {t.targets.sectionTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-[#6b7185] max-w-lg mx-auto" data-testid="text-solutions-desc">
              {t.targets.sectionDesc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {targetCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="rounded-lg border border-[#e8eaef] bg-[#fafbfc] p-7 transition-all duration-300 hover:border-[#ccd0d8] hover:bg-[#f5f6f8] group flex flex-col cursor-pointer"
                data-testid={`card-target-${idx}`}
                onClick={() => card.link && navigate(card.link)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.accent} flex items-center justify-center shrink-0`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0d1b2a] leading-snug" data-testid={`text-target-title-${idx}`}>{card.title}</h3>
                </div>
                <p className="text-[#6b7185] leading-relaxed text-sm mb-5 flex-1" data-testid={`text-target-desc-${idx}`}>
                  {card.desc}
                </p>
                <span className="text-[#e06b20] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto" data-testid={`link-learn-more-${idx}`}>
                  {t.targets.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <RoiCalculator lang={lang} />

      <section id="sovereignty" className="py-20 lg:py-28 relative border-t border-[#eceef2]" data-testid="section-sovereignty">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="w-10 h-[3px] bg-[#e06b20] mb-7 rounded-full" />
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-5 leading-tight" data-testid="text-sovereignty-title">
                {t.sovereignty.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-[#6b7185] mb-8 leading-relaxed" data-testid="text-sovereignty-desc">
                {t.sovereignty.desc}
              </motion.p>

              <motion.ul variants={stagger} className="space-y-3.5">
                {t.sovereignty.points.map((point, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-[#3a3f4b]" data-testid={`text-sovereignty-point-${i}`}>
                    <div className="w-5 h-5 rounded-full bg-[#e06b20]/10 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e06b20]" />
                    </div>
                    <span className="text-sm font-medium">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-lg border border-[#e8eaef] bg-[#fafbfc] p-8 relative overflow-hidden">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { icon: <Shield className="w-7 h-7" />, label: "GDPR" },
                    { icon: <Globe2 className="w-7 h-7" />, label: "EU Hosted" },
                    { icon: <Lock className="w-7 h-7" />, label: "Access Control" },
                    { icon: <Database className="w-7 h-7" />, label: "Data Isolation" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2.5 py-5 rounded-lg bg-white border border-[#eceef2]" data-testid={`sovereignty-icon-${i}`}>
                      <div className="text-[#8a90a0]">{item.icon}</div>
                      <span className="text-[11px] font-semibold text-[#8a90a0] tracking-widest uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 lg:py-28 relative border-t border-[#eceef2] bg-[#fafbfc]" data-testid="section-contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-4 leading-tight" data-testid="text-cta-title">
              {t.cta.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-[#6b7185] max-w-lg mx-auto" data-testid="text-cta-desc">
              {t.cta.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto rounded-lg border border-[#e8eaef] bg-white p-8 sm:p-10"
          >
            <ContactForm lang={lang} />
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
