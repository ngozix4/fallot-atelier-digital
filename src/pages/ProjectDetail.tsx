import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Instagram } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <Layout>
        <div className="pt-32 pb-24 text-center">
          <h1 className="heading-section text-foreground">Project Not Found</h1>
          <Link to="/portfolio" className="text-caption text-accent mt-8 inline-block">
            Back to Portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  const indexLabel = String(projectIndex + 1).padStart(2, "0");
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <Layout>
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] sm:h-[90vh] min-h-[520px] sm:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-105"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
          {/* Layered gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        </div>

        {/* Index watermark */}
        <div className="absolute top-32 right-6 md:right-12 z-10 pointer-events-none">
          <span className="font-heading italic text-7xl md:text-9xl text-accent/20 leading-none">
            {indexLabel}
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-accent" />
                <p className="text-caption text-accent">{project.year} — CHAPTER {indexLabel}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="heading-display text-foreground italic mb-6">
                {project.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-editorial text-muted-foreground max-w-2xl text-lg italic font-heading">
                {project.role}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Meta Strip */}
      <section className="border-y gold-border bg-secondary/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x gold-border">
            <div className="py-8 md:py-10 md:pr-8">
              <p className="text-caption text-accent mb-3">Role</p>
              <p className="font-heading italic text-xl text-foreground">{project.role}</p>
            </div>
            <div className="py-8 md:py-10 md:px-8">
              <p className="text-caption text-accent mb-3">Collaborators</p>
              <p className="font-heading italic text-xl text-foreground">{project.collaborators}</p>
            </div>
            <div className="py-8 md:py-10 md:pl-8">
              <p className="text-caption text-accent mb-3">Year</p>
              <p className="font-heading italic text-xl text-foreground">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Narrative */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="text-caption text-accent mb-6 text-center">— THE NARRATIVE —</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-foreground italic text-center mb-12">
                {project.narrativeTitle ?? "A Study in"}{" "}
                <span className="text-gold-gradient">{project.narrativeHighlight ?? "Intention"}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="heartbeat-divider" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-editorial text-muted-foreground text-center text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                {project.description}
              </p>
            </ScrollReveal>

            {project.instagramUrl && (
              <ScrollReveal delay={0.25}>
                <div className="mt-12 flex flex-col items-center">
                  <p className="text-caption text-muted-foreground mb-4">
                    — VISUAL ARCHIVE LIVES ON INSTAGRAM —
                  </p>
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 border gold-border gold-border-hover gold-glow-hover transition-all duration-500"
                  >
                    <Instagram
                      className="w-5 h-5 text-accent transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.2}
                    />
                    <span className="font-heading italic text-lg text-foreground group-hover:text-accent transition-colors duration-500">
                      {project.instagramHandle}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={1.2}
                    />
                  </a>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Editorial Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-16 sm:pb-24 md:pb-36">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center justify-center gap-4 mb-16">
                  <span className="h-px w-12 bg-accent/40" />
                  <p className="text-caption text-accent">THE COLLECTION</p>
                  <span className="h-px w-12 bg-accent/40" />
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {project.gallery.map((img, idx) => {
                  // Editorial asymmetric pattern: large, small, small, large, small, small...
                  const pattern = idx % 6;
                  const spanClass =
                    pattern === 0 || pattern === 3
                      ? "col-span-12 md:col-span-8"
                      : "col-span-6 md:col-span-4";
                  const aspectClass =
                    pattern === 0 || pattern === 3
                      ? "aspect-[16/10]"
                      : "aspect-[3/4]";

                  return (
                    <ScrollReveal key={idx} delay={Math.min(idx * 0.05, 0.4)}>
                      <div className={`${spanClass} group relative overflow-hidden border gold-border gold-border-hover transition-all duration-700`}>
                        <div className={`${aspectClass} bg-secondary overflow-hidden`}>
                          <img
                            src={img}
                            alt={`${project.title} — frame ${idx + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110"
                          />
                          {/* Gold tint overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          {/* Frame number */}
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <span className="font-heading italic text-accent text-sm">
                              Frame {String(idx + 1).padStart(2, "0")} / {String(project.gallery!.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Closing & Next Project */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="luxury-divider" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-caption text-accent text-center mb-4">— CONTINUE THE JOURNEY —</p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group block text-center py-12 border-y gold-border gold-border-hover transition-all duration-500"
              >
                <p className="text-caption text-muted-foreground mb-3">Next Chapter</p>
                <h3 className="heading-subsection text-foreground italic group-hover:text-accent transition-colors duration-500 inline-flex items-center gap-4">
                  {nextProject.title}
                  <ArrowUpRight
                    className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    strokeWidth={1.2}
                  />
                </h3>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.2} />
                  Return to the Archive
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
