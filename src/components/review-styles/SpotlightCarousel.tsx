import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  reviews: Review[];
}

const SpotlightCarousel = ({ reviews }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearInterval(id);
  }, [reviews.length]);

  if (reviews.length === 0) return null;
  const r = reviews[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + reviews.length) % reviews.length);

  return (
    <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-8" aria-label={`${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/20"}`}
                strokeWidth={1.2}
              />
            ))}
          </div>

          <blockquote className="font-heading italic text-2xl md:text-4xl text-foreground leading-snug mb-10">
            &ldquo;{r.appreciated}&rdquo;
          </blockquote>

          <div className="w-12 h-px bg-accent/40 mx-auto mb-6" />

          <p className="font-heading text-xl md:text-2xl text-accent mb-2">{r.name}</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {r.project} · {formatReviewDate(r.date)}
          </p>
          {r.verified && (
            <a
              href={r.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[10px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
            >
              <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.4} />
              {r.socialHandle}
            </a>
          )}
        </motion.div>
      </AnimatePresence>

      {reviews.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.2} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-accent transition-colors"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.2} />
          </button>

          <div className="flex items-center justify-center gap-2 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-px transition-all duration-500 ${
                  i === index ? "w-10 bg-accent" : "w-5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SpotlightCarousel;