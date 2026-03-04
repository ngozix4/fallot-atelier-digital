import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const Manifesto = () => (
  <Layout>
    <section className="pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-caption text-accent mb-6">BRAND MANIFESTO</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="heading-display text-foreground mb-20">
            Fallot Correction Studio
          </h1>
        </ScrollReveal>

        <div className="space-y-10 text-editorial text-muted-foreground">
          <ScrollReveal>
            <p className="heading-subsection text-foreground">We believe tailoring is architecture.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="heading-subsection text-foreground">We believe the body is sacred structure.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="heading-subsection text-foreground">We believe resilience is the highest form of beauty.</p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p>
              Fallot Correction Studio was born from survival — from a repaired heart and a renewed 
              vision of purpose. Every garment we create carries that understanding: that the body 
              is not something to hide, but something to honor.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              We design with intention.<br />
              We cut with precision.<br />
              We sew with reverence.
            </p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p>
              Our atelier exists for individuals who value craftsmanship over noise, legacy over 
              trend, presence over performance.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              Demi-couture for those who move with quiet authority.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              Bespoke tailoring for those who understand refinement.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>Each piece is structured to elevate posture, silhouette, and spirit.</p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p className="heading-subsection text-foreground">
              Luxury is not excess.<br />
              Luxury is discipline.<br />
              Luxury is restraint.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              We are building more than a brand —<br />
              We are building a house defined by structure, faith, and mastery.
            </p>
          </ScrollReveal>

          <div className="luxury-divider" />

          <ScrollReveal>
            <p className="heading-subsection text-foreground">Fallot Correction Studio</p>
            <p className="text-caption text-accent mt-4">Tailored to Overcome.</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </Layout>
);

export default Manifesto;
