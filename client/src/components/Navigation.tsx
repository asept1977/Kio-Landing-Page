import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-xl group-hover:bg-accent group-hover:text-primary transition-colors">
                K
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-gray-900">
                KIO
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Ecosystem
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Vision
            </button>
            <Button 
              onClick={() => scrollToSection("join")}
              className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => scrollToSection("features")} className="block w-full text-left text-lg font-medium text-gray-900">
                Ecosystem
              </button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left text-lg font-medium text-gray-900">
                Vision
              </button>
              <Button onClick={() => scrollToSection("join")} className="w-full bg-primary text-white rounded-full">
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
