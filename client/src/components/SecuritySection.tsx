import { motion } from "framer-motion";
import {
  Shield,
  Globe,
  Lock,
  Database,
  FileCheck,
  KeyRound,
  BrainCircuit,
  Server,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations, type Lang } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const tiles = [
  {
    icon: Shield,
    titleDe: "GDPR by Design",
    titleEn: "GDPR by Design",
    descDe: "Datenschutz ist integraler Bestandteil der Architektur – nicht nachträglich ergänzt.",
    descEn: "Privacy is an integral part of the architecture – not bolted on after the fact.",
  },
  {
    icon: Globe,
    titleDe: "EU Hosted",
    titleEn: "EU Hosted",
    descDe: "Ausschließlich in europäischen Rechenzentren betrieben – keine Drittstaaten-Transfers.",
    descEn: "Operated exclusively in European data centers – no third-country transfers.",
  },
  {
    icon: Lock,
    titleDe: "End-to-End Encryption",
    titleEn: "End-to-End Encryption",
    descDe: "Verschlüsselung in Transit und at Rest nach modernsten Standards (TLS 1.3 / AES-256).",
    descEn: "Encryption in transit and at rest using latest standards (TLS 1.3 / AES-256).",
  },
  {
    icon: KeyRound,
    titleDe: "Access Control",
    titleEn: "Access Control",
    descDe: "Granulare Rollen- und Rechteverwaltung für vollständige Zugriffskontrolle.",
    descEn: "Granular role and permission management for complete access control.",
  },
  {
    icon: Database,
    titleDe: "Data Isolation",
    titleEn: "Data Isolation",
    descDe: "Mandantenfähige Architektur mit klarer logischer oder physischer Trennung.",
    descEn: "Multi-tenant architecture with clear logical or physical separation.",
  },
  {
    icon: FileCheck,
    titleDe: "Audit & Compliance",
    titleEn: "Audit & Compliance",
    descDe: "Vollständige Audit-Trails, Logging und exportierbare Compliance-Reports.",
    descEn: "Complete audit trails, logging, and exportable compliance reports.",
  },
  {
    icon: BrainCircuit,
    titleDe: "AI Governance",
    titleEn: "AI Governance",
    descDe: "Kein Training mit Kundendaten. Validierungs- und Kontrollmechanismen gegen Halluzinationen.",
    descEn: "No training on customer data. Validation and control mechanisms against hallucinations.",
  },
  {
    icon: Server,
    titleDe: "Sovereign Infrastructure",
    titleEn: "Sovereign Infrastructure",
    descDe: "Option auf dedizierte oder isolierte Infrastruktur für regulierte Branchen.",
    descEn: "Option for dedicated or isolated infrastructure for regulated industries.",
  },
];

interface SecuritySectionProps {
  lang: Lang;
  onContact: () => void;
}

export function SecuritySection({ lang, onContact }: SecuritySectionProps) {
  const de = lang === "de";
  const t = translations[lang].sovereignty;

  return (
    <section className="py-8 lg:py-10 relative" data-testid="section-security">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full" />
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight whitespace-pre-line"
            data-testid="text-security-title"
          >
            {t.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-foreground/60 max-w-3xl leading-relaxed" data-testid="text-security-desc">
            {t.desc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {tiles.map((tile, idx) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-border bg-background p-6 cursor-default"
                data-testid={`card-security-${idx}`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#ff6a00]/70" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5" data-testid={`text-security-title-${idx}`}>
                  {de ? tile.titleDe : tile.titleEn}
                </h3>
                <p className="text-xs text-foreground/50 leading-relaxed" data-testid={`text-security-desc-${idx}`}>
                  {de ? tile.descDe : tile.descEn}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <p className="text-sm text-foreground/50 mb-5" data-testid="text-security-cta-desc">
            {de
              ? "Bereit für regulierte Branchen, Mittelstand und Institutionen."
              : "Ready for regulated industries, mid-market and institutions."}
          </p>
          <Button
            onClick={onContact}
            className="bg-[#ff6a00] border-[#ff6a00] text-white font-semibold rounded-xl hover:bg-[#e55e00]"
            data-testid="button-security-whitepaper"
          >
            {de ? "Security Whitepaper anfordern" : "Request Security Whitepaper"} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
