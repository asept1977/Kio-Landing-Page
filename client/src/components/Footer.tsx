import type { Lang } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-black/[0.06] py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-[#ff6a00] to-[#ff8533] rounded flex items-center justify-center text-white font-bold text-xs">
            K
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground/60">
            KIO
          </span>
        </div>
        <p className="text-sm text-foreground/40" data-testid="text-copyright">{t.copy}</p>
        <p className="text-xs text-foreground/30 mt-1">{t.tagline}</p>
      </div>
    </footer>
  );
}
