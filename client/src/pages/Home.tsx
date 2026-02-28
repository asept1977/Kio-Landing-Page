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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const targetEntries = [
    {
      icon: <Landmark className="w-5 h-5" />,
      title: t.targets.card1Title,
      desc: t.targets.card1Desc,
      link: "/interessenvertretung",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t.targets.card2Title,
      desc: t.targets.card2Desc,
      link: "/verbaende",
    },
    {
      icon: <Factory className="w-5 h-5" />,
      title: t.targets.card3Title,
      desc: t.targets.card3Desc,
      link: "/industrie",
    },
  ];


  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} />

      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#001a33] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,0,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] font-semibold text-xs tracking-widest mb-8 border border-[#ff6a00]/30 uppercase" data-testid="text-hero-badge">
                  Secure Enterprise KI-Ökosystem
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="inline-block text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2 leading-[1.05] text-white" data-testid="text-hero-title">
                  KIO<sup className="text-lg md:text-xl lg:text-2xl align-super ml-1 font-semibold opacity-60">™</sup>
                </h1>
                <span className="inline-flex items-center gap-3 py-1.5 px-5 rounded-full bg-white/10 font-semibold text-xs md:text-sm tracking-widest border border-white/20 mt-4 backdrop-blur-sm" data-testid="text-hero-subheadline">
                  <span className="text-[#5b9bd5]">Knowledge</span>
                  <span className="text-[#ff6a00]">Intelligence</span>
                  <span className="text-white/70">Orchestrated</span>
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center mb-12 mt-6 md:mt-8">
                <p className="text-base md:text-lg font-bold text-white/90 leading-relaxed" data-testid="text-hero-definition">
                  {lang === "de"
                    ? "KIO verbindet internes und externes Wissen mit Systemen und Aufgaben, damit Entscheidungen schneller und sicherer getroffen werden."
                    : "KIO connects internal and external knowledge with systems and tasks so decisions are made faster and with greater confidence."}
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                  data-testid="button-explore"
                >
                  {t.hero.cta1} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm"
                  data-testid="button-strategy"
                >
                  {t.hero.cta2}
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-16">
                <ChevronDown className="w-5 h-5 text-white/30 mx-auto animate-bounce" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-12 lg:py-16 relative" data-testid="section-solutions">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-solutions-title">
              {t.targets.sectionTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-xl mx-auto" data-testid="text-solutions-desc">
              {t.targets.sectionDesc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-foreground/15"
          >
            {targetEntries.map((entry, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="group cursor-pointer flex-1 px-8 py-6 flex flex-col items-center text-center"
                data-testid={`card-target-${idx}`}
                onClick={() => navigate(entry.link)}
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center mb-4 group-hover:bg-[#ff6a00]/15 transition-colors">
                  <div className="text-[#ff6a00]/60 group-hover:text-[#ff6a00] transition-colors">
                    {entry.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2 leading-snug group-hover:text-[#ff6a00] transition-colors" data-testid={`text-target-title-${idx}`}>
                  {entry.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed mb-4 flex-1" data-testid={`text-target-desc-${idx}`}>
                  {entry.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#ff6a00] text-sm font-semibold group-hover:gap-2.5 transition-all" data-testid={`link-learn-more-${idx}`}>
                  {t.targets.cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <RoiCalculator lang={lang} />

      <section id="sovereignty" className="py-12 lg:py-16 relative" data-testid="section-sovereignty">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="text-sovereignty-title">
              {t.sovereignty.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed" data-testid="text-sovereignty-desc">
              {t.sovereignty.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: <Shield className="w-8 h-8" />, label: "GDPR" },
              { icon: <Globe2 className="w-8 h-8" />, label: "EU Hosted" },
              { icon: <Lock className="w-8 h-8" />, label: "Access Control" },
              { icon: <Database className="w-8 h-8" />, label: "Data Isolation" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-card rounded-lg p-6 flex flex-col items-center gap-3" data-testid={`sovereignty-icon-${i}`}>
                <div className="text-[#ff6a00]/60">{item.icon}</div>
                <span className="text-xs font-bold text-foreground/50 tracking-widest uppercase">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {t.sovereignty.points.map((point, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-foreground/80" data-testid={`text-sovereignty-point-${i}`}>
                <div className="w-5 h-5 rounded-full bg-[#ff6a00]/10 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
                </div>
                <span className="text-sm font-medium">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section id="contact" className="py-12 lg:py-16 relative" data-testid="section-contact">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/[0.03] via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="text-cta-title">
              {t.cta.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-xl mx-auto" data-testid="text-cta-desc">
              {t.cta.desc}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto glass-card rounded-md p-8 sm:p-10"
          >
            <ContactForm lang={lang} />
          </motion.div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
