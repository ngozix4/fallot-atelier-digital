import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  review: Review;
  index?: number;
  isLast?: boolean;
}

const TimelineCard = ({ review, index = 0, isLast = false }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 pb-12 md:pb-16"
    >
      {/* Dot + line */}
      <div className="relative flex flex-col items-center pt-2">
        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.6)]" />
        {!isLast && (
          <div className="absolute top-5 bottom-[-3rem] w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-2">
        <p className="font-heading italic text-accent text-sm md:text-base mb-1 tracking-wide">
          {formatReviewDate(review.date)}
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
          {review.project}
        </p>

        <div className="flex items-center gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
              strokeWidth={1.2}
            />
          ))}
        </div>

        <p className="font-heading italic text-lg md:text-xl text-foreground leading-relaxed mb-5 max-w-2xl">
          &ldquo;{review.appreciated}&rdquo;
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <p className="font-heading text-base text-foreground">— {review.name}</p>
          {review.verified && (
            <a
              href={review.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
            >
              <BadgeCheck className="w-3 h-3" strokeWidth={1.4} />
              {review.socialHandle}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default TimelineCard;