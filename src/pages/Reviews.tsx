import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import EditorialCard from "@/components/review-styles/EditorialCard";
import MinimalCard from "@/components/review-styles/MinimalCard";
import SpotlightCarousel from "@/components/review-styles/SpotlightCarousel";
import GridCard from "@/components/review-styles/GridCard";
import TimelineCard from "@/components/review-styles/TimelineCard";
import { approvedReviews } from "@/lib/reviews";

type StyleId = "glass" | "editorial" | "minimal" | "spotlight" | "grid" | "timeline";

const STYLES: { id: StyleId; label: string; hint: string }[] = [
  { id: "glass", label: "01 · Glassmorphism", hint: "Soft, modern, blurred luxury cards" },
  { id: "editorial", label: "02 · Editorial", hint: "Magazine split layout with quote mark" },
  { id: "minimal", label: "03 · Minimal", hint: "Apple-style spacing, thin gold lines" },
  { id: "spotlight", label: "04 · Spotlight", hint: "One review, hero carousel" },
  { id: "grid", label: "05 · Grid", hint: "Compact cards, hover glow" },
  { id: "timeline", label: "06 · Timeline", hint: "Storytelling vertical journey" },
];

const Reviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [style, setStyle] = useState<StyleId>("glass");

  const renderReviews = () => {
    if (approvedReviews.length === 0) return null;

    switch (style) {
      case "glass":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {approvedReviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        );
      case "editorial":
        return (
          <div className="flex flex-col gap-8 md:gap-10 max-w-4xl mx-auto">
            {approvedReviews.map((r, i) => (
              <EditorialCard key={r.id} review={r} index={i} />
            ))}
          </div>
        );
      case "minimal":
        return (
          <div className="divide-y divide-accent/15 max-w-3xl mx-auto">
            {approvedReviews.map((r, i) => (
              <MinimalCard key={r.id} review={r} index={i} />
            ))}
          </div>
        );
      case "spotlight":
        return <SpotlightCarousel reviews={approvedReviews} />;
      case "grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {approvedReviews.map((r, i) => (
              <GridCard key={r.id} review={r} index={i} />
            ))}
          </div>
        );
      case "timeline":
        return (
          <div className="max-w-3xl mx-auto pl-2">
            {approvedReviews.map((r, i) => (
              <TimelineCard
                key={r.id}
                review={r}
                index={i}
                isLast={i === approvedReviews.length - 1}
              />
            ))}
          </div>
        );
    }
  };

  const activeStyle = STYLES.find((s) => s.id === style)!;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6">VOICES OF THE ATELIER</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-display text-foreground mb-8 italic">
              Testimonials
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="heartbeat-divider" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-editorial text-muted-foreground mb-10">
              Words from those who have worn the work — clients who entrusted the studio with
              moments of confidence, ceremony, and craft.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-3 px-8 py-3 bg-accent text-accent-foreground text-caption hover:bg-foreground transition-colors duration-300"
            >
              {showForm ? "Close form" : "Leave a review"}
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Form */}
      {showForm && (
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReviewForm />
            </motion.div>
          </div>
        </section>
      )}

      {/* Style switcher (preview tool) */}
      {approvedReviews.length > 0 && (
        <section className="pb-10">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="border border-accent/20 bg-card/30 backdrop-blur-sm p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                    Preview · Choose a style
                  </p>
                  <p className="font-heading italic text-lg text-foreground">
                    {activeStyle.label} — <span className="text-muted-foreground not-italic text-sm">{activeStyle.hint}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                      style === s.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-accent/20 text-muted-foreground hover:border-accent/60 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews list */}
      <section className="pb-24 md:pb-36">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          {approvedReviews.length === 0 ? (
            <ScrollReveal>
              <div className="max-w-xl mx-auto text-center py-20 md:py-28">
                <Quote className="w-10 h-10 text-accent/60 mx-auto mb-6" strokeWidth={1.2} />
                <h2 className="heading-subsection text-foreground mb-4 italic">
                  Be the first to share
                </h2>
                <p className="text-editorial text-muted-foreground">
                  No testimonials have been published yet. If we have crafted for you,
                  we would be honoured to hear your story.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            renderReviews()
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
