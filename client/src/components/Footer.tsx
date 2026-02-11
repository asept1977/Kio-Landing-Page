import { Link } from "wouter";

interface FooterProps {
  lang: 'en' | 'de';
}

export function Footer({ lang }: FooterProps) {
  const footerContent = {
    en: {
      desc: "Building the next generation of interconnected AI agents. Seamlessly integrating intelligence into your daily workflow.",
      product: "Product",
      features: "Features",
      roadmap: "Roadmap",
      api: "API",
      company: "Company",
      about: "About",
      blog: "Blog",
      careers: "Careers",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    de: {
      desc: "Aufbau der nächsten Generation vernetzter KI-Agenten. Nahtlose Integration von Intelligenz in Ihren täglichen Workflow.",
      product: "Produkt",
      features: "Funktionen",
      roadmap: "Roadmap",
      api: "API",
      company: "Unternehmen",
      about: "Über uns",
      blog: "Blog",
      careers: "Karriere",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen"
    }
  };

  const t = footerContent[lang];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-display font-bold text-sm">
                K
              </div>
              <span className="font-display font-bold text-xl tracking-tighter text-gray-900">
                KIO
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              {t.desc}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t.product}</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">{t.features}</a></li>
              <li><a href="#" className="hover:text-primary">{t.roadmap}</a></li>
              <li><a href="#" className="hover:text-primary">{t.api}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t.company}</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">{t.about}</a></li>
              <li><a href="#" className="hover:text-primary">{t.blog}</a></li>
              <li><a href="#" className="hover:text-primary">{t.careers}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} KIO Systems Inc. {t.rights}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">{t.privacy}</a>
            <a href="#" className="hover:text-primary">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
