import { useState } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const WHATSAPP_NUMBER = "27691985031";
  const INSTAGRAM_HANDLE = "fallot_correctionstudio";
  const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `New inquiry from Fallot Correction Studio website%0A%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Email: ${encodeURIComponent(form.email)}%0A%0A` +
      `Message:%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

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
              For consultations, collaborations, or inquiries.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-caption text-muted-foreground block mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-caption text-muted-foreground block mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-caption text-muted-foreground block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-caption tracking-[0.2em] border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground gold-glow gold-glow-hover transition-all duration-500"
              >
                Send Inquiry
              </button>
            </form>
          </ScrollReveal>

          <div className="heartbeat-divider" />

          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="text-editorial text-muted-foreground">studio@fallotstudio.com</p>
              <div className="flex items-center justify-center gap-8">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-muted-foreground hover:text-accent transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-muted-foreground hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello Fallot Correction Studio, I would like to book a consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-4 px-10 border border-accent text-accent text-caption tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
              >
                Book via WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-4 px-10 border border-border text-foreground text-caption tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-300"
              >
                Message on Instagram
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
