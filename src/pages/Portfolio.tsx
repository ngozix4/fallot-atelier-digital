import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

const Portfolio = () => (
  <Layout>
    <section className="pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="container mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-caption text-accent mb-6 text-center">SELECTED WORKS</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="heading-display text-foreground mb-20 text-center">Portfolio</h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.08}>
              <Link to={`/portfolio/${project.slug}`} className="group block">
                <div className="aspect-[4/5] bg-secondary mb-4 overflow-hidden">
                  <div className="w-full h-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <p className="text-caption text-muted-foreground">{project.title}</p>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-heading text-xl text-foreground">{project.title}</h3>
                  <p className="text-caption text-muted-foreground">{project.year}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1 font-body">{project.role}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
