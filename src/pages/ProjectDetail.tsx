import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/lib/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

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

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          {/* Hero placeholder */}
          <ScrollReveal>
  <div className="aspect-[16/9] bg-secondary mb-16 flex items-center justify-center border gold-border gold-glow overflow-hidden">
    {project.image ? (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    ) : (
      <p className="text-caption text-muted-foreground">
        {project.title} — No hero image
      </p>
    )}
  </div>
</ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-caption text-accent mb-4">{project.year}</p>
            <h1 className="heading-display text-foreground mb-8">{project.title}</h1>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ScrollReveal delay={0.2}>
              <p className="text-caption text-muted-foreground mb-2">Role</p>
              <p className="text-editorial text-foreground">{project.role}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="text-caption text-muted-foreground mb-2">Collaborators</p>
              <p className="text-editorial text-foreground">{project.collaborators}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-caption text-muted-foreground mb-2">Year</p>
              <p className="text-editorial text-foreground">{project.year}</p>
            </ScrollReveal>
          </div>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p className="text-editorial text-muted-foreground max-w-2xl mx-auto text-center text-lg leading-relaxed">
              {project.description}
            </p>
          </ScrollReveal>

          {project.gallery && project.gallery.length > 0 && (
  <ScrollReveal delay={0.4}>
    <div className="mt-16">
      <h2 className="heading-subsection text-foreground text-center mb-8">
        Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.gallery.map((img, idx) => (
          <div
            key={idx}
            className="aspect-[4/3] bg-secondary border gold-border overflow-hidden"
          >
            <img
              src={img}
              alt={`${project.title} - ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  </ScrollReveal>
)}

          <div className="luxury-divider" />

          <ScrollReveal>
            <div className="text-center">
              <Link
                to="/portfolio"
                className="text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors"
              >
                Back to Portfolio
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
