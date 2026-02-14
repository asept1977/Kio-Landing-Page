import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { translations, type Lang } from "@/lib/i18n";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp } from "lucide-react";

const LICENSE_OPTIONS = [69, 89, 119] as const;
const WORKING_HOURS_PER_MONTH = 160;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

interface RoiCalculatorProps {
  lang: Lang;
}

export function RoiCalculator({ lang }: RoiCalculatorProps) {
  const t = translations[lang].roi;
  const [selectedLicense, setSelectedLicense] = useState<number>(89);
  const [numUsers, setNumUsers] = useState(120);
  const [personnelCost, setPersonnelCost] = useState(50);
  const [efficiencyPct, setEfficiencyPct] = useState(5);

  const calc = useMemo(() => {
    const monthlyKioCost = selectedLicense * numUsers;
    const monthlyPersonnelCost = personnelCost * WORKING_HOURS_PER_MONTH * numUsers;
    const monthlySavings = monthlyPersonnelCost * (efficiencyPct / 100);
    const netMonthly = monthlySavings - monthlyKioCost;
    const netAnnual = netMonthly * 12;

    const chartData = [];
    let foundBreakEven = false;
    let breakEvenPoint = -1;

    for (let month = 0; month <= 12; month++) {
      const cumulativeKio = monthlyKioCost * month;
      const cumulativeSavings = monthlySavings * month;
      chartData.push({
        month,
        kioCost: Math.round(cumulativeKio),
        savings: Math.round(cumulativeSavings),
      });
      if (!foundBreakEven && month > 0 && cumulativeSavings >= cumulativeKio) {
        breakEvenPoint = month;
        foundBreakEven = true;
      }
    }

    return {
      monthlyKioCost,
      monthlySavings,
      netMonthly,
      netAnnual,
      breakEvenPoint,
      chartData,
    };
  }, [selectedLicense, numUsers, personnelCost, efficiencyPct]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const summaryText = useMemo(() => {
    if (calc.netMonthly > 0) {
      const breakEvenLabel =
        calc.breakEvenPoint === 1
          ? lang === "de" ? "sofort" : "immediately"
          : calc.breakEvenPoint > 1
            ? lang === "de"
              ? `nach ${calc.breakEvenPoint} Monaten`
              : `after ${calc.breakEvenPoint} months`
            : lang === "de"
              ? "nach mehr als 12 Monaten"
              : "after more than 12 months";
      return t.summaryPositive(
        numUsers,
        selectedLicense,
        formatCurrency(calc.monthlySavings),
        formatCurrency(calc.netAnnual),
        breakEvenLabel,
      );
    }
    return t.summaryNegative(
      numUsers,
      selectedLicense,
      formatCurrency(calc.monthlySavings),
      formatCurrency(calc.monthlyKioCost),
    );
  }, [calc, numUsers, selectedLicense, lang, t]);

  return (
    <section id="roi" className="py-24 lg:py-32 relative border-t border-black/[0.06]" data-testid="section-roi">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="w-12 h-1 bg-[#ff6a00] mb-8 rounded-full mx-auto" />
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight" data-testid="text-roi-title">
            {t.sectionTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-foreground/60 max-w-xl mx-auto" data-testid="text-roi-desc">
            {t.sectionDesc}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <motion.div variants={fadeUp} className="glass-card rounded-md p-8 space-y-8" data-testid="roi-controls">
            <div>
              <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase mb-4 block" data-testid="label-license">
                {t.license}
              </label>
              <div className="flex flex-col gap-3">
                {LICENSE_OPTIONS.map((price) => (
                  <label
                    key={price}
                    className={`flex items-center gap-3 px-5 py-3 rounded-md text-sm font-bold cursor-pointer transition-all ${
                      selectedLicense === price
                        ? "bg-[#ff6a00]/10 border border-[#ff6a00]/40"
                        : "bg-black/[0.03] border border-black/[0.06]"
                    }`}
                    data-testid={`label-license-${price}`}
                  >
                    <input
                      type="radio"
                      name="license"
                      value={price}
                      checked={selectedLicense === price}
                      onChange={() => setSelectedLicense(price)}
                      className="accent-[#ff6a00] w-4 h-4"
                      data-testid={`radio-license-${price}`}
                    />
                    <span className={selectedLicense === price ? "text-[#ff6a00]" : "text-foreground/60"}>
                      {price} €{t.licensePerUser}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase" data-testid="label-users">
                  {t.users}
                </label>
                <span className="text-sm font-bold text-[#ff6a00]" data-testid="value-users">{numUsers}</span>
              </div>
              <Slider
                value={[numUsers]}
                onValueChange={(v) => setNumUsers(v[0])}
                min={10}
                max={500}
                step={10}
                data-testid="slider-users"
              />
              <div className="flex justify-between mt-1.5 text-xs text-foreground/30">
                <span>10</span>
                <span>500</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase" data-testid="label-personnel-cost">
                  {t.personnelCost}
                </label>
                <span className="text-sm font-bold text-[#ff6a00]" data-testid="value-personnel-cost">{personnelCost} {t.personnelCostUnit}</span>
              </div>
              <Slider
                value={[personnelCost]}
                onValueChange={(v) => setPersonnelCost(v[0])}
                min={20}
                max={150}
                step={5}
                data-testid="slider-personnel-cost"
              />
              <div className="flex justify-between mt-1.5 text-xs text-foreground/30">
                <span>20 €</span>
                <span>150 €</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-foreground/70 tracking-wide uppercase" data-testid="label-efficiency">
                  {t.efficiency}
                </label>
                <span className="text-sm font-bold text-[#ff6a00]" data-testid="value-efficiency">{efficiencyPct} %</span>
              </div>
              <Slider
                value={[efficiencyPct]}
                onValueChange={(v) => setEfficiencyPct(v[0])}
                min={1}
                max={30}
                step={1}
                data-testid="slider-efficiency"
              />
              <div className="flex justify-between mt-1.5 text-xs text-foreground/30">
                <span>1 %</span>
                <span>30 %</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-md p-5" data-testid="roi-kio-monthly">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-2">{t.kioMonthly}</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(calc.monthlyKioCost)}</p>
              </div>
              <div className="glass-card rounded-md p-5" data-testid="roi-savings-monthly">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-2">{t.savingsMonthly}</p>
                <p className="text-xl font-bold text-[#ff6a00]">{formatCurrency(calc.monthlySavings)}</p>
              </div>
              <div className="glass-card rounded-md p-5" data-testid="roi-net-annual">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-2">{t.netAnnual}</p>
                <p className={`text-xl font-bold ${calc.netAnnual >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {formatCurrency(calc.netAnnual)}
                </p>
              </div>
              <div className="glass-card rounded-md p-5" data-testid="roi-break-even">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-2">{t.breakEven}</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#ff6a00]" />
                  <p className="text-xl font-bold text-foreground">
                    {calc.breakEvenPoint === 1
                      ? t.breakEvenImmediate
                      : calc.breakEvenPoint > 1
                        ? calc.breakEvenPoint + " " + t.breakEvenMonths
                        : "> 12 " + t.breakEvenMonths}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-md p-5" data-testid="roi-summary">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {lang === "de" ? (
                  <>Bei <span className="font-bold text-foreground">{numUsers} Mitarbeitenden</span> erzeugt der Einsatz von KIO einen monatlichen Wertbeitrag von <span className="font-bold text-foreground">{formatCurrency(calc.monthlySavings)}</span>. Hochgerechnet ergibt sich ein jährlicher Ergebnisbeitrag von <span className="font-bold text-foreground">{formatCurrency(calc.netAnnual)}</span>. Die Wirkung beginnt ab dem ersten Monat.</>
                ) : (
                  <>With <span className="font-bold text-foreground">{numUsers} employees</span>, KIO generates a monthly value contribution of <span className="font-bold text-foreground">{formatCurrency(calc.monthlySavings)}</span>. Projected annually, this results in a yearly contribution of <span className="font-bold text-foreground">{formatCurrency(calc.netAnnual)}</span>. The impact starts from month one.</>
                )}
              </p>
              <p className="text-xs text-foreground/35 mt-3 leading-relaxed" data-testid="roi-disclaimer">
                {lang === "de"
                  ? "Hinweis: Der Rechner zeigt den finanziellen Effekt aus Zeitersparnis. Zusätzlich verbessert KI die Qualifikation der Mitarbeitenden und stabilisiert die Marge bei fallenden Marktpreisen."
                  : "Note: This calculator shows the financial effect of time savings. Additionally, AI improves employee qualifications and stabilizes margins when market prices decline."}
              </p>
            </div>

            <div className="mt-12 md:mt-16" data-testid="roi-strategy-section">
              <p className="text-sm font-bold text-foreground mb-1" data-testid="text-roi-strategy-title">
                {lang === "de"
                  ? "Warum sich KI langfristig rechnet"
                  : "Why AI pays off in the long run"}
              </p>
              <p className="text-xs text-foreground/50 mb-6" data-testid="text-roi-strategy-sub">
                {lang === "de"
                  ? "Nicht nur Kosten sparen — sondern Unternehmen stabiler machen."
                  : "Not just saving costs — making businesses more resilient."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-md p-5" data-testid="roi-strategy-card-1">
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff6a00] shrink-0" />
                    {lang === "de" ? "KI spart Zeit – Menschen bleiben wichtig" : "AI saves time – people remain essential"}
                  </p>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    {lang === "de"
                      ? "KI übernimmt Routinearbeit und schafft freie Zeit. Diese Zeit wird genutzt, um Mitarbeitende weiterzubilden und mehr Verantwortung zu geben. So entsteht kein Abbau, sondern bessere Arbeit."
                      : "AI takes over routine work and creates free time. This time is used to upskill employees and give them more responsibility. The result is not downsizing, but better work."}
                  </p>
                </div>
                <div className="glass-card rounded-md p-5" data-testid="roi-strategy-card-2">
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff6a00] shrink-0" />
                    {lang === "de" ? "Preise sinken – Gewinn bleibt" : "Prices drop – profit stays"}
                  </p>
                  <p className="text-xs text-foreground/50 leading-relaxed">
                    {lang === "de"
                      ? "Durch KI wird die Leistung günstiger zu erstellen. Der Markt senkt irgendwann den Preis. Weil die Kosten schneller sinken, bleibt der Gewinn erhalten oder wächst."
                      : "AI makes services cheaper to deliver. The market will eventually lower prices. Because costs fall faster, profit is preserved or grows."}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-md p-6" data-testid="roi-chart">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4">{t.resultTitle}</p>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={calc.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradientSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff6a00" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ff6a00" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradientKio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#003366" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#003366" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "rgba(0,0,0,0.35)" }}
                    tickFormatter={(v) => `${v}`}
                    axisLine={{ stroke: "rgba(0,0,0,0.06)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "rgba(0,0,0,0.35)" }}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    axisLine={false}
                    tickLine={false}
                    width={45}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === "kioCost" ? t.chartKioCost : t.chartSavings,
                    ]}
                    labelFormatter={(label) => `${t.breakEvenMonth} ${label}`}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="kioCost"
                    stroke="#003366"
                    strokeWidth={2}
                    fill="url(#gradientKio)"
                    name="kioCost"
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#ff6a00"
                    strokeWidth={2}
                    fill="url(#gradientSavings)"
                    name="savings"
                  />
                  {calc.breakEvenPoint > 0 && calc.breakEvenPoint <= 12 && (
                    <ReferenceLine
                      x={calc.breakEvenPoint}
                      stroke="#ff6a00"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "Break-Even",
                        position: "top",
                        style: { fontSize: 10, fill: "#ff6a00", fontWeight: 700 },
                      }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#003366]" />
                  <span className="text-xs text-foreground/50">{t.chartKioCost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6a00]" />
                  <span className="text-xs text-foreground/50">{t.chartSavings}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
