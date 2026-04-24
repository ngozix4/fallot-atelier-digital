import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  review: Review;
  index?: number;
}

const GridCard = ({ review, index = 0 }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative p-5 md:p-6 bg-card/40 border border-accent/10 hover:border-accent/40 hover:shadow-[0_0_24px_-4px_hsl(var(--accent)/0.35)] transition-all duration-500 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
              strokeWidth={1.2}
            />
          ))}
        </div>
        {review.verified && (
          <BadgeCheck className="w-3.5 h-3.5 text-accent" strokeWidth={1.4} />
        )}
      </div>

      <p className="font-heading italic text-base text-foreground leading-snug line-clamp-4">
        &ldquo;{review.appreciated}&rdquo;
      </p>

      <p className="text-[10px] uppercase tracking-[0.18em] text-accent/80">
        {review.project}
      </p>

      <div className="pt-3 mt-auto border-t border-accent/10 flex items-center justify-between">
        <p className="font-heading text-sm text-foreground">{review.name}</p>
        <a
          href={review.socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-accent transition-colors"
        >
          {formatReviewDate(review.date)}
        </a>
      </div>
    </motion.article>
  );
};

export default GridCard;