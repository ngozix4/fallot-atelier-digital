import reviewsData from "@/data/reviews.json";

export interface Review {
  id: string;
  name: string;
  socialHandle?: string;
  socialUrl: string;
  rating: 1 | 2 | 3 | 4 | 5;
  project: string;
  felt: string;
  appreciated: string;
  recommend: string;
  comments?: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = (reviewsData.reviews as Review[])
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const approvedReviews = reviews;

export const formatReviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
