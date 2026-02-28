import { motion } from "framer-motion";
import {
  Database,
  FileText,
  Mail,
  Users,
  BarChart3,
  Globe2,
  Shield,
  Lock,
  Landmark,
  TrendingUp,
  Building2,
  Briefcase,
  Bot,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const internalSources = [
  { icon: Database, label: "ERP / CRM" },
  { icon: FileText, label: "SharePoint / Docs" },
  { icon: Mail, label: "Outlook / Teams" },
  { icon: Users, label: "HR / Personio" },
  { icon: Briefcase, label: "Positionspapiere" },
];

const externalSources = [
  { icon: Globe2, label: "DIP / Lobbyregister" },
  { icon: TrendingUp, label: "North Data / D&B" },
  { icon: BarChart3, label: "Statista" },
  { icon: Landmark, label: "Regulatorik / Policy" },
  { icon: Building2, label: "Markt & Wettbewerb" },
];

const kioModules = [
  "Marketing", "Sales", "Service", "HR",
  "Finance", "ESG", "Operations", "Executive",
];

const securityFeatures = [
  { icon: Shield, label: "DSGVO" },
  { icon: Lock, label: "RBAC" },
  { icon: Database, label: "EU-Hosting" },
];

interface Props {
  lang: Lang;
}

export function KioArchitectureDiagram({ lang }: Props) {
  const t = {
    de: {
      eyebrow: "Plattformarchitektur",
      title: "Ein Ökosystem. Alle Daten. Volle Kontrolle.",
      desc: "KIO verbindet interne Systeme und externe Quellen zu einer souveränen, auditierbaren KI-Infrastruktur.",
      internal: "Interne Daten",
      external: "Externe Daten",
      security: "Enterprise-Grade Security",
      securityDesc: "Alle Datenflüsse verschlüsselt, mandantenfähig und DSGVO-konform — gehostet in der EU.",
    },
    en: {
      eyebrow: "Platform Architecture",
      title: "One Ecosystem. All Data. Full Control.",
      desc: "KIO connects internal systems and external sources into a sovereign, auditable AI infrastructure.",
      internal: "Internal Data",
      external: "External Data",
      security: "Enterprise-Grade Security",
      securityDesc: "All data flows encrypted, multi-tenant capable and GDPR compliant — hosted in the EU.",
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
          className="text-center mb-16"
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
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-center">
            <motion.div variants={fadeUp} className="space-y-3" data-testid="arch-internal">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#003366]/60 mb-4 text-center lg:text-right">
                {t.internal}
              </p>
              {internalSources.map((src, i) => {
                const Icon = src.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 lg:flex-row-reverse glass-card rounded-lg px-4 py-3 group hover:border-[#003366]/20 transition-colors"
                    data-testid={`arch-internal-${i}`}
                  >
                    <div className="w-8 h-8 rounded-md bg-[#003366]/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#003366]/60 group-hover:text-[#003366] transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors flex-1 lg:text-right">
                      {src.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#003366]/20 hidden lg:block" />
                  </div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-center px-4 lg:px-8" data-testid="arch-core">
              <div className="hidden lg:flex flex-col items-center gap-1 mb-3">
                <div className="w-px h-4 bg-gradient-to-b from-transparent to-[#ff6a00]/30" />
              </div>

              <div className="relative w-full max-w-[220px]">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#ff6a00]/10 via-[#003366]/5 to-[#ff6a00]/10 blur-sm" />
                <div className="relative bg-gradient-to-br from-[#05284F] to-[#003366] rounded-xl p-6 text-center border border-[#ff6a00]/20 shadow-lg shadow-[#003366]/10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff6a00] to-[#ff8533] flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-xl font-bold text-white tracking-tight mb-1">KIO</p>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-4">Multi-Agent System</p>

                  <div className="grid grid-cols-2 gap-1.5">
                    {kioModules.map((mod, i) => (
                      <div
                        key={i}
                        className="text-[9px] font-semibold text-white/60 bg-white/8 rounded px-1.5 py-1 tracking-wide"
                        data-testid={`arch-module-${i}`}
                      >
                        {mod}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-center gap-1 mt-3">
                <div className="w-px h-4 bg-gradient-to-b from-[#ff6a00]/30 to-transparent" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3" data-testid="arch-external">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#ff6a00]/50 mb-4 text-center lg:text-left">
                {t.external}
              </p>
              {externalSources.map((src, i) => {
                const Icon = src.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 glass-card rounded-lg px-4 py-3 group hover:border-[#ff6a00]/20 transition-colors"
                    data-testid={`arch-external-${i}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#ff6a00]/20 hidden lg:block" />
                    <div className="w-8 h-8 rounded-md bg-[#ff6a00]/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#ff6a00]/50 group-hover:text-[#ff6a00] transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                      {src.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-10 glass-card rounded-lg p-5 flex flex-col sm:flex-row items-center gap-4 border-[#003366]/10"
            data-testid="arch-security"
          >
            <div className="flex items-center gap-5 shrink-0">
              {securityFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="flex items-center gap-2" data-testid={`arch-security-${i}`}>
                    <Icon className="w-4 h-4 text-[#003366]/50" />
                    <span className="text-xs font-bold text-foreground/40 tracking-wider uppercase">{feat.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <p className="text-xs text-foreground/40 leading-relaxed">
              {t.securityDesc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
