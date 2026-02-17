import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import updatesData from "@/data/updates.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const categories = ["Alle", "Fähigkeit", "Integration", "Plattform", "Sicherheit"] as const;
type Category = (typeof categories)[number];

const categoryColors: Record<string, string> = {
  "Fähigkeit": "bg-[#ff6a00]/10 text-[#ff6a00] border-[#ff6a00]/20",
  "Integration": "bg-[#5b9bd5]/10 text-[#5b9bd5] border-[#5b9bd5]/20",
  "Plattform": "bg-[#05284F]/10 text-[#05284F] border-[#05284F]/20",
  "Sicherheit": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const sortedUpdates = [...updatesData].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function KioUpdates() {
  const [activeFilter, setActiveFilter] = useState<Category>("Alle");
  const [lang, setLang] = useState<Lang>('de');

  useEffect(() => {
    document.title = "Produktentwicklung — KIO | Enterprise AI Ecosystem";
  }, []);

  const filtered =
    activeFilter === "Alle"
      ? sortedUpdates
      : sortedUpdates.filter((u) => u.category === activeFilter);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-[#ff6a00]/20">
      <Navigation lang={lang} setLang={setLang} forceScrolled />

      <section className="relative pt-36 pb-14 lg:pt-44 lg:pb-16 overflow-hidden" data-testid="section-hero-updates">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/[0.03] via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff6a00]/[0.03] rounded-full blur-[140px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-foreground/40 mb-10" data-testid="breadcrumb-updates">
              <Link href="/"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO</span></Link>
              <span>/</span>
              <Link href="/kio-oekosystem"><span className="cursor-pointer hover:text-foreground/60 transition-colors">KIO Plattform</span></Link>
              <span>/</span>
              <span className="text-[#ff6a00] font-medium">Updates</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1] text-foreground text-center" data-testid="text-hero-title-updates">
              Produktentwicklung transparent gemacht
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/50 max-w-xl leading-relaxed text-center mx-auto" data-testid="text-hero-subtitle-updates">
              KIO wird laufend erweitert und verbessert.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-14 lg:pb-20" data-testid="section-updates-list">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8" data-testid="filter-bar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(cat)}
                className={activeFilter === cat ? "bg-[#ff6a00] border-[#ff6a00] text-white" : ""}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat === "Fähigkeit" ? "Fähigkeiten" : cat === "Integration" ? "Integrationen" : cat}
              </Button>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            key={activeFilter}
            className="space-y-4"
          >
            {filtered.map((update, idx) => (
              <motion.div key={`${update.date}-${idx}`} variants={fadeUp}>
                <Card className="p-6" data-testid={`card-update-${idx}`}>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs text-foreground/40 font-medium" data-testid={`text-date-${idx}`}>
                      {new Date(update.date).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold no-default-hover-elevate no-default-active-elevate ${categoryColors[update.category] || ""}`}
                      data-testid={`badge-category-${idx}`}
                    >
                      {update.category}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2" data-testid={`text-title-${idx}`}>
                    {update.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed" data-testid={`text-desc-${idx}`}>
                    {update.description}
                  </p>
                  {update.modules && update.modules.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap" data-testid={`modules-${idx}`}>
                      <span className="text-[10px] text-foreground/30 font-medium">betrifft Module:</span>
                      {update.modules.map((mod) => (
                        <span key={mod} className="text-[10px] text-foreground/40 font-medium">{mod}</span>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-sm text-foreground/40 py-12" data-testid="text-no-updates">
              Keine Updates in dieser Kategorie.
            </p>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
