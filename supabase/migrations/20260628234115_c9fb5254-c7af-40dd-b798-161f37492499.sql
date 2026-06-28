
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  social_handle TEXT NOT NULL,
  social_url TEXT,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  project TEXT NOT NULL,
  felt TEXT NOT NULL,
  appreciated TEXT NOT NULL,
  recommend TEXT NOT NULL,
  comments TEXT,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a review (status forced to pending via trigger)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');

-- Anyone can read APPROVED reviews only
CREATE POLICY "Anyone can read approved reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Storage policies for review-photos bucket: anyone can upload, anyone can read
CREATE POLICY "Anyone can upload review photos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "Anyone can view review photos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'review-photos');
