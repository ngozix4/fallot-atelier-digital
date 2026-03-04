import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    title: "Bespoke Tailoring",
    description: "One-of-a-kind garments crafted from the ground up. Every pattern, every stitch, every detail is born from your unique measurements and vision. True made-to-order excellence.",
  },
  {
    title: "Demi-Couture",
    description: "The bridge between ready-to-wear and haute couture. Semi-custom pieces that carry the soul of handcraft with the accessibility of modern design. Refined, intentional, elevated.",
  },
  {
    title: "Made-to-Measure",
    description: "Precision alterations to existing patterns, tailored to your exact proportions. The perfect fit for those who value silhouette and comfort in equal measure.",
  },
  {
    title: "Film & Costume Design",
    description: "Garments designed to inhabit character. From period pieces to contemporary narratives, we bring technical excellence and storytelling depth to the costume department.",
  },
  {
    title: "Pattern Cutting & Consulting",
    description: "Expert pattern development and design consulting for brands, designers, and production houses. Structural knowledge shared with precision and care.",
  },
];

const Services = () => (
  <Layout>
    <section className="pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <ScrollReveal>
          <p className="text-caption text-accent mb-6 text-center">WHAT WE DO</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="heading-display text-foreground mb-20 text-center">Services</h1>
        </ScrollReveal>

        <div className="space-y-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="border-t border-border pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <h3 className="heading-subsection text-foreground">{service.title}</h3>
                  <p className="md:col-span-2 text-editorial text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
