import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  review: Review;
  index?: number;
}

const MinimalCard = ({ review, index = 0 }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
      className="px-6 py-12 md:px-12 md:py-16 text-center"
    >
      <div className="flex items-center justify-center gap-1.5 mb-8" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/20"}`}
            strokeWidth={1}
          />
        ))}
      </div>

      <p className="font-heading italic text-2xl md:text-3xl text-foreground leading-snug mb-10 max-w-2xl mx-auto">
        {review.appreciated}
      </p>

      <div className="w-12 h-px bg-accent/40 mx-auto mb-6" />

      <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground mb-8">
        {review.project} · {review.felt} · {review.recommend.split(",")[0].split("—")[0].trim()}
      </p>

      <div className="flex flex-col items-center gap-1">
        <p className="font-heading text-lg text-foreground">{review.name}</p>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{formatReviewDate(review.date)}</span>
          {review.verified && (
            <a
              href={review.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-foreground transition-colors"
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

export default MinimalCard;