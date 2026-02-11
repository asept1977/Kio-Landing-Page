import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { motion } from "framer-motion";
import { 
  Bot, 
  Zap, 
  Share2, 
  Layers, 
  Cpu, 
  Globe2,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-accent/30 selection:text-black">
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-yellow-700 font-bold text-sm tracking-wide mb-6 border border-accent/20">
                THE FUTURE OF INTELLIGENCE
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
                Your AI Ecosystem <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Is Finally Here.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect agents, automate workflows, and unlock true intelligence with KIO. The platform where your digital assistants work together.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <WaitlistForm />
                <p className="text-sm text-gray-400 mt-4">
                  Join 2,000+ early adopters. No spam, ever.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Intelligence, Connected.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              KIO isn't just another chatbot. It's a substrate for intelligent agents to collaborate, share context, and execute complex tasks.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Share2 className="w-8 h-8 text-primary" />,
                title: "Connected Agents",
                desc: "Agents that talk to each other. Your Calendar Agent coordinates with your Email Agent automatically."
              },
              {
                icon: <Layers className="w-8 h-8 text-accent" />,
                title: "Unified Context",
                desc: "One shared brain. KIO remembers your preferences across every tool and interaction."
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: "Instant Actions",
                desc: "Don't just chat—do. KIO executes real actions across your integrated apps securely."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT / VISION SECTION */}
      <section id="about" className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-1 bg-accent mb-8" />
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  The Operating System <br/>
                  <span className="text-gray-400">for AGI.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Current AI tools are siloed. They're powerful, but lonely. KIO builds the bridges between models, data sources, and execution environments.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We are building an ecosystem where specialized agents can be composed into powerful workflows that adapt to your needs in real-time.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Model Agnostic - Use GPT-4, Claude, or Llama",
                    "Privacy First - Your data stays yours",
                    "Developer Friendly - Extensible API",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium text-gray-800">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all">
                  Read our Manifesto <ArrowRight className="w-5 h-5 group-hover:text-accent transition-colors" />
                </button>
              </motion.div>
            </div>

            <div className="relative">
              {/* Decorative Tech Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-3xl bg-gray-900 p-8 shadow-2xl overflow-hidden"
              >
                {/* Abstract UI Mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
                />

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
                />
                
                <div className="relative z-10 flex flex-col gap-6 h-full justify-center">
                  {/* Card 1 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-3/4 self-end transform translate-x-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="h-2 w-20 bg-white/20 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-2/3 bg-white/10 rounded" />
                    </div>
                  </div>

                  {/* Card 2 (Center) */}
                  <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-full shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-gray-900" />
                        </div>
                        <div>
                          <div className="h-3 w-24 bg-white/90 rounded mb-1" />
                          <div className="h-2 w-16 bg-white/40 rounded" />
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    </div>
                    <div className="h-24 rounded-lg bg-black/20 border border-white/5 mb-4 relative overflow-hidden">
                       <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/10 rounded overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "70%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                       </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-3/4 transform -translate-x-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-blue-400 flex items-center justify-center">
                        <Globe2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="h-2 w-20 bg-white/20 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="join" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} 
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to upgrade your workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join the waitlist today and get early access to the KIO ecosystem. 
            The future of work is automated, intelligent, and connected.
          </p>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-lg font-medium mb-6">Reserve your spot</h3>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
