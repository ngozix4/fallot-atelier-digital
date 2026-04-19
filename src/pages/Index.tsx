import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";
import heroImage from "@/assets/SewAfrica-Getting-An-Award.jpeg";
import atelierImage from "@/assets/atelier-interior.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury couture fabric in motion"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-caption text-cream-dark mb-6"
          >
            DEMI-COUTURE & BESPOKE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="heading-display text-cream mb-8"
          >
            Fallot Correction Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-editorial text-cream-dark max-w-lg mx-auto italic font-heading text-base sm:text-xl md:text-2xl"
          >
            Tailored to Overcome — Bespoke Fashion for the Confident Individual.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-cream/60 animate-scroll-hint" />
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6">THE ATELIER</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-section text-foreground mb-8">
              Where Structure Meets Soul
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-editorial text-muted-foreground mb-12">
              Fallot Correction Studio is a demi-couture and bespoke atelier rooted in structure, 
              faith, gratitude, and strength. We craft garments that understand the body, restore 
              confidence, and embody resilience. Each piece is an architecture of intention.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              to="/about"
              className="inline-block text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors duration-300"
            >
              Explore the Atelier
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image */}
      <ScrollReveal>
        <section className="px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <img
              src={atelierImage}
              alt="Inside the Fallot Correction Studio atelier"
              className="w-full aspect-[3/2] object-cover"
              loading="lazy"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Projects — Editorial Showcase */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        {/* Subtle gold backdrop accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-accent/40" />
              <p className="text-caption text-accent">SELECTED WORKS</p>
              <span className="h-px w-12 bg-accent/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-section text-foreground mb-4 text-center italic">
              The <span className="text-gold-gradient">Atelier</span> Archive
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="heartbeat-divider" />
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-6xl mx-auto mt-16">
            {projects.slice(0, 4).map((project, i) => {
              // Asymmetric editorial layout: tall, short, short, tall
              const isTall = i === 0 || i === 3;
              const colSpan = isTall ? "md:col-span-7" : "md:col-span-5";
              const aspect = isTall ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-[3/4]";
              const indexLabel = String(i + 1).padStart(2, "0");

              return (
                <ScrollReveal key={project.slug} delay={i * 0.08}>
                  <div className={`col-span-12 ${colSpan}`}>
                    <Link to={`/portfolio/${project.slug}`} className="group block relative">
                      {/* Index watermark */}
                      <div className="absolute -top-4 -left-2 z-20 pointer-events-none">
                        <span className="font-heading italic text-5xl md:text-6xl text-accent/30 leading-none">
                          {indexLabel}
                        </span>
                      </div>

                      <div className={`${aspect} bg-secondary overflow-hidden border gold-border gold-border-hover gold-glow-hover transition-all duration-700 relative`}>
                        {project.image ? (
                          <>
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                              <div className="flex items-end justify-between gap-4">
                                <div>
                                  <p className="text-caption text-accent mb-2">{project.year}</p>
                                  <h3 className="font-heading italic text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500">
                                    {project.title}
                                  </h3>
                                  <p className="text-caption text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    {project.role}
                                  </p>
                                </div>
                                <ArrowUpRight
                                  className="w-5 h-5 text-accent flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                                  strokeWidth={1.2}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <p className="text-caption text-muted-foreground">{project.title}</p>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="text-center mt-20">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-3 text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors duration-300"
              >
                Enter the Full Archive
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.2}
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
