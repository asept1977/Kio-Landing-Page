import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const innerSources = [
  { label: "ERP", angle: 0 },
  { label: "CRM", angle: 60 },
  { label: "SharePoint", angle: 120 },
  { label: "Outlook", angle: 180 },
  { label: "Teams", angle: 240 },
  { label: "HR", angle: 300 },
];

const outerSources = [
  { label: "North Data", angle: 30 },
  { label: "Statista", angle: 102 },
  { label: "DIP", angle: 174 },
  { label: "Lobbyregister", angle: 246 },
  { label: "D&B", angle: 318 },
];

interface Props {
  lang: Lang;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function OrbitDiagram() {
  const cx = 400;
  const cy = 400;
  const innerR = 160;
  const outerR = 290;
  const shieldR = 80;

  return (
    <svg viewBox="0 0 800 800" className="w-full max-w-[600px] mx-auto" data-testid="svg-architecture">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#003366" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#05284F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r="395" fill="url(#bgGlow)" />

      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#ff6a00" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="6 4" />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#5b9bd5" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="6 4" />

      {outerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, outerR, src.angle);
        return (
          <line key={`ol-${i}`} x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke="#ff6a00" strokeWidth="0.5" strokeOpacity="0.08" />
        );
      })}
      {innerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, innerR, src.angle);
        return (
          <line key={`il-${i}`} x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke="#5b9bd5" strokeWidth="0.5" strokeOpacity="0.1" />
        );
      })}

      {outerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, outerR, src.angle);
        const pulsePos1 = polarToXY(cx, cy, outerR * 0.4, src.angle);
        const pulsePos2 = polarToXY(cx, cy, outerR * 0.7, src.angle);
        return (
          <g key={`op-${i}`}>
            <circle r="2" fill="#ff6a00" opacity="0">
              <animate attributeName="cx" values={`${pos.x};${cx}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${pos.y};${cy}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
      {innerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, innerR, src.angle);
        return (
          <g key={`ip-${i}`}>
            <circle r="2" fill="#5b9bd5" opacity="0">
              <animate attributeName="cx" values={`${pos.x};${cx}`} dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${pos.y};${cy}`} dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      <g opacity="0.2">
        <path
          d={`M${cx} ${cy - shieldR} 
              C${cx + shieldR * 0.85} ${cy - shieldR * 0.7} ${cx + shieldR * 0.9} ${cy + shieldR * 0.1} ${cx + shieldR * 0.6} ${cy + shieldR * 0.7}
              L${cx} ${cy + shieldR}
              L${cx - shieldR * 0.6} ${cy + shieldR * 0.7}
              C${cx - shieldR * 0.9} ${cy + shieldR * 0.1} ${cx - shieldR * 0.85} ${cy - shieldR * 0.7} ${cx} ${cy - shieldR} Z`}
          fill="#003366"
          stroke="#5b9bd5"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
      </g>

      <circle cx={cx} cy={cy} r="50" fill="url(#coreGlow)" />
      <circle cx={cx} cy={cy} r="36" fill="#05284F" stroke="#ff6a00" strokeWidth="2" strokeOpacity="0.5" filter="url(#softGlow)" />
      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="18" fontWeight="800" letterSpacing="2">
        KIO
      </text>

      {innerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, innerR, src.angle);
        return (
          <g key={`in-${i}`} data-testid={`arch-inner-${i}`}>
            <circle cx={pos.x} cy={pos.y} r="22" fill="#05284F" stroke="#5b9bd5" strokeWidth="1.5" strokeOpacity="0.4" />
            <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fill="#5b9bd5" fontSize="9" fontWeight="700" letterSpacing="0.5">
              {src.label}
            </text>
          </g>
        );
      })}

      {outerSources.map((src, i) => {
        const pos = polarToXY(cx, cy, outerR, src.angle);
        const labelLen = src.label.length;
        const rw = Math.max(30, labelLen * 4.5 + 12);
        return (
          <g key={`ex-${i}`} data-testid={`arch-outer-${i}`}>
            <rect x={pos.x - rw} y={pos.y - 14} width={rw * 2} height={28} rx="14" fill="#05284F" stroke="#ff6a00" strokeWidth="1.5" strokeOpacity="0.35" />
            <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fill="#ff6a00" fontSize="10" fontWeight="700" letterSpacing="0.3">
              {src.label}
            </text>
          </g>
        );
      })}

      <text x={cx} y={55} textAnchor="middle" fill="#5b9bd5" fontSize="10" fontWeight="700" opacity="0.5" letterSpacing="3">
        ORGANISATIONSWISSEN
      </text>
      <text x={cx} y={35} textAnchor="middle" fill="#ff6a00" fontSize="10" fontWeight="700" opacity="0.4" letterSpacing="3">
        EXTERNE QUELLEN
      </text>
    </svg>
  );
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10"
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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden bg-[#05284F] p-6 sm:p-10 border border-[#5b9bd5]/10"
        >
          <OrbitDiagram />
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
