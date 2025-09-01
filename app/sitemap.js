import { connectDB } from "@/lib/firebase";
import Post from "@/models/Post";

export default async function sitemap() {
  const base = process.env.SITE_URL || "http://localhost:3000";
  try {
    await connectDB();
    const posts = await Post.find({}, "slug").lean();
    const postUrls = posts.map(p => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6
    }));
    return [
      { url: `${base}/`, lastModified: new Date(), priority: 1 },
      { url: `${base}/projects`, lastModified: new Date(), priority: 0.8 },
      { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
      { url: `${base}/about`, lastModified: new Date(), priority: 0.5 },
      { url: `${base}/contact`, lastModified: new Date(), priority: 0.5 },
      ...postUrls
    ];
  } catch {
    return [
      { url: `${base}/`, lastModified: new Date() }
    ];
  }
}
