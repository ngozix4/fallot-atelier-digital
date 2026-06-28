import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

// Web3Forms access key — public by design (safe to ship in client code).
const WEB3FORMS_ACCESS_KEY = "16a4d2dd-266e-4db1-a33c-3771a8425d4d";

// Photo upload constraints
const MAX_PHOTOS = 2;
const MAX_PHOTO_SIZE_MB = 5;
const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];

// Simple client-side rate limiter: 1 submission per 60s, max 3 per hour (per browser).
const RATE_LIMIT_KEY = "fcs_review_submissions";
const RATE_COOLDOWN_MS = 60 * 1000;
const RATE_HOURLY_MAX = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const checkRateLimit = (): { ok: boolean; message?: string } => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const stamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = stamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length > 0 && now - recent[recent.length - 1] < RATE_COOLDOWN_MS) {
      const wait = Math.ceil((RATE_COOLDOWN_MS - (now - recent[recent.length - 1])) / 1000);
      return { ok: false, message: `Please wait ${wait}s before submitting another review.` };
    }
    if (recent.length >= RATE_HOURLY_MAX) {
      return { ok: false, message: "You've submitted several reviews recently. Please try again later." };
    }
    return { ok: true };
  } catch {
    return { ok: true };
  }
};

const recordSubmission = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const stamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = stamps.filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch {
    /* ignore */
  }
};

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
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = ""; // allow re-selecting same file after removal
    if (files.length === 0) return;

    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      toast.error(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const valid: File[] = [];
    for (const file of files.slice(0, remainingSlots)) {
      const typeOk =
        ACCEPTED_IMAGE_TYPES.includes(file.type) ||
        /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
      if (!typeOk) {
        toast.error(`${file.name} is not a supported image (JPG, PNG, WEBP, HEIC).`);
        continue;
      }
      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        toast.error(`${file.name} is larger than ${MAX_PHOTO_SIZE_MB}MB.`);
        continue;
      }
      valid.push(file);
    }

    if (files.length > remainingSlots) {
      toast.message(`Only the first ${remainingSlots} photo(s) were added (max ${MAX_PHOTOS}).`);
    }

    if (valid.length > 0) {
      setPhotos((p) => [...p, ...valid]);
      setPreviews((p) => [...p, ...valid.map((f) => URL.createObjectURL(f))]);
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos((p) => p.filter((_, i) => i !== idx));
    setPreviews((p) => {
      const url = p[idx];
      if (url) URL.revokeObjectURL(url);
      return p.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.social.trim()) {
      toast.error("Please share your social media link so we can verify your review.");
      return;
    }
    const rl = checkRateLimit();
    if (!rl.ok) {
      toast.error(rl.message ?? "Please slow down a moment.");
      return;
    }
    setSubmitting(true);
    try {
      // Use FormData so we can include photo attachments for Web3Forms.
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_ACCESS_KEY);
      fd.append("subject", `New Review from ${form.name || "Anonymous"} — Fallot Correction Studio`);
      fd.append("from_name", "Fallot Studio Reviews");
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("social", `@${form.social} — https://instagram.com/${form.social}`);
      fd.append("rating", `${form.rating} / 5`);
      fd.append("project", form.project);
      fd.append("felt", form.felt);
      fd.append("appreciated", form.appreciated);
      fd.append("recommend", form.recommend);
      fd.append("comments", form.comments);
      photos.forEach((file, i) => {
        fd.append(`photo_${i + 1}`, file, file.name);
      });
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        recordSubmission();
        previews.forEach((url) => URL.revokeObjectURL(url));
        setPhotos([]);
        setPreviews([]);
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
          Instagram handle <span className="text-accent">*</span>
        </label>
        <div className="flex items-center border-b border-border focus-within:border-accent transition-colors">
          <span className="text-muted-foreground font-body pr-1 select-none">@</span>
          <input
            type="text"
            required
            value={form.social}
            onChange={(e) =>
              update("social", e.target.value.replace(/^@+/, "").trim())
            }
            placeholder="your_instagram_handle"
            className="w-full bg-transparent outline-none py-3 text-foreground placeholder:text-muted-foreground/60 font-body"
          />
        </div>
        <p className="text-xs text-muted-foreground/70 mt-2 font-body italic">
          Just your handle — no need for the full link. Required so the studio can verify the review is from a real person.
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

      {/* Photo upload */}
      <div>
        <label className={labelClasses}>
          Photos (optional) — up to {MAX_PHOTOS}, max {MAX_PHOTO_SIZE_MB}MB each
        </label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {previews.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square border border-border overflow-hidden group"
            >
              <img
                src={src}
                alt={`Upload preview ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label="Remove photo"
                className="absolute top-1.5 right-1.5 bg-background/90 border border-border p-1 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.4} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label
              className="aspect-square flex flex-col items-center justify-center gap-2 border border-dashed border-border hover:border-accent text-muted-foreground hover:text-accent cursor-pointer transition-colors text-caption text-center px-2"
            >
              <ImagePlus className="w-6 h-6" strokeWidth={1.2} />
              <span>Add photo</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
                capture="environment"
                multiple={MAX_PHOTOS - photos.length > 1}
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-2 font-body italic">
          JPG, PNG, WEBP or HEIC. Share the garment in its full glory — fitting room, event day, or close-up detail.
        </p>
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
