import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import Artwork from "../models/Artwork.js";

const SEED_ARTWORKS = [
  {
    id: "silence-01",
    title: "Silence I",
    medium: "charcoal",
    year: 2024,
    dimensions: '24" × 30"',
    price: 1200,
    image: "https://picsum.photos/seed/silence-01/800/800",
    imagePublicId: "placeholder-silence-01",
    description: "A study in stillness. Charcoal on archival paper, capturing a moment between breaths."
  },
  {
    id: "weathered-02",
    title: "Weathered",
    medium: "charcoal",
    year: 2024,
    dimensions: '20" × 24"',
    price: 1450,
    image: "https://picsum.photos/seed/weathered-02/800/800",
    imagePublicId: "placeholder-weathered-02",
    description: "Lines that time has drawn. A portrait of patience."
  },
  {
    id: "rupture-01",
    title: "Rupture",
    medium: "paintings",
    year: 2025,
    dimensions: '36" × 36"',
    price: 2800,
    image: "https://picsum.photos/seed/rupture-01/800/800",
    imagePublicId: "placeholder-rupture-01",
    description: "Oil on canvas. The collision of shadow and form."
  },
  {
    id: "descent-02",
    title: "Descent",
    medium: "paintings",
    year: 2025,
    dimensions: '40" × 48"',
    price: 3400,
    image: "https://picsum.photos/seed/descent-02/800/800",
    imagePublicId: "placeholder-descent-02",
    description: "Ink and oil, gravity made visible."
  },
  {
    id: "reach-01",
    title: "Reach",
    medium: "sketches",
    year: 2024,
    dimensions: '12" × 16"',
    price: 480,
    image: "https://picsum.photos/seed/reach-01/800/800",
    imagePublicId: "placeholder-reach-01",
    description: "Graphite study. The hand as language."
  },
  {
    id: "figure-02",
    title: "Figure in Motion",
    medium: "sketches",
    year: 2024,
    dimensions: '11" × 14"',
    price: 420,
    image: "https://picsum.photos/seed/figure-02/800/800",
    imagePublicId: "placeholder-figure-02",
    description: "Gestural ink. Drawn in a single sitting."
  }
];

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("Seeding default admin user...");
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash("ravitej", salt);
      
      const defaultAdmin = new Admin({
        username: "ravitej",
        passwordHash
      });
      await defaultAdmin.save();
      console.log("Admin seeded (username: 'ravitej', password: 'ravitej')");
    }

    // 2. Seed Artworks
    const artworkCount = await Artwork.countDocuments();
    if (artworkCount === 0) {
      console.log("Seeding initial artwork collection...");
      await Artwork.insertMany(SEED_ARTWORKS);
      console.log(`Seeded ${SEED_ARTWORKS.length} artworks`);
    } else {
      console.log("Artworks collection already has entries. Skipping seed.");
    }
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
};
export default seedDatabase;
