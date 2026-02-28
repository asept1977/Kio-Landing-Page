import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KioArchitectureDiagram } from "@/components/KioArchitectureDiagram";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { useLocation } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Plattformarchitektur() {
  const [lang, setLang] = useState<Lang>("de");
  const [, navigate] = useLocation();

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const t = {
    de: {
      breadcrumb: "Startseite",
      title: "Plattformarchitektur",
      subtitle: "Ein Ökosystem. Alle Daten. Volle Kontrolle.",
      desc: "KIO verbindet internes Organisationswissen mit externen Datenquellen — in einer souveränen, auditierbaren KI-Infrastruktur mit höchsten Sicherheitsstandards.",
      ctaContact: "Architekturgespräch vereinbaren",
      ctaBack: "Zurück zur Startseite",
    },
    en: {
      breadcrumb: "Home",
      title: "Platform Architecture",
      subtitle: "One Ecosystem. All Data. Full Control.",
      desc: "KIO connects internal organizational knowledge with external data sources — in a sovereign, auditable AI infrastructure with the highest security standards.",
      ctaContact: "Schedule Architecture Briefing",
      ctaBack: "Back to Home",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-background">
      <Navigation lang={lang} onLangChange={setLang} forceScrolled />

      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden" data-testid="section-hero-arch">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366] via-[#05284F] to-[#030f1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs text-white/40 mb-8 font-medium tracking-wide">
              <button onClick={() => navigate("/")} className="hover:text-white/70 transition-colors" data-testid="link-breadcrumb-home">
                {t.breadcrumb}
              </button>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">{t.title}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white" data-testid="text-hero-title-arch">
              {t.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl font-semibold text-white/80 mb-4" data-testid="text-hero-subtitle-arch">
              {t.subtitle}
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/50 mb-10 max-w-3xl leading-relaxed" data-testid="text-hero-desc-arch">
              {t.desc}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleContact}
                className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                data-testid="button-hero-contact-arch"
              >
                {t.ctaContact} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm"
                data-testid="button-hero-back-arch"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> {t.ctaBack}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <KioArchitectureDiagram lang={lang} />

      <Footer lang={lang} />
    </div>
  );
}
