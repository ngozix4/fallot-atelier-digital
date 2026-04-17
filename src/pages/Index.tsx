import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";
import heroImage from "@/assets/SewAfrica-Getting-An-Award.jpeg";
import atelierImage from "@/assets/atelier-interior.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury couture fabric in motion"
            className="w-full h-full object-cover"
            loading="eager"
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
            className="text-editorial text-cream-dark max-w-lg mx-auto italic font-heading text-xl md:text-2xl"
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

      {/* Featured Projects */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6 text-center">SELECTED WORKS</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-section text-foreground mb-16 text-center">Portfolio</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] bg-secondary mb-4 overflow-hidden border gold-border gold-border-hover gold-glow-hover transition-all duration-500">
                    <div className="w-full h-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <p className="text-caption text-muted-foreground">{project.title}</p>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                  <p className="text-caption text-muted-foreground">{project.year}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <Link
                to="/portfolio"
                className="inline-block text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors duration-300"
              >
                View All Projects
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
