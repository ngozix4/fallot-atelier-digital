import isdwadloRedTrack from "@/assets/Isdwadlo-Fashion-Show-Red-TrackSuit.jpeg";
import isdwadloRedPants from "@/assets/Isdwadlo-Red-Pants-Yellow-Jacket.jpeg";
import isdwadloMen1 from "@/assets/isdwadlo_men_tracksuit1.jpg";
import isdwadloMen2 from "@/assets/isdwadlo_men_tracksuit2.jpg";
import isdwadloMen3 from "@/assets/isdwadlo_men_tracksuit3.jpg";
import isdwadloMen4 from "@/assets/isdwadlo_men_tracksuit4.jpg";
import isdwadloMen5 from "@/assets/isdwadlo_men_tracksuit5.jpg";
import sewAfricaAward from "@/assets/SewAfrica-Getting-An-Award.jpeg";
import sewAfricaCert from "@/assets/SewAfrica-Certificate-Of-Completion.jpeg";
import sewAfricaChineseHero from "@/assets/sewafrica-chinese-dress.png";
import sewAfricaChinese1 from "@/assets/sewafrica-fahionshow-chinese-dress1.jpg";
import sewAfricaChinese2 from "@/assets/sewafrica-fashionshow-chinese-dress2.jpg";
import sewAfricaCert2 from "@/assets/sewafrica-fashion-getting-a-certificate.jpg";
import sewAfricaAward2 from "@/assets/sewafrica-fashionshow-getting-an-awtad.jpg";
import sewAfricaShow from "@/assets/sewafrica-fashionshow.jpg";

import fallotStudioDress from "@/assets/fallot-correction-studio-dress.png";
import fallotOrange1 from "@/assets/fallot-correct-orange-dress1.jpg";
import fallotOrange2 from "@/assets/fallot-correct-orange-dress2.jpg";
import fallotOrange3 from "@/assets/fallot-correction-orange-dress3.jpg";
import fallotOrange4 from "@/assets/fallot-correction-orange-dress4.jpg";
import fallotOrange5 from "@/assets/fallot-correction-orange-dress5.jpg";
import fallotRed from "@/assets/fallot-correction-red-dress.jpg";
import fallotRed1 from "@/assets/fallot-correction-red-dress1.jpg";
import fallotRed3 from "@/assets/fallot-correction-red-dress3.jpg";
import fallotRed4 from "@/assets/fallot-correction-red-dress4.jpg";
import fallotRed5 from "@/assets/fallot-correction-red-dress5.jpg";
import fallotRed6 from "@/assets/fallot-correction-red-dress6.jpg";
import fallotRed7 from "@/assets/fallot-correction-red-dress7.jpg";
import fallotRed8 from "@/assets/fallot-correction-red-dress8.jpg";
import fallotStarsAwards from "@/assets/fallot-correction-dress-for-a-start-at-awards.jpg";
import fallotTrad from "@/assets/fallot-correction-traditional-dress.jpg";
import fallotTrad2 from "@/assets/fallot-correction-traditional-dress2.jpg";
import fallotTrad33 from "@/assets/fallot-correction-traditional-dress33.jpg";
import fallotTrad4 from "@/assets/fallot-correction-traditional-dress4.jpg";
import fallotTrad5 from "@/assets/fallot-correction-traditional-dress5.jpg";
import fallotTrad6 from "@/assets/fallot-correction-traditional-dress6.jpg";
import fallotTrad7 from "@/assets/fallot-correction-traditional-dress7.jpg";

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  collaborators: string;
  description: string;
  narrativeTitle?: string;
  narrativeHighlight?: string;
  image?: string;
  gallery?: string[];
  instagramHandle?: string;
  instagramUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "isdwadlo",
    title: "Isdwadlo Collective",
    year: "2021",
    role: "Co-Founder & Designer",
    collaborators: "Isdwadlo Team",
    description: "A Johannesburg-based streetwear collective born from defiance and brotherhood. We took the language of the street and rewrote it with intention — proving that luxury could speak in a township accent without ever losing its weight.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Rebellion",
    image: isdwadloRedTrack,
    gallery: [isdwadloRedTrack, isdwadloRedPants],
  },
  {
    slug: "sew-africa",
    title: "Sew Africa",
    year: "2019",
    role: "Designer & Award Recipient",
    collaborators: "Sew Africa",
    description: "Two consecutive years as Student of the Year — not as accolade, but as confirmation. This was where discipline took root, where the needle became an extension of thought, and where the foundations of every garment that followed were quietly laid.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Foundation",
    image: sewAfricaAward,
    gallery: [
      sewAfricaAward,
      sewAfricaAward2,
      sewAfricaCert,
      sewAfricaCert2,
      sewAfricaShow,
      sewAfricaChinese1,
      sewAfricaChinese2,
    ],
  },
  {
    slug: "xvii-victorian",
    title: "XVII Victorian",
    year: "2021",
    role: "Apprentice & Collaborator",
    collaborators: "XVII Victorian, Durban",
    description: "An apprenticeship in the architecture of bridal couture. Beneath the hands of a master, I learned that a wedding gown is not sewn — it is engineered. Patience replaced urgency; structure became a love language.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Devotion",
    instagramHandle: "@xviii_victorian",
    instagramUrl: "https://www.instagram.com/xviii_victorian/",
  },

  {
    slug: "tokelo-laka",
    title: "Tokelo Laka",
    year: "2024",
    role: "Collaborating Designer",
    collaborators: "Tokelo Laka",
    description: "Two voices, one cloth. A collaboration that proved restraint and expression are not opposites — they are partners. Together we shaped pieces that spoke softly but carried the room, garments built on mutual respect for the craft.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Dialogue",
    instagramHandle: "@tokelo_laka",
    instagramUrl: "https://www.instagram.com/tokelo_laka/",
  },
  {
    slug: "netflix-the-poligamy",
    title: "Netflix – The Poligamy",
    year: "2025",
    role: "Costume Designer",
    collaborators: "Darion Hing Productions",
    description: "Costume as character. Every seam carried a backstory, every silhouette a secret. Designing for the screen taught me that a garment can speak before an actor does — and that true craftsmanship knows when to disappear into the role.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Character",
  },
  {
    slug: "fallot-correction-studio-launch",
    title: "Fallot Correction Studio Launch",
    year: "2025",
    role: "Founder & Creative Director",
    collaborators: "Fallot Correction Studio",
    description: "The culmination of a journey — and the beginning of another. A demi-couture and bespoke atelier rooted in structure, faith, gratitude, and strength. Not fashion for attention. Fashion for presence. This is where every lesson, every stitch, every silent hour finally takes form.",
    narrativeTitle: "A Study in",
    narrativeHighlight: "Presence",
    image: fallotStudioDress,
    gallery: [
      fallotStudioDress,
      fallotRed,
      fallotRed1,
      fallotRed3,
      fallotRed4,
      fallotRed5,
      fallotRed6,
      fallotRed7,
      fallotRed8,
      fallotOrange1,
      fallotOrange2,
      fallotOrange3,
      fallotOrange4,
      fallotOrange5,
      fallotStarsAwards,
      fallotTrad,
      fallotTrad2,
      fallotTrad33,
      fallotTrad4,
      fallotTrad5,
      fallotTrad6,
      fallotTrad7,
    ],
  },
];
