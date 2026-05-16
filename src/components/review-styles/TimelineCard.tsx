import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  reviews: Review[];
}

const TimelineCard = ({ reviews }: Props) => {
  if (reviews.length === 0) return null;

  return (
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Vertical line */}
      <div
        className="absolute left-[14px] sm:left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />

      <ol className="space-y-12 sm:space-y-16 md:space-y-24">
        {reviews.map((r, idx) => {
          const alignRight = idx % 2 === 1;
          return (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Gold dot */}
              <span
                className="absolute left-[14px] sm:left-4 md:left-1/2 top-1.5 sm:top-2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent shadow-[0_0_0_3px_hsl(var(--background)),0_0_14px_hsl(var(--accent)/0.5)] sm:shadow-[0_0_0_4px_hsl(var(--background)),0_0_18px_hsl(var(--accent)/0.6)]"
                aria-hidden="true"
              />

              <div
                className={`pl-9 sm:pl-12 md:pl-0 md:w-1/2 ${
                  alignRight ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
                }`}
              >
                {/* Date */}
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-2 sm:mb-3">
                  {formatReviewDate(r.date)}
                </p>

                {/* Stars */}
                <div
                  className={`flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4 ${
                    alignRight ? "" : "md:justify-end"
                  }`}
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/20"
                      }`}
                      strokeWidth={1.2}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-heading italic text-base sm:text-lg md:text-xl text-foreground leading-snug mb-4 sm:mb-5">
                  &ldquo;{r.appreciated}&rdquo;
                </blockquote>

                {/* Meta */}
                <dl
                  className={`grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 text-left ${
                    alignRight ? "" : "md:[&>div]:text-right"
                  }`}
                >
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-accent/80 mb-0.5 sm:mb-1">
                      Project
                    </dt>
                    <dd className="font-body text-[11px] sm:text-xs text-foreground leading-tight">{r.project}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-accent/80 mb-0.5 sm:mb-1">
                      Felt
                    </dt>
                    <dd className="font-body text-[11px] sm:text-xs text-foreground leading-tight">{r.felt}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-accent/80 mb-0.5 sm:mb-1">
                      Recommend
                    </dt>
                    <dd className="font-body text-[11px] sm:text-xs text-foreground leading-tight">{r.recommend}</dd>
                  </div>
                </dl>

                {r.comments && (
                  <p className="font-heading italic text-sm text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                    {r.comments}
                  </p>
                )}

                {/* Author */}
                <p className="font-heading text-sm sm:text-base text-accent mb-1">{r.name}</p>
                {r.verified && (
                  <a
                    href={r.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent hover:text-foreground transition-colors ${
                      alignRight ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <BadgeCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={1.4} />
                    {r.socialHandle}
                  </a>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

export default TimelineCard;