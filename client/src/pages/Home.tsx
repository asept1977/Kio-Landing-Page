import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowRight,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import heroNetworkImg from "@/assets/images/hero-network.png";
import targetPublicAffairsImg from "@/assets/images/target-public-affairs.png";
import targetAssociationsImg from "@/assets/images/target-associations.png";
import targetIndustryImg from "@/assets/images/target-industry.png";
import sovereigntyIconsImg from "@assets/image14.png";
import architectureImg from "@assets/image17.png";
import kioScreenshotImg from "@assets/image13.png";

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
      image: targetPublicAffairsImg,
      title: t.targets.card1Title,
      desc: t.targets.card1Desc,
      link: undefined as string | undefined,
    },
    {
      image: targetAssociationsImg,
      title: t.targets.card2Title,
      desc: t.targets.card2Desc,
      link: "/verbaende",
    },
    {
      image: targetIndustryImg,
      title: t.targets.card3Title,
      desc: t.targets.card3Desc,
      link: undefined as string | undefined,
    },
  ];

  const architectureLayers = [
    { label: t.architecture.layer1, sub: "", color: "border-black/[0.08] bg-black/[0.03]", textColor: "text-foreground/80" },
    { label: t.architecture.layer2, sub: "", color: "border-[#ff6a00]/30 bg-[#ff6a00]/10", textColor: "text-[#ff6a00]" },
    { label: t.architecture.layer3, sub: t.architecture.layer3Items, color: "border-[#003366]/20 bg-[#003366]/10", textColor: "text-[#003366]" },
    { label: t.architecture.layer4, sub: t.architecture.layer4Items, color: "border-black/[0.06] bg-black/[0.03]", textColor: "text-foreground/70" },
    { label: t.architecture.layer5, sub: "", color: "border-[#ff6a00]/20 bg-[#ff6a00]/5", textColor: "text-[#ff6a00]/80" },
    { label: t.architecture.layer6, sub: t.architecture.layer6Items, color: "border-[#003366]/30 bg-[#003366]/10", textColor: "text-[#003366]" },
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] font-semibold text-xs tracking-widest mb-8 border border-[#ff6a00]/20" data-testid="text-hero-badge">
                  {t.hero.badge}
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.05]" data-testid="text-hero-title">
                <span className="text-[#ff6a00]">{t.hero.title1Word1} </span>
                <span className="text-[#003366]">{t.hero.title2Word2}</span>
                <br />
                <span className="text-foreground">{t.hero.title2}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl leading-relaxed" data-testid="text-hero-subtitle">
                {t.hero.subtitle}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <img
                src={heroNetworkImg}
                alt="KIO Knowledge Network"
                className="w-full rounded-md opacity-90"
                data-testid="img-hero-network"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/40 rounded-md" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
          </motion.div>
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
                <div className="w-full h-40 rounded-md mb-6 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                  <img src={card.image} alt={card.title} className="w-full h-full object-contain p-4" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="glass-card rounded-md p-6 overflow-hidden">
                <img
                  src={architectureImg}
                  alt="KIO Enterprise Architecture"
                  className="w-full rounded-md"
                  data-testid="img-architecture"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT SCREENSHOT ===== */}
      <section className="py-24 lg:py-32 relative" data-testid="section-product">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-product-title">
              {lang === 'de' ? 'KIO in Aktion' : 'KIO in Action'}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-xl mx-auto" data-testid="text-product-desc">
              {lang === 'de' ? 'Enterprise-Wissen, zugänglich über natürliche Sprache. Direkt in Microsoft Teams.' : 'Enterprise knowledge, accessible through natural language. Directly in Microsoft Teams.'}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-md p-3 sm:p-4 overflow-hidden">
              <img
                src={kioScreenshotImg}
                alt="KIO Enterprise AI Assistant"
                className="w-full rounded-md"
                data-testid="img-product-screenshot"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ff6a00]/10 rounded-full blur-[60px]" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#003366]/10 rounded-full blur-[60px]" />
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
              <div className="glass-card rounded-md p-8 relative overflow-hidden">
                <img
                  src={sovereigntyIconsImg}
                  alt="DSGVO, Datenschutz, Datensicherheit"
                  className="w-full rounded-md"
                  data-testid="img-sovereignty-icons"
                />
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
