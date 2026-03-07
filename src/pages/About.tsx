import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => (
  <Layout>
    <section className="pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <ScrollReveal>
          <p className="text-caption text-accent mb-6">THE FOUNDER STORY</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="heading-display text-foreground mb-16">The Journey</h1>
        </ScrollReveal>

        {/* Portrait placeholder */}
        <ScrollReveal delay={0.2}>
          <div className="aspect-[3/4] max-w-sm mx-auto bg-secondary mb-16 flex items-center justify-center border gold-border gold-glow">
            <p className="text-caption text-muted-foreground">Portrait</p>
          </div>
        </ScrollReveal>

        <div className="space-y-8 text-editorial text-muted-foreground">
          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              Fallot Correction Studio was not born in a studio.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              It began in a modest home, beside an old Swan sewing machine and under the quiet influence 
              of a father whose discipline and resilience shaped more than fabric — they shaped vision.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Long before ateliers and runways, there was curiosity.<br />
              A fascination with structure.<br />
              A respect for craftsmanship.
            </p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p>
              In Chegutu, Zimbabwe, at Pfupajena High School, that curiosity evolved into intention. 
              Studying Textile and Design, he refined his technical foundation and graduated with distinction, 
              earning a B grade in his O-Level examinations — an early indication of both discipline and talent.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              But the journey was never meant to remain small.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Relocating to South Africa marked a pivotal shift. From 2018 to 2021, at Sew Africa, 
              his artistry matured into precision. He earned Student of the Year twice consecutively — 
              a rare distinction — and claimed top honors across multiple fashion contests. His designs 
              were not only seen; they were recognized.
            </p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              During these formative years, collaboration became language.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              He worked alongside XVII Victorian in Durban, mastering the delicate architecture of 
              wedding gowns and formalwear. He co-founded Isdwadlo, a Johannesburg-based streetwear 
              collective that disrupted its space and even captured radio attention — proof that his 
              range extended beyond couture into culture.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              His expertise became so respected that he was invited back to Sew Africa — not as a student, 
              but as a judge for modelling competitions. Authority had replaced apprenticeship.
            </p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              Yet behind the accolades lies a deeper story.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              In 2014, he underwent heart surgery for Tetralogy of Fallot — a life-altering moment 
              that would later define the philosophy of his brand. Survival reshaped perspective. 
              Precision gained new meaning. The human body became sacred architecture.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              In 2023, Fallot Correction Studio was born.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              A demi-couture and bespoke atelier rooted in structure, faith, gratitude, and strength.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              Since its inception, the studio has collaborated with designers such as Misfit Designs, 
              Tokelo Laka, and mentor XVII Victorian. He has contributed to film projects under 
              Darion Hing, bringing technical excellence to costume departments in 2024 and 2025.
            </p>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <p>
              Today, Fallot Correction Studio stands as a growing but deliberate house — crafting 
              garments that understand the body, restore confidence, and embody resilience.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              This is not fashion for attention.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="heading-subsection text-foreground italic">
              It is fashion for presence.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-accent text-caption mt-16">
              And the journey is only beginning.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
