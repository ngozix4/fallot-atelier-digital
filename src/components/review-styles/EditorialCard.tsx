import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Review, formatReviewDate } from "@/lib/reviews";

interface Props {
  review: Review;
  index?: number;
}

const EditorialCard = ({ review, index = 0 }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
      className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 p-6 md:p-10 border border-accent/15 bg-card/40 backdrop-blur-sm"
    >
      {/* Big quote mark */}
      <div
        aria-hidden="true"
        className="font-heading italic text-accent/30 leading-none select-none text-[6rem] md:text-[9rem] -mt-3 md:-mt-6"
      >
        &ldquo;
      </div>

      {/* Right column */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
              strokeWidth={1.2}
            />
          ))}
        </div>

        <p className="font-heading italic text-xl md:text-2xl text-foreground leading-relaxed mb-6">
          {review.appreciated}
        </p>

        <dl className="grid grid-cols-3 gap-4 text-xs md:text-sm font-body text-muted-foreground border-y border-accent/15 py-4 mb-5">
          <div>
            <dt className="uppercase tracking-[0.18em] text-accent/80 text-[10px] mb-1">Project</dt>
            <dd className="text-foreground/90">{review.project}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.18em] text-accent/80 text-[10px] mb-1">Felt</dt>
            <dd className="text-foreground/90">{review.felt}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.18em] text-accent/80 text-[10px] mb-1">Recommend</dt>
            <dd className="text-foreground/90 line-clamp-2">{review.recommend}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="font-heading text-base text-foreground">{review.name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {formatReviewDate(review.date)} · {review.socialHandle}
            </p>
          </div>
          {review.verified && (
            <a
              href={review.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
            >
              <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.4} />
              Verified
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default EditorialCard;