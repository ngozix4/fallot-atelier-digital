import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const WHATSAPP_NUMBER = "27691985031";
  const INSTAGRAM_HANDLE = "fallot_correctionstudio";
  const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Fallot Correction Studio, I would like to make an inquiry."
  )}`;

  return (
    <Layout>
      <section className="pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="container mx-auto px-6 md:px-12 max-w-2xl">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6 text-center">GET IN TOUCH</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-display text-foreground mb-6 text-center">Contact</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-editorial text-muted-foreground text-center mb-16">
              For consultations, collaborations, or inquiries — reach out to us directly on WhatsApp or Instagram.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center inline-block py-4 px-10 border border-accent text-accent text-caption tracking-[0.2em] hover:bg-accent hover:text-accent-foreground gold-glow gold-glow-hover transition-all duration-500"
              >
                Contact us on WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center inline-block py-4 px-10 border border-border text-foreground text-caption tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-300"
              >
                Message us on Instagram
              </a>
            </div>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <div className="text-center space-y-3">
              <p className="text-editorial text-muted-foreground">studio@fallotstudio.com</p>
              <p className="text-caption text-muted-foreground">+27 69 198 5031</p>
              <p className="text-caption text-muted-foreground">@{INSTAGRAM_HANDLE}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
