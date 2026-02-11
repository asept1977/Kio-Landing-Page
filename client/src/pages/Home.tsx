import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Landmark,
  Users,
  Factory,
  ArrowRight,
  ArrowDown,
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
  const [lang, setLang] = useState<Lang>('en');
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

  const targetCards = [
    {
      icon: <Landmark className="w-7 h-7" />,
      title: t.targets.card1Title,
      desc: t.targets.card1Desc,
      iconBg: "bg-[#ff6a00]/10 text-[#ff6a00]",
      link: undefined as string | undefined,
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: t.targets.card2Title,
      desc: t.targets.card2Desc,
      iconBg: "bg-[#003366]/10 text-blue-600",
      link: "/verbaende",
    },
    {
      icon: <Factory className="w-7 h-7" />,
      title: t.targets.card3Title,
      desc: t.targets.card3Desc,
      iconBg: "bg-black/[0.03] text-foreground/80",
      link: undefined as string | undefined,
    },
  ];

  const architectureLayers = [
    { label: t.architecture.layer1, sub: "", color: "border-black/[0.08] bg-black/[0.03]", textColor: "text-foreground/80" },
    { label: t.architecture.layer2, sub: "", color: "border-[#ff6a00]/30 bg-[#ff6a00]/10", textColor: "text-[#ff6a00]" },
    { label: t.architecture.layer3, sub: t.architecture.layer3Items, color: "border-blue-500/20 bg-blue-500/10", textColor: "text-blue-600" },
    { label: t.architecture.layer4, sub: t.architecture.layer4Items, color: "border-black/[0.06] bg-black/[0.03]", textColor: "text-foreground/70" },
    { label: t.architecture.layer5, sub: "", color: "border-[#ff6a00]/20 bg-[#ff6a00]/5", textColor: "text-[#ff6a00]/80" },
    { label: t.architecture.layer6, sub: t.architecture.layer6Items, color: "border-[#003366]/30 bg-[#003366]/10", textColor: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden animated-gradient" data-testid="section-hero">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '48px 48px' }}
        />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#ff6a00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#003366]/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-semibold text-xs tracking-widest mb-8 border border-[#ff6a00]/20" data-testid="text-hero-badge">
                  {t.hero.badge}
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.05]" data-testid="text-hero-title">
                <span className="text-foreground">{t.hero.title1}</span>
                <br />
                <span className="text-gradient">{t.hero.title2}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
                {t.hero.subtitle}
              </motion.p>

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
                  className="border-black/[0.08] text-foreground/70"
                  data-testid="button-strategy"
                >
                  {t.hero.cta2}
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-16">
                <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TARGET GROUPS ===== */}
      <section id="solutions" className="py-24 lg:py-32 relative" data-testid="section-solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {targetCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`glass-card glass-card-hover rounded-md p-8 transition-all duration-500 group ${card.link ? "cursor-pointer" : "cursor-default"}`}
                data-testid={`card-target-${idx}`}
                onClick={() => card.link && navigate(card.link)}
              >
                <div className={`w-14 h-14 rounded-md ${card.iconBg} flex items-center justify-center mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`text-target-title-${idx}`}>{card.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm mb-6" data-testid={`text-target-desc-${idx}`}>
                  {card.desc}
                </p>
                <span className="text-[#ff6a00] text-sm font-semibold flex items-center gap-2 transition-all" data-testid={`link-learn-more-${idx}`}>
                  {t.targets.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <section id="architecture" className="py-24 lg:py-32 relative border-y border-black/[0.06]" data-testid="section-architecture">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-architecture-title">
              {t.architecture.sectionTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-xl mx-auto" data-testid="text-architecture-desc">
              {t.architecture.sectionDesc}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col items-center gap-0"
          >
            {architectureLayers.map((layer, idx) => (
              <motion.div key={idx} variants={fadeUp} className="w-full flex flex-col items-center">
                <div className={`w-full max-w-lg border ${layer.color} rounded-md p-5 text-center`} data-testid={`arch-layer-${idx}`}>
                  <div className={`font-bold text-sm tracking-wide ${layer.textColor}`}>
                    {layer.label}
                  </div>
                  {layer.sub && (
                    <div className="text-xs text-foreground/40 mt-1.5 tracking-wide">{layer.sub}</div>
                  )}
                </div>
                {idx < architectureLayers.length - 1 && (
                  <div className="py-2">
                    <ArrowDown className="w-4 h-4 text-foreground/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SOVEREIGNTY ===== */}
      <section id="sovereignty" className="py-24 lg:py-32 relative" data-testid="section-sovereignty">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full" />
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="text-sovereignty-title">
                {t.sovereignty.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-foreground/60 mb-10 leading-relaxed" data-testid="text-sovereignty-desc">
                {t.sovereignty.desc}
              </motion.p>

              <motion.ul variants={stagger} className="space-y-4">
                {t.sovereignty.points.map((point, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-4 text-foreground/80" data-testid={`text-sovereignty-point-${i}`}>
                    <div className="w-6 h-6 rounded-full bg-[#ff6a00]/10 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#ff6a00]" />
                    </div>
                    <span className="text-sm font-medium">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card rounded-md p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/10 via-transparent to-[#ff6a00]/5" />
                <div className="relative z-10 grid grid-cols-2 gap-6">
                  {[
                    { icon: <Shield className="w-8 h-8" />, label: "GDPR" },
                    { icon: <Globe2 className="w-8 h-8" />, label: "EU Hosted" },
                    { icon: <Lock className="w-8 h-8" />, label: "Access Control" },
                    { icon: <Database className="w-8 h-8" />, label: "Data Isolation" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 py-6" data-testid={`sovereignty-icon-${i}`}>
                      <div className="text-[#ff6a00]/60">{item.icon}</div>
                      <span className="text-xs font-bold text-foreground/50 tracking-widest uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA + FORM ===== */}
      <section id="contact" className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-contact">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/3 via-transparent to-transparent" />
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
