import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { MessageCircle, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const WHATSAPP_NUMBER = "27691985031";
  const INSTAGRAM_HANDLE = "fallot_correctionstudio";
  const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Fallot Correction Studio, I would like to make an inquiry."
  )}`;

  return (
    <Layout>
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6 text-center">GET IN TOUCH</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-display text-foreground mb-6 text-center">Contact</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-editorial text-muted-foreground text-center mb-16 max-w-xl mx-auto">
              For consultations, collaborations, or inquiries — reach out directly on WhatsApp or Instagram.
            </p>
          </ScrollReveal>

          {/* Glass contact cards */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-lg p-8 group flex flex-col items-start"
              >
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                </div>
                <p className="text-caption text-accent mb-2">WHATSAPP</p>
                <h3 className="font-heading text-2xl font-light text-foreground mb-2">
                  Chat with us
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  +27 69 198 5031
                </p>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-lg p-8 group flex flex-col items-start"
              >
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-colors">
                    <Instagram className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                </div>
                <p className="text-caption text-accent mb-2">INSTAGRAM</p>
                <h3 className="font-heading text-2xl font-light text-foreground mb-2">
                  Send a DM
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  @{INSTAGRAM_HANDLE}
                </p>
              </a>
            </div>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          {/* Glass info panel */}
          <ScrollReveal delay={0.1}>
            <div className="glass-panel rounded-lg p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20 shrink-0">
                    <Mail className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-caption text-muted-foreground mb-1">Email</p>
                    <a
                      href="mailto:studio@fallotstudio.com"
                      className="text-sm text-foreground hover:text-accent transition-colors font-body"
                    >
                      studio@fallotstudio.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20 shrink-0">
                    <Phone className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-caption text-muted-foreground mb-1">Studio</p>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="text-sm text-foreground hover:text-accent transition-colors font-body"
                    >
                      +27 69 198 5031
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
