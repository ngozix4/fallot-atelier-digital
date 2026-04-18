import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

const Portfolio = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6 text-center">SELECTED WORKS — {new Date().getFullYear()}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-display text-foreground text-center italic">
              The <span className="text-gold-gradient">Atelier</span> Archive
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="heartbeat-divider" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-editorial text-muted-foreground text-center max-w-2xl mx-auto">
              A curated collection of garments, collaborations, and moments —
              each piece a study in tailoring as architecture.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Editorial Project List */}
    <section className="pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {projects.map((project, i) => {
            const isReversed = i % 2 === 1;
            const indexLabel = String(i + 1).padStart(2, "0");

            return (
              <ScrollReveal key={project.slug} delay={0.05}>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block relative"
                >
                  <div
                    className={`grid grid-cols-12 gap-4 md:gap-8 items-center ${
                      isReversed ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="col-span-12 md:col-span-7 [direction:ltr]">
                      <div className="relative overflow-hidden">
                        {/* Index number watermark */}
                        <div
                          className={`absolute z-20 top-4 ${
                            isReversed ? "right-4" : "left-4"
                          } font-heading text-5xl md:text-7xl italic text-background/80 mix-blend-difference pointer-events-none`}
                        >
                          {indexLabel}
                        </div>

                        {/* Image frame */}
                        <div className="aspect-[4/5] md:aspect-[3/4] bg-secondary overflow-hidden border gold-border gold-border-hover transition-all duration-700 relative">
                          {project.image ? (
                            <>
                              <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105"
                              />
                              {/* Gold tint overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                              {/* Reveal label */}
                              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-between">
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

                        {/* Subtle outer glow on hover */}
                        <div className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 gold-glow" />
                      </div>
                    </div>

                    {/* Text Block */}
                    <div className="col-span-12 md:col-span-5 [direction:ltr]">
                      <div
                        className={`space-y-4 md:space-y-5 ${
                          isReversed ? "md:pr-4" : "md:pl-4"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-heading italic text-accent text-lg">
                            {indexLabel}
                          </span>
                          <span className="h-px flex-1 bg-accent/30 max-w-[60px]" />
                          <span className="text-caption text-muted-foreground">{project.year}</span>
                        </div>

                        <h2 className="heading-section text-foreground italic group-hover:text-accent transition-colors duration-500">
                          {project.title}
                        </h2>

                        <p className="text-caption text-muted-foreground">
                          {project.role}
                        </p>

                        <p className="text-editorial text-muted-foreground line-clamp-3 pt-2">
                          {project.description}
                        </p>

                        <div className="pt-4 inline-flex items-center gap-2 text-caption text-foreground group-hover:text-accent transition-colors duration-500">
                          <span className="relative">
                            Explore the piece
                            <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
                          </span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
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

        {/* Closing motif */}
        <ScrollReveal delay={0.1}>
          <div className="heartbeat-divider mt-32" />
          <p className="text-caption text-muted-foreground text-center">
            — End of Archive —
          </p>
        </ScrollReveal>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
