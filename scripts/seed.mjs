import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to your Firebase private key JSON
const serviceAccountPath = path.join(__dirname, "..", "firebase-key.json");
if (!fs.existsSync(serviceAccountPath)) {
  console.error("Missing firebase-key.json. Download from Firebase Console and place in project root.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Demo data
const projects = [
  {
    title: "Crop Yield Prediction",
    description: "Web app that predicts best crops based on soil and weather data.",
    link: "https://your-crop-app.com",
    repo: "https://github.com/your-username/crop-yield-prediction",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    tags: ["python", "machine-learning", "flask"],
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce website with authentication and admin panel.",
    link: "https://your-ecommerce-site.com",
    repo: "https://github.com/your-username/ecommerce-app",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop",
    tags: ["react", "nodejs", "mysql"],
  },
  {
    title: "Traffic Management System",
    description: "Real-time traffic monitoring and automated signal control.",
    link: "https://your-traffic-app.com",
    repo: "https://github.com/your-username/traffic-system",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop",
    tags: ["java", "mysql"],
  },
];

const posts = [
  {
    title: "Why I moved to Next.js",
    slug: "why-i-moved-to-nextjs",
    excerpt: "SEO, speed, and fullstack routing made me switch.",
    content: "In this post, I explain why Next.js became my default...",
    tags: ["nextjs", "career"],
  },
  {
    title: "MongoDB tips for portfolios",
    slug: "mongodb-tips-for-portfolios",
    excerpt: "Simple patterns to store projects and posts.",
    content: "Keep schemas small, index slugs, and avoid over-normalization...",
    tags: ["mongodb"],
  },
];

// Seed function
async function seed() {
  try {
    console.log("Deleting old data...");

    // Delete existing projects and posts
    const projectsSnap = await db.collection("projects").get();
    projectsSnap.forEach((doc) => doc.ref.delete());

    const postsSnap = await db.collection("posts").get();
    postsSnap.forEach((doc) => doc.ref.delete());

    console.log("Adding new projects...");
    for (const project of projects) {
      await db.collection("projects").add(project);
    }

    console.log("Adding new posts...");
    for (const post of posts) {
      await db.collection("posts").add(post);
    }

    console.log("Firebase seed completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding Firebase:", err);
    process.exit(1);
  }
}

seed();
