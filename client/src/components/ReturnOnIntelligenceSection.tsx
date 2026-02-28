import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Brain, Sparkles, Info, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const formatDE = (val: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(val);

const benefits = [
  { icon: Clock, text: "Zeitgewinn pro Team" },
  { icon: Brain, text: "Bessere Entscheidungen durch Organisationswissen" },
  { icon: Sparkles, text: "Weniger Routine, mehr Wirkung" },
];

export function ReturnOnIntelligenceSection() {
  const [users, setUsers] = useState(50);
  const [hoursSaved, setHoursSaved] = useState(1.5);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [kioPrice, setKioPrice] = useState(125);
  const [computed, setComputed] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);

  const calc = useMemo(() => {
    const monthlyValue = users * hoursSaved * 4.33 * hourlyRate;
    const monthlyCost = users * kioPrice;
    const netValue = monthlyValue - monthlyCost;
    const paybackMonths = netValue > 0 ? monthlyCost / netValue : null;
    return { monthlyValue, monthlyCost, netValue, paybackMonths };
  }, [users, hoursSaved, hourlyRate, kioPrice]);

  const handleCompute = () => setComputed(true);

  return (
    <section className="py-20 lg:py-28 relative border-t border-border" data-testid="section-roi">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#ff6a00]/60 mb-3">
            Wirkungsanalyse
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-3" data-testid="text-roi-title">
            Return on Intelligence
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-foreground/50 max-w-lg mx-auto" data-testid="text-roi-desc">
            Vom Effizienzgewinn zur nachhaltigen Organisationsentwicklung.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-8 pt-2">
            <p className="text-sm text-foreground/60 leading-relaxed" data-testid="text-roi-supporting">
              Sehen Sie, wie schnell sich KIO durch Effizienzsteigerung amortisiert – und wie viel Kapazität dadurch für wertschöpfende Arbeit frei wird.
            </p>

            <div className="space-y-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-center gap-3" data-testid={`roi-benefit-${i}`}>
                    <div className="w-9 h-9 rounded-lg bg-[#ff6a00]/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#ff6a00]/70" />
                    </div>
                    <span className="text-sm font-medium text-foreground/70">{b.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="glass-card rounded-lg p-6 sm:p-8" data-testid="roi-calculator-card">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roi-users" className="text-xs font-semibold text-foreground/50 mb-1.5 block">
                      Anzahl Nutzer
                    </Label>
                    <Input
                      id="roi-users"
                      type="number"
                      value={users}
                      onChange={(e) => { setUsers(Number(e.target.value) || 0); setComputed(false); }}
                      className="bg-background border-border text-foreground font-medium"
                      data-testid="input-roi-users"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roi-hours" className="text-xs font-semibold text-foreground/50 mb-1.5 block">
                      Ø h Ersparnis / Nutzer / Woche
                    </Label>
                    <Input
                      id="roi-hours"
                      type="number"
                      step="0.5"
                      value={hoursSaved}
                      onChange={(e) => { setHoursSaved(Number(e.target.value) || 0); setComputed(false); }}
                      className="bg-background border-border text-foreground font-medium"
                      data-testid="input-roi-hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roi-rate" className="text-xs font-semibold text-foreground/50 mb-1.5 block">
                      Interner Stundensatz (€)
                    </Label>
                    <Input
                      id="roi-rate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => { setHourlyRate(Number(e.target.value) || 0); setComputed(false); }}
                      className="bg-background border-border text-foreground font-medium"
                      data-testid="input-roi-rate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roi-kio-price" className="text-xs font-semibold text-foreground/50 mb-1.5 block">
                      KIO Preis / Nutzer / Monat (€)
                    </Label>
                    <Input
                      id="roi-kio-price"
                      type="number"
                      value={kioPrice}
                      onChange={(e) => { setKioPrice(Number(e.target.value) || 0); setComputed(false); }}
                      className="bg-background border-border text-foreground font-medium"
                      data-testid="input-roi-kio-price"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleCompute}
                  className="w-full bg-[#ff6a00] border-[#ff6a00] text-white font-semibold"
                  data-testid="button-compute-roi"
                >
                  Wirkung berechnen
                </Button>

                {computed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Separator className="my-1" />
                    <div className="space-y-3 pt-3">
                      <div className="flex items-center justify-between" data-testid="roi-result-value">
                        <span className="text-sm text-foreground/50">Monatlicher Wertbeitrag</span>
                        <span className="text-sm font-bold text-foreground">{formatDE(calc.monthlyValue)}</span>
                      </div>
                      <div className="flex items-center justify-between" data-testid="roi-result-cost">
                        <span className="text-sm text-foreground/50">Monatliche KIO-Kosten</span>
                        <span className="text-sm font-bold text-foreground">{formatDE(calc.monthlyCost)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between" data-testid="roi-result-net">
                        <span className="text-sm font-semibold text-foreground/70">Netto-Wertbeitrag</span>
                        <span className={`text-base font-bold ${calc.netValue >= 0 ? "text-green-600" : "text-red-500"}`}>
                          {formatDE(calc.netValue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between" data-testid="roi-result-payback">
                        <span className="text-sm text-foreground/50">Amortisation</span>
                        <span className="text-sm font-bold text-foreground">
                          {calc.paybackMonths !== null
                            ? calc.paybackMonths < 1
                              ? "< 1 Monat"
                              : `${Math.ceil(calc.paybackMonths)} Monate`
                            : "noch nicht erreicht"}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-foreground/35 mt-4 flex items-start gap-1.5" data-testid="roi-disclaimer">
                      <Info className="w-3 h-3 mt-0.5 shrink-0" />
                      Hinweis: Ergebnis ist eine Näherung basierend auf Ihren Annahmen.
                    </p>
                  </motion.div>
                )}

                <button
                  onClick={() => setMethodOpen(!methodOpen)}
                  className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors flex items-center gap-1 mt-1"
                  data-testid="button-method-toggle"
                >
                  Methodik & Annahmen
                  <ChevronDown className={`w-3 h-3 transition-transform ${methodOpen ? "rotate-180" : ""}`} />
                </button>

                {methodOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-[11px] text-foreground/40 leading-relaxed space-y-1 overflow-hidden"
                    data-testid="roi-method-content"
                  >
                    <p>Wertbeitrag = Nutzer × Wochenstunden × 4,33 × Stundensatz</p>
                    <p>KIO-Kosten = Nutzer × KIO-Preis pro Monat</p>
                    <p>Netto = Wertbeitrag − Kosten</p>
                    <p>Amortisation = Kosten ÷ Netto-Wertbeitrag (in Monaten)</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
