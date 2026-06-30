import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  url: string;
  name: string;
  handle?: string;
  project: string;
}

const AUTOPLAY_MS = 4500;

const Clients = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("name, social_handle, project, photo_urls")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error || !data) {
        setLoading(false);
        return;
      }

      const flat: { path: string; name: string; handle?: string; project: string }[] = [];
      data.forEach((r) => {
        (r.photo_urls ?? []).forEach((p: string) =>
          flat.push({ path: p, name: r.name, handle: r.social_handle ?? undefined, project: r.project })
        );
      });

      if (flat.length === 0) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data: signed } = await supabase.storage
        .from("review-photos")
        .createSignedUrls(flat.map((f) => f.path), 60 * 60 * 24 * 365);

      const built: GalleryItem[] = [];
      (signed ?? []).forEach((s, i) => {
        if (s.signedUrl) {
          built.push({
            url: s.signedUrl,
            name: flat[i].name,
            handle: flat[i].handle,
            project: flat[i].project,
          });
        }
      });

      if (!cancelled) {
        setItems(built);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const total = items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (total === 0) return;
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    };
    const el = document.getElementById("coverflow-stage");
    if (!el) return;
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  // Compute a relative position for each item (-2,-1,0,1,2) wrapping around
  const visibleRange = 2;
  const positioned = items
    .map((item, i) => {
      let rel = i - index;
      if (rel > total / 2) rel -= total;
      if (rel < -total / 2) rel += total;
      return { item, rel, i };
    })
    .filter((p) => Math.abs(p.rel) <= visibleRange);

  const active = items[index];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-8 md:pt-44 md:pb-12">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-caption text-accent mb-6">WORN BY</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="heading-display text-foreground mb-8 italic">Our Clients</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="heartbeat-divider" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-editorial text-muted-foreground">
              A floating gallery of photographs shared by the people who have lived in the work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Coverflow */}
      <section className="pb-24 md:pb-36">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading gallery…</div>
        ) : total === 0 ? (
          <div className="container mx-auto px-6 max-w-xl text-center py-20">
            <Camera className="w-10 h-10 text-accent/60 mx-auto mb-6" strokeWidth={1.2} />
            <h2 className="heading-subsection text-foreground mb-4 italic">No photographs yet</h2>
            <p className="text-editorial text-muted-foreground">
              When clients share photos with their reviews, they will appear here in a rotating gallery.
            </p>
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Stage */}
            <div
              id="coverflow-stage"
              className="relative mx-auto h-[460px] sm:h-[520px] md:h-[600px] w-full max-w-5xl"
              style={{ perspective: "1400px" }}
            >
              <div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {positioned.map(({ item, rel, i }) => {
                  const abs = Math.abs(rel);
                  const translateX = rel * 38; // % of stage width
                  const rotateY = rel === 0 ? 0 : rel > 0 ? -38 : 38;
                  const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58;
                  const zIndex = 50 - abs;
                  const opacity = abs > 2 ? 0 : abs === 2 ? 0.35 : abs === 1 ? 0.7 : 1;

                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`View photo ${i + 1} of ${total}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
                      animate={{
                        x: `calc(-50% + ${translateX}%)`,
                        rotateY,
                        scale,
                        opacity,
                      }}
                      transition={{ type: "spring", stiffness: 110, damping: 22 }}
                      style={{ zIndex, transformStyle: "preserve-3d" }}
                    >
                      <div
                        className={`relative w-[62vw] max-w-[300px] sm:w-[280px] md:w-[340px] aspect-[3/4] overflow-hidden border bg-card ${
                          rel === 0 ? "border-accent shadow-[0_30px_80px_-20px_hsl(var(--accent)/0.45)]" : "border-accent/15"
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={`${item.name} — ${item.project}`}
                          loading="lazy"
                          draggable={false}
                          className="w-full h-full object-cover select-none"
                        />
                        {rel !== 0 && (
                          <div className="absolute inset-0 bg-background/40" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Arrows */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[60] p-3 border border-accent/30 bg-background/70 backdrop-blur text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[60] p-3 border border-accent/30 bg-background/70 backdrop-blur text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" strokeWidth={1.4} />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="container mx-auto px-6 max-w-xl text-center mt-8 md:mt-10 min-h-[60px]">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="font-heading italic text-xl md:text-2xl text-accent">{active.name}</p>
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mt-2">
                      {active.project}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dots */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 transition-all duration-300 ${
                      i === index ? "w-8 bg-accent" : "w-1.5 bg-accent/30 hover:bg-accent/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Clients;