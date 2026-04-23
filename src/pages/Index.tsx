import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import TestimonialToast from "@/components/TestimonialToast";
import { projects } from "@/lib/projects";
import heroImage from "@/assets/SewAfrica-Getting-An-Award.jpeg";
import atelierImage from "@/assets/atelier-interior.jpg";

const Index = () => {
  return (
    <Layout>
      <TestimonialToast />
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
      <section className="py-16 sm:py-24 md:py-36">
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
              decoding="async"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Projects — Editorial Showcase */}
      <section className="py-16 sm:py-24 md:py-36 relative overflow-hidden">
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

          <div className="max-w-6xl mx-auto mt-12 md:mt-16 space-y-16 sm:space-y-24 md:space-y-32">
            {projects.slice(0, 4).map((project, i) => {
              const isReversed = i % 2 === 1;
              const indexLabel = String(i + 1).padStart(2, "0");

              return (
                <ScrollReveal key={project.slug} delay={0.05}>
                  <Link to={`/portfolio/${project.slug}`} className="group block relative">
                    <div
                      className={`grid grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-center ${
                        isReversed ? "[direction:rtl]" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="col-span-7 [direction:ltr]">
                        <div className="relative overflow-hidden">
                          <div
                            className={`absolute z-20 top-3 sm:top-4 ${
                              isReversed ? "right-3 sm:right-4" : "left-3 sm:left-4"
                            } font-heading text-4xl sm:text-5xl md:text-7xl italic text-background/80 mix-blend-difference pointer-events-none`}
                          >
                            {indexLabel}
                          </div>

                          <div className="aspect-[3/4] bg-secondary overflow-hidden border gold-border gold-border-hover transition-all duration-700 relative">
                            {project.image ? (
                              <>
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-between">
                                  <span className="text-caption text-accent">View Project</span>
                                  <ArrowUpRight className="w-5 h-5 text-accent" strokeWidth={1.2} />
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <p className="text-caption text-muted-foreground">{project.title}</p>
                              </div>
                            )}
                          </div>

                          <div className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 gold-glow" />
                        </div>
                      </div>

                      {/* Text Block */}
                      <div className="col-span-5 [direction:ltr]">
                        <div
                          className={`space-y-2 sm:space-y-4 md:space-y-5 ${
                            isReversed ? "pr-1 sm:pr-4" : "pl-1 sm:pl-4"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-4">
                            <span className="font-heading italic text-accent text-base sm:text-lg">
                              {indexLabel}
                            </span>
                            <span className="h-px flex-1 bg-accent/30 max-w-[40px] sm:max-w-[60px]" />
                            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground font-medium">
                              {project.year}
                            </span>
                          </div>

                          <h3 className="font-heading italic text-xl sm:text-3xl md:text-5xl font-light tracking-wide leading-[1.15] text-foreground group-hover:text-accent transition-colors duration-500">
                            {project.title}
                          </h3>

                          <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground font-medium">
                            {project.role}
                          </p>

                          <p className="text-xs sm:text-base md:text-lg leading-relaxed font-light tracking-wide text-muted-foreground line-clamp-2 sm:line-clamp-3 pt-1 sm:pt-2">
                            {project.description}
                          </p>

                          <div className="pt-2 sm:pt-4 inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium text-foreground group-hover:text-accent transition-colors duration-500">
                            <span className="relative">
                              <span className="hidden sm:inline">Explore the piece</span>
                              <span className="sm:hidden">Explore</span>
                              <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
                            </span>
                            <ArrowUpRight
                              className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                              strokeWidth={1.2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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
