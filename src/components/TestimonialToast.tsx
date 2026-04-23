import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, BadgeCheck, X } from "lucide-react";
import { approvedReviews } from "@/lib/reviews";

const STORAGE_KEY = "fcs:testimonial-toast-dismissed";
const ROTATION_MS = 9000;
const FIRST_DELAY_MS = 4500;

const TestimonialToast = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (approvedReviews.length === 0) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const showTimer = window.setTimeout(() => setVisible(true), FIRST_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible || approvedReviews.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % approvedReviews.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (approvedReviews.length === 0) return null;
  const review = approvedReviews[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key={review.id}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 w-[88vw] max-w-sm glass-panel rounded-md p-5 pr-8"
          aria-live="polite"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2 right-2 text-muted-foreground hover:text-accent transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.4} />
          </button>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
                  strokeWidth={1.2}
                />
              ))}
            </div>
            {review.verified && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-accent">
                <BadgeCheck className="w-3 h-3" strokeWidth={1.4} />
                Verified
              </span>
            )}
          </div>

          <p className="font-heading italic text-sm md:text-base text-foreground leading-snug line-clamp-3">
            &ldquo;{review.appreciated}&rdquo;
          </p>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground/90">{review.name}</span>
              <span className="mx-1.5 text-accent/50">·</span>
              <span className="italic">{review.project}</span>
            </p>
            <Link
              to="/reviews"
              onClick={dismiss}
              className="text-[10px] uppercase tracking-[0.2em] text-accent border-b border-accent/60 hover:text-foreground hover:border-foreground transition-colors"
            >
              Read more
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default TestimonialToast;
