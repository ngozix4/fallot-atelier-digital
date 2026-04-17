export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  collaborators: string;
  description: string;
  image?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
  slug: "isdwadlo",
  title: "Isdwadlo Collective",
  year: "2021",
  role: "Co-Founder & Designer",
  collaborators: "Isdwadlo Team",
  description: "A Johannesburg-based streetwear collective that disrupted the scene...",
  image: "/assets/hero-fabric.jpg",
  gallery: [
    "/assets/Isdwadlo-Fashion-Show-Red-TrackSuit.jpeg",
    "/assets/Isdwadlo-Red-Pants-Yellow-Jacket.jpeg"
  ],
  },
  {
  slug: "sew-africa",
  title: "Sew Africa",
  year: "2019",
  role: "Designer & Award Recipient",
  collaborators: "Sew Africa",
  description: "Awarded Student of the Year twice consecutively...",
  image: "../assets/SewAfrica-Getting-An-Award.jpeg",
  gallery: [
    "../assets/SewAfrica-Getting-An-Award.jpeg",
    "../assets/SewAfrica-Certificate-Of-Completion.jpeg"
  ],
},
  {
    slug: "xvii-victorian",
    title: "XVII Victorian",
    year: "2021",
    role: "Apprentice & Collaborator",
    collaborators: "XVII Victorian, Durban",
    description: "Mastering the delicate architecture of wedding gowns and formalwear alongside a master of the craft. Every stitch a lesson in patience, structure, and the art of making fabric breathe.",
  },
 
  {
    slug: "tokelo-laka",
    title: "Tokelo Laka",
    year: "2024",
    role: "Collaborating Designer",
    collaborators: "Tokelo Laka",
    description: "A creative dialogue between two distinct design voices, resulting in pieces that balance raw expression with structural refinement. Fashion as conversation.",
  },
  {
    slug: "netflix-the-poligamy",
    title: "Netflix – The Poligamy",
    year: "2025",
    role: "Costume Designer",
    collaborators: "Darion Hing Productions",
    description: "Bringing technical excellence to the costume department for film. Every garment tells a story within a story — designed to inhabit character, not merely dress it.",
  },
  {
    slug: "fallot-correction-studio-launch",
    title: "Fallot Correction Studio Launch",
    year: "2025",
    role: "Founder & Creative Director",
    collaborators: "Fallot Correction Studio",
    description: "The culmination of a journey. A demi-couture and bespoke atelier rooted in structure, faith, gratitude, and strength. Not fashion for attention — fashion for presence.",
  },
];
