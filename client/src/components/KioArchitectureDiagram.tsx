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
  ShieldCheck,
  Server,
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
  { icon: Database, label: "ERP / CRM", color: "#003366" },
  { icon: FileText, label: "SharePoint / Docs", color: "#003366" },
  { icon: Mail, label: "Outlook / Teams", color: "#003366" },
  { icon: Users, label: "HR / Personio", color: "#003366" },
  { icon: Briefcase, label: "Positionspapiere", color: "#003366" },
];

const externalSources = [
  { icon: Globe2, label: "DIP / Lobbyregister", color: "#ff6a00" },
  { icon: TrendingUp, label: "North Data / D&B", color: "#ff6a00" },
  { icon: BarChart3, label: "Statista", color: "#ff6a00" },
  { icon: Landmark, label: "Regulatorik / Policy", color: "#ff6a00" },
  { icon: Building2, label: "Markt & Wettbewerb", color: "#ff6a00" },
];

const kioModules = [
  "Marketing", "Sales", "Service", "HR",
  "Finance", "ESG", "Operations", "Executive",
];

interface Props {
  lang: Lang;
}

function FlowLine({ direction, index, total, color }: { direction: "left" | "right"; index: number; total: number; color: string }) {
  const yPct = ((index + 0.5) / total) * 100;
  const delay = index * 0.3;

  return (
    <g>
      <line
        x1={direction === "left" ? "0%" : "100%"}
        y1={`${yPct}%`}
        x2={direction === "left" ? "100%" : "0%"}
        y2={`${yPct}%`}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 4"
      />
      <circle r="3" fill={color} opacity="0.6">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          path={direction === "left"
            ? `M 0,${yPct * 0.6} L 60,${yPct * 0.6}`
            : `M 60,${yPct * 0.6} L 0,${yPct * 0.6}`
          }
        />
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" begin={`${delay}s`} />
      </circle>
    </g>
  );
}

export function KioArchitectureDiagram({ lang }: Props) {
  const t = {
    de: {
      eyebrow: "Plattformarchitektur",
      title: "Ein Ökosystem. Alle Daten. Volle Kontrolle.",
      desc: "KIO verbindet interne Systeme und externe Quellen zu einer souveränen, auditierbaren KI-Infrastruktur.",
      internal: "Interne Daten",
      external: "Externe Daten",
      securityBadge: "Enterprise-Grade Security",
      securityItems: ["DSGVO-konform", "Mandantenfähig", "EU-Hosting", "Audit-Trail"],
    },
    en: {
      eyebrow: "Platform Architecture",
      title: "One Ecosystem. All Data. Full Control.",
      desc: "KIO connects internal systems and external sources into a sovereign, auditable AI infrastructure.",
      internal: "Internal Data",
      external: "External Data",
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
        >
          <motion.div variants={fadeUp} className="relative rounded-2xl border border-border bg-gradient-to-b from-background to-[#fafbfc] p-6 sm:p-10 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #003366 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }} />

            <div className="relative z-10">
              <div className="hidden lg:block">
                <div className="grid grid-cols-[1fr_60px_auto_60px_1fr] items-center gap-0">
                  <div className="space-y-2.5" data-testid="arch-internal">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#003366]/50 mb-3 text-center">
                      {t.internal}
                    </p>
                    {internalSources.map((src, i) => {
                      const Icon = src.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 justify-end bg-white rounded-lg px-3 py-2.5 border border-[#003366]/8 shadow-sm hover:border-[#003366]/20 hover:shadow transition-all group"
                          data-testid={`arch-internal-${i}`}
                        >
                          <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                            {src.label}
                          </span>
                          <div className="w-7 h-7 rounded-md bg-[#003366]/6 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-[#003366]/50 group-hover:text-[#003366] transition-colors" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative h-full min-h-[280px]">
                    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
                      {internalSources.map((_, i) => (
                        <FlowLine key={i} direction="left" index={i} total={internalSources.length} color="#003366" />
                      ))}
                    </svg>
                  </div>

                  <div className="relative" data-testid="arch-core">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[#003366]/5 via-transparent to-[#ff6a00]/5 blur-md" />

                    <div className="relative">
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#003366] via-[#ff6a00]/40 to-[#003366] opacity-60" />
                      <div className="relative bg-gradient-to-br from-[#05284F] via-[#0a3a6b] to-[#05284F] rounded-xl p-7 min-w-[200px]">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6a00] to-[#ff8533] flex items-center justify-center shadow-lg shadow-[#ff6a00]/20 mb-2">
                            <Bot className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-lg font-bold text-white tracking-tight">KIO</p>
                          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40">Multi-Agent System</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1">
                          {kioModules.map((mod, i) => (
                            <div
                              key={i}
                              className="text-[8px] font-semibold text-white/50 bg-white/[0.06] border border-white/[0.06] rounded px-2 py-1 text-center tracking-wide hover:bg-white/[0.12] hover:text-white/70 transition-colors"
                              data-testid={`arch-module-${i}`}
                            >
                              {mod}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-[#ff6a00]/60" />
                          <span className="text-[8px] font-semibold text-white/30 tracking-wider uppercase">Sovereign AI</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-full min-h-[280px]">
                    <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
                      {externalSources.map((_, i) => (
                        <FlowLine key={i} direction="right" index={i} total={externalSources.length} color="#ff6a00" />
                      ))}
                    </svg>
                  </div>

                  <div className="space-y-2.5" data-testid="arch-external">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff6a00]/50 mb-3 text-center">
                      {t.external}
                    </p>
                    {externalSources.map((src, i) => {
                      const Icon = src.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5 border border-[#ff6a00]/8 shadow-sm hover:border-[#ff6a00]/20 hover:shadow transition-all group"
                          data-testid={`arch-external-${i}`}
                        >
                          <div className="w-7 h-7 rounded-md bg-[#ff6a00]/6 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-[#ff6a00]/40 group-hover:text-[#ff6a00] transition-colors" />
                          </div>
                          <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                            {src.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:hidden space-y-6">
                <div className="space-y-2" data-testid="arch-internal-mobile">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#003366]/50 mb-2">
                    {t.internal}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {internalSources.map((src, i) => {
                      const Icon = src.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[#003366]/8 shadow-sm">
                          <div className="w-6 h-6 rounded bg-[#003366]/6 flex items-center justify-center shrink-0">
                            <Icon className="w-3 h-3 text-[#003366]/50" />
                          </div>
                          <span className="text-[11px] font-medium text-foreground/60">{src.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-6 bg-gradient-to-b from-[#003366]/20 to-[#003366]/5" />
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#003366" opacity="0.15" /></svg>
                  </div>
                </div>

                <div className="flex justify-center" data-testid="arch-core-mobile">
                  <div className="relative w-full max-w-[240px]">
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#003366] via-[#ff6a00]/40 to-[#003366] opacity-60" />
                    <div className="relative bg-gradient-to-br from-[#05284F] via-[#0a3a6b] to-[#05284F] rounded-xl p-6">
                      <div className="flex flex-col items-center mb-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff6a00] to-[#ff8533] flex items-center justify-center shadow-lg shadow-[#ff6a00]/20 mb-2">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-lg font-bold text-white">KIO</p>
                        <p className="text-[8px] font-semibold tracking-[0.2em] uppercase text-white/40">Multi-Agent System</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {kioModules.map((mod, i) => (
                          <div key={i} className="text-[8px] font-semibold text-white/50 bg-white/[0.06] border border-white/[0.06] rounded px-2 py-1 text-center">{mod}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#ff6a00" opacity="0.15" /></svg>
                    <div className="w-px h-6 bg-gradient-to-b from-[#ff6a00]/5 to-[#ff6a00]/20" />
                  </div>
                </div>

                <div className="space-y-2" data-testid="arch-external-mobile">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff6a00]/50 mb-2">
                    {t.external}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {externalSources.map((src, i) => {
                      const Icon = src.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[#ff6a00]/8 shadow-sm">
                          <div className="w-6 h-6 rounded bg-[#ff6a00]/6 flex items-center justify-center shrink-0">
                            <Icon className="w-3 h-3 text-[#ff6a00]/40" />
                          </div>
                          <span className="text-[11px] font-medium text-foreground/60">{src.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
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
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
