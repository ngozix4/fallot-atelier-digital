import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Web3Forms — replace WEB3FORMS_ACCESS_KEY with your real key
// from https://web3forms.com (free, no account needed for first key).
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_KEY";

interface FormState {
  name: string;
  email: string;
  social: string;
  rating: number;
  project: string;
  felt: string;
  appreciated: string;
  recommend: string;
  comments: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  social: "",
  rating: 5,
  project: "",
  felt: "",
  appreciated: "",
  recommend: "",
  comments: "",
};

const ReviewForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.social.trim()) {
      toast.error("Please share your social media link so we can verify your review.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Review from ${form.name || "Anonymous"} — Fallot Correction Studio`,
        from_name: "Fallot Studio Reviews",
        ...form,
        rating: `${form.rating} / 5`,
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(initialState);
        toast.success("Thank you. Your review will appear once verified.");
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email studio@fallotstudio.com.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 text-center"
      >
        <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-4" strokeWidth={1.2} />
        <h3 className="heading-subsection text-foreground mb-3">Thank you</h3>
        <p className="text-editorial text-muted-foreground max-w-md mx-auto">
          Your words have been received. Once verified, your review will be added to the atelier&rsquo;s archive.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-caption text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-colors"
        >
          Leave another review
        </button>
      </motion.div>
    );
  }

  const fieldClasses =
    "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground placeholder:text-muted-foreground/60 font-body transition-colors";
  const labelClasses = "text-caption text-muted-foreground block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass-card p-6 md:p-10">
      {/* Rating */}
      <div>
        <label className={labelClasses}>Your rating</label>
        <div className="flex items-center gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update("rating", n)}
              aria-label={`${n} stars`}
              className="p-1"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  n <= form.rating ? "fill-accent text-accent" : "text-muted-foreground/40"
                }`}
                strokeWidth={1.2}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Name (or initial)</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Michael K."
            className={fieldClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Email (optional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="for follow-up only"
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>
          Social media link <span className="text-accent">*</span>
        </label>
        <input
          type="url"
          required
          value={form.social}
          onChange={(e) => update("social", e.target.value)}
          placeholder="Instagram, TikTok or LinkedIn URL"
          className={fieldClasses}
        />
        <p className="text-xs text-muted-foreground/70 mt-2 font-body italic">
          Required so the studio can verify the review is from a real person.
        </p>
      </div>

      <div>
        <label className={labelClasses}>1. Which project or service did we work on?</label>
        <input
          type="text"
          required
          value={form.project}
          onChange={(e) => update("project", e.target.value)}
          placeholder="Bespoke suit, wedding dress, costume…"
          className={fieldClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>2. How did the garment / service make you feel?</label>
        <input
          type="text"
          required
          value={form.felt}
          onChange={(e) => update("felt", e.target.value)}
          placeholder="Confident, comfortable, amazed, proud…"
          className={fieldClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>3. What did you appreciate most?</label>
        <textarea
          required
          value={form.appreciated}
          onChange={(e) => update("appreciated", e.target.value)}
          placeholder="Attention to detail, communication, perfect fit, creativity…"
          rows={3}
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <div>
        <label className={labelClasses}>4. Would you recommend Fallot Correction Studio? Why?</label>
        <textarea
          required
          value={form.recommend}
          onChange={(e) => update("recommend", e.target.value)}
          rows={3}
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <div>
        <label className={labelClasses}>5. Any additional comments (optional)</label>
        <textarea
          value={form.comments}
          onChange={(e) => update("comments", e.target.value)}
          rows={2}
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-3 px-8 py-3 bg-accent text-accent-foreground text-caption hover:bg-foreground transition-colors duration-300 disabled:opacity-50"
      >
        <span>{submitting ? "Sending…" : "Submit review"}</span>
        <Send className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.4} />
      </button>
    </form>
  );
};

export default ReviewForm;
