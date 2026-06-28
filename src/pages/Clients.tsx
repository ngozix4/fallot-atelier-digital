import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Camera } from "lucide-react";

interface GalleryItem {
  url: string;
  name: string;
  handle?: string;
  project: string;
}

const Clients = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        .createSignedUrls(
          flat.map((f) => f.path),
          60 * 60 * 24 * 365 // 1 year
        );

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

  // Duplicate items for a seamless infinite marquee.
  const loop = items.length > 0 ? [...items, ...items] : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-44 md:pb-16">
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
              Photographs shared by the people who have lived in the work — from fittings,
              ceremonies, and quiet moments of confidence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 md:pb-36">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading gallery…</div>
        ) : items.length === 0 ? (
          <div className="container mx-auto px-6 max-w-xl text-center py-20">
            <Camera className="w-10 h-10 text-accent/60 mx-auto mb-6" strokeWidth={1.2} />
            <h2 className="heading-subsection text-foreground mb-4 italic">No photographs yet</h2>
            <p className="text-editorial text-muted-foreground">
              When clients share photos with their reviews, they will appear here in a rotating
              gallery.
            </p>
          </div>
        ) : (
          <div
            className="relative overflow-hidden py-6"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex gap-4 md:gap-6 w-max animate-[marquee_60s_linear_infinite]"
              style={{ animationPlayState: "running" }}
            >
              {loop.map((item, i) => (
                <figure
                  key={`${item.url}-${i}`}
                  className="relative w-[70vw] max-w-[340px] md:w-[320px] aspect-[3/4] overflow-hidden border border-accent/20 bg-card group"
                >
                  <img
                    src={item.url}
                    alt={`${item.name} — ${item.project}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-3 md:p-4">
                    <p className="font-heading italic text-sm md:text-base text-accent">
                      {item.name}
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                      {item.project}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Clients;