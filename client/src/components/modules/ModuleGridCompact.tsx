import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Megaphone, Handshake, Headset, Cog, UserCheck,
  Leaf, BarChart3, Truck, Factory, LayoutDashboard,
} from "lucide-react";

type ModuleTier = "core" | "enterprise";

interface ModuleDef {
  slug: string;
  title: string;
  claim: string;
  icon: LucideIcon;
  tier: ModuleTier;
}

const modules: ModuleDef[] = [
  { slug: "marketing", title: "KIO-Marketing", claim: "Marktsignale in Wirkung übersetzen.", icon: Megaphone, tier: "core" },
  { slug: "sales", title: "KIO-Sales", claim: "Jeden Kundentermin datenbasiert führen.", icon: Handshake, tier: "core" },
  { slug: "service", title: "KIO-Service", claim: "Serviceprozesse intelligent steuern.", icon: Headset, tier: "core" },
  { slug: "products", title: "KIO-Products", claim: "Produktwissen strukturiert nutzbar machen.", icon: Cog, tier: "core" },
  { slug: "hr", title: "KIO-HR", claim: "HR-Prozesse automatisiert unterstützen.", icon: UserCheck, tier: "core" },
  { slug: "esg", title: "KIO-ESG", claim: "Regulatorik strukturiert und auditfähig managen.", icon: Leaf, tier: "enterprise" },
  { slug: "finance", title: "KIO-Finance", claim: "Unternehmenssteuerung mit Szenarien absichern.", icon: BarChart3, tier: "enterprise" },
  { slug: "procurement", title: "KIO-Procurement", claim: "Lieferkettenrisiken frühzeitig erkennen.", icon: Truck, tier: "enterprise" },
  { slug: "operations", title: "KIO-Operations", claim: "Produktionsprozesse transparent optimieren.", icon: Factory, tier: "enterprise" },
  { slug: "executive", title: "KIO-Executive", claim: "Gesamtunternehmens-Risiken im Blick behalten.", icon: LayoutDashboard, tier: "enterprise" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

function CompactCard({ mod }: { mod: ModuleDef }) {
  const Icon = mod.icon;
  const isEnterprise = mod.tier === "enterprise";

  return (
    <Link href={`/module/${mod.slug}`}>
      <Card
        className={`group relative rounded-2xl cursor-pointer transition-all duration-200 h-full min-h-[170px] border ${
          isEnterprise
            ? "bg-[#0a0f1a] border-white/[0.08] shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            : "bg-white border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-300/70"
        }`}
        data-testid={`module-card-${mod.slug}`}
      >
        <div className={`absolute top-0 left-5 right-5 h-[3px] rounded-b-full ${
          isEnterprise
            ? "bg-gradient-to-r from-[#ff6a00] via-[#ff8533] to-[#ff6a00]/50"
            : "bg-[#ff6a00]"
        }`} />

        {isEnterprise && (
          <Badge
            variant="outline"
            className="absolute top-3.5 right-4 text-[8px] font-bold tracking-[0.15em] uppercase text-[#ff6a00] bg-[#ff6a00]/[0.08] border-[#ff6a00]/15 px-1.5 py-0 h-5 rounded-full no-default-active-elevate"
            data-testid={`badge-enterprise-${mod.slug}`}
          >
            Enterprise
          </Badge>
        )}

        <CardHeader className="pb-0 pt-5 px-5">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isEnterprise
                ? "bg-[#ff6a00]/10"
                : "bg-[#ff6a00]/[0.06]"
            }`}>
              <Icon className="w-4 h-4 text-[#ff6a00]" />
            </div>
            <CardTitle className={`text-sm font-bold leading-snug ${
              isEnterprise ? "text-white" : "text-foreground"
            }`} data-testid={`text-module-title-${mod.slug}`}>
              {mod.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 pt-3 flex flex-col flex-1">
          <p className={`text-[13px] leading-relaxed line-clamp-2 flex-1 ${
            isEnterprise ? "text-white/55" : "text-foreground/45"
          }`} data-testid={`text-module-desc-${mod.slug}`}>
            {mod.claim}
          </p>

          <span className={`text-xs font-semibold flex items-center gap-1.5 mt-4 group-hover:gap-2.5 transition-all ${
            isEnterprise
              ? "text-[#ff6a00]/80 group-hover:text-[#ff6a00]"
              : "text-[#ff6a00] group-hover:underline"
          }`} data-testid={`link-module-${mod.slug}`}>
            Mehr erfahren <ArrowRight className="w-3 h-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ModuleGridCompact() {
  const coreModules = modules.filter(m => m.tier === "core");
  const enterpriseModules = modules.filter(m => m.tier === "enterprise");

  return (
    <section id="module" className="py-16 lg:py-24 relative border-t border-border" data-testid="section-module-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-6 rounded-full mx-auto" />
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-module-grid-title">
            KIO Module für Industrie & Mittelstand
          </motion.h2>
          <motion.p variants={fadeUp} className="text-foreground/50 max-w-xl mx-auto leading-relaxed" data-testid="text-module-grid-subtitle">
            Aktiviere die Bausteine, die du brauchst – integriert in Teams, verbunden mit ERP/CRM.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          data-testid="module-grid-core"
        >
          {coreModules.map((mod) => (
            <motion.div key={mod.slug} variants={fadeUp}>
              <CompactCard mod={mod} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center gap-4 my-10" data-testid="divider-enterprise">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/25">Enterprise</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          data-testid="module-grid-enterprise"
        >
          {enterpriseModules.map((mod) => (
            <motion.div key={mod.slug} variants={fadeUp}>
              <CompactCard mod={mod} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
