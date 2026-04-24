import { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ReviewForm from "@/components/ReviewForm";
import SpotlightCarousel from "@/components/review-styles/SpotlightCarousel";
import { approvedReviews } from "@/lib/reviews";

const Reviews = () => {
  const [showForm, setShowForm] = useState(false);

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
            <SpotlightCarousel reviews={approvedReviews} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
