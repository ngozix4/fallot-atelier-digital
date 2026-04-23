import { Star, BadgeCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  review: Review;
  index?: number;
}

const ReviewCard = ({ review, index = 0 }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
      className="glass-card p-6 md:p-8 flex flex-col gap-5 relative"
    >
      {/* Rating + verified */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
              strokeWidth={1.2}
            />
          ))}
        </div>
        {review.verified && (
          <a
            href={review.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
            title="Verified social account"
          >
            <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>Verified</span>
          </a>
        )}
      </div>

      {/* Quote */}
      <blockquote className="font-heading italic text-lg md:text-xl text-foreground leading-relaxed">
        &ldquo;{review.appreciated}&rdquo;
      </blockquote>

      {/* Summary line */}
      <dl className="text-xs md:text-sm font-body text-muted-foreground space-y-1.5">
        <div className="flex gap-2">
          <dt className="uppercase tracking-[0.18em] text-accent/80 min-w-[78px]">Project</dt>
          <dd>{review.project}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="uppercase tracking-[0.18em] text-accent/80 min-w-[78px]">Felt</dt>
          <dd>{review.felt}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="uppercase tracking-[0.18em] text-accent/80 min-w-[78px]">Recommend</dt>
          <dd>{review.recommend}</dd>
        </div>
        {review.comments && (
          <div className="flex gap-2">
            <dt className="uppercase tracking-[0.18em] text-accent/80 min-w-[78px]">Note</dt>
            <dd className="italic">{review.comments}</dd>
          </div>
        )}
      </dl>

      {/* Footer */}
      <div className="pt-4 mt-auto border-t border-accent/15 flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-heading text-base text-foreground">{review.name}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {formatReviewDate(review.date)}
          </p>
        </div>
        {review.socialHandle && (
          <a
            href={review.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            <span>{review.socialHandle}</span>
            <ExternalLink className="w-3 h-3" strokeWidth={1.4} />
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default ReviewCard;
