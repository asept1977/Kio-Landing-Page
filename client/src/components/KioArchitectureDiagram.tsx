import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import architectureImg from "@assets/kio-architecture-infographic.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

interface Props {
  lang: Lang;
}

export function KioArchitectureDiagram({ lang }: Props) {
  const t = {
    de: {
      eyebrow: "Plattformarchitektur",
      title: "Ein Ökosystem. Alle Daten. Volle Kontrolle.",
      desc: "KIO verbindet interne Systeme und externe Quellen zu einer souveränen, auditierbaren KI-Infrastruktur.",
      securityBadge: "Enterprise-Grade Security",
      securityItems: ["DSGVO-konform", "Mandantenfähig", "EU-Hosting", "Audit-Trail"],
    },
    en: {
      eyebrow: "Platform Architecture",
      title: "One Ecosystem. All Data. Full Control.",
      desc: "KIO connects internal systems and external sources into a sovereign, auditable AI infrastructure.",
      securityBadge: "Enterprise-Grade Security",
      securityItems: ["GDPR Compliant", "Multi-Tenant", "EU Hosted", "Audit Trail"],
    },
  }[lang];

  return (
    <section className="py-20 lg:py-28 relative border-t border-border" data-testid="section-architecture">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/60 mb-3">
            {t.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-arch-title">
            {t.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-foreground/50 max-w-xl mx-auto" data-testid="text-arch-desc">
            {t.desc}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-lg"
        >
          <img
            src={architectureImg}
            alt={lang === "de" ? "KIO Plattformarchitektur — Interne und externe Datenquellen verbunden durch KIO" : "KIO Platform Architecture — Internal and external data sources connected through KIO"}
            className="w-full h-auto block"
            data-testid="img-architecture"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-6"
        >
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#003366]/40" />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-foreground/35">{t.securityBadge}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex flex-wrap items-center justify-center gap-3">
              {t.securityItems.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-foreground/40 font-medium" data-testid={`arch-security-${i}`}>
                  <span className="w-1 h-1 rounded-full bg-[#ff6a00]/40" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
