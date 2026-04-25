import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  reviews: Review[];
}

const TimelineCard = ({ reviews }: Props) => {
  if (reviews.length === 0) return null;

  return (
    <div className="relative max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Vertical line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />

      <ol className="space-y-16 md:space-y-24">
        {reviews.map((r, idx) => {
          const alignRight = idx % 2 === 1;
          return (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              {/* Gold dot */}
              <span
                className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_0_4px_hsl(var(--background)),0_0_18px_hsl(var(--accent)/0.6)]"
                aria-hidden="true"
              />

              <div
                className={`pl-12 md:pl-0 md:w-1/2 ${
                  alignRight ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
                }`}
              >
                {/* Date */}
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
                  {formatReviewDate(r.date)}
                </p>

                {/* Stars */}
                <div
                  className={`flex items-center gap-1 mb-4 ${
                    alignRight ? "" : "md:justify-end"
                  }`}
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/20"
                      }`}
                      strokeWidth={1.2}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-heading italic text-lg md:text-xl text-foreground leading-snug mb-5">
                  &ldquo;{r.appreciated}&rdquo;
                </blockquote>

                {/* Meta */}
                <dl
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-left ${
                    alignRight ? "" : "md:[&>div]:text-right"
                  }`}
                >
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.25em] text-accent/80 mb-1">
                      Project
                    </dt>
                    <dd className="font-body text-xs text-foreground">{r.project}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.25em] text-accent/80 mb-1">
                      Felt
                    </dt>
                    <dd className="font-body text-xs text-foreground">{r.felt}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.25em] text-accent/80 mb-1">
                      Recommend
                    </dt>
                    <dd className="font-body text-xs text-foreground">{r.recommend}</dd>
                  </div>
                </dl>

                {r.comments && (
                  <p className="font-heading italic text-sm text-muted-foreground mb-5">
                    {r.comments}
                  </p>
                )}

                {/* Author */}
                <p className="font-heading text-base text-accent mb-1">{r.name}</p>
                {r.verified && (
                  <a
                    href={r.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors ${
                      alignRight ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <BadgeCheck className="w-3 h-3" strokeWidth={1.4} />
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