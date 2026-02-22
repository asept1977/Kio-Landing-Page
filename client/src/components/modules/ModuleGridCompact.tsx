import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Megaphone, Handshake, Headset, Cog, UserCheck,
  Leaf, BarChart3, Truck, Factory, LayoutDashboard,
} from "lucide-react";

type ModuleCategory = "all" | "go-to-market" | "operations" | "governance";

interface ModuleDef {
  slug: string;
  title: string;
  claim: string;
  icon: LucideIcon;
  category: ModuleCategory[];
}

const modules: ModuleDef[] = [
  { slug: "marketing", title: "KIO-Marketing", claim: "Marktsignale in Wirkung übersetzen.", icon: Megaphone, category: ["go-to-market"] },
  { slug: "sales", title: "KIO-Sales", claim: "Jeden Kundentermin datenbasiert führen.", icon: Handshake, category: ["go-to-market"] },
  { slug: "service", title: "KIO-Service", claim: "Serviceprozesse intelligent steuern.", icon: Headset, category: ["operations"] },
  { slug: "products", title: "KIO-Products", claim: "Produktwissen strukturiert nutzbar machen.", icon: Cog, category: ["operations"] },
  { slug: "hr", title: "KIO-HR", claim: "HR-Prozesse automatisiert unterstützen.", icon: UserCheck, category: ["operations"] },
  { slug: "esg", title: "KIO-ESG", claim: "Regulatorik strukturiert und auditfähig managen.", icon: Leaf, category: ["governance"] },
  { slug: "finance", title: "KIO-Finance", claim: "Unternehmenssteuerung mit Szenarien absichern.", icon: BarChart3, category: ["governance"] },
  { slug: "procurement", title: "KIO-Procurement", claim: "Lieferkettenrisiken frühzeitig erkennen.", icon: Truck, category: ["operations"] },
  { slug: "operations", title: "KIO-Operations", claim: "Produktionsprozesse transparent optimieren.", icon: Factory, category: ["operations"] },
  { slug: "executive", title: "KIO-Executive", claim: "Gesamtunternehmens-Risiken im Blick behalten.", icon: LayoutDashboard, category: ["governance"] },
];

const filterChips: { label: string; value: ModuleCategory }[] = [
  { label: "Alle", value: "all" },
  { label: "Go-to-Market", value: "go-to-market" },
  { label: "Operations", value: "operations" },
  { label: "Governance", value: "governance" },
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

  return (
    <Link href={`/module/${mod.slug}`}>
      <Card
        className="group relative glass-card glass-card-hover rounded-2xl cursor-pointer transition-all duration-200 h-full min-h-[170px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
        data-testid={`module-card-${mod.slug}`}
      >
        <CardHeader className="pb-0 pt-5 px-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#ff6a00]/[0.07]">
              <Icon className="w-4 h-4 text-[#ff6a00]" />
            </div>
            <CardTitle className="text-sm font-bold leading-snug text-foreground" data-testid={`text-module-title-${mod.slug}`}>
              {mod.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 pt-3 flex flex-col flex-1">
          <p className="text-[13px] leading-relaxed line-clamp-2 flex-1 text-foreground/50" data-testid={`text-module-desc-${mod.slug}`}>
            {mod.claim}
          </p>

          <span className="text-xs font-semibold flex items-center gap-1.5 mt-4 group-hover:gap-2.5 transition-all text-[#ff6a00]" data-testid={`link-module-${mod.slug}`}>
            Mehr erfahren <ArrowRight className="w-3 h-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ModuleGridCompact() {
  const [activeFilter, setActiveFilter] = useState<ModuleCategory>("all");

  const filteredModules = activeFilter === "all"
    ? modules
    : modules.filter(m => m.category.includes(activeFilter));

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
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-testid="module-filter-chips"
        >
          {filterChips.map((chip) => (
            <Button
              key={chip.value}
              variant={activeFilter === chip.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(chip.value)}
              className={`rounded-full ${
                activeFilter === chip.value
                  ? "bg-[#ff6a00] border-[#ff6a00] text-white"
                  : ""
              }`}
              data-testid={`chip-filter-${chip.value}`}
            >
              {chip.label}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          data-testid="module-grid"
        >
          {filteredModules.map((mod) => (
            <motion.div key={mod.slug} variants={fadeUp}>
              <CompactCard mod={mod} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
