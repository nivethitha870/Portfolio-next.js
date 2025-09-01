import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function generateMetadata({ params }) {
  const q = query(collection(db, "posts"), where("slug", "==", params.slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return { title: "Post • Not found" };
  const doc = snapshot.docs[0];
  const post = { id: doc.id, ...doc.data() };
  return { title: `${post.title} • Blog` };
}

export default async function PostPage({ params }) {
  const q = query(collection(db, "posts"), where("slug", "==", params.slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return (
    <>
      <Navbar /><main className="container py-10">Post not found</main><Footer />
    </>
  );
  const doc = snapshot.docs[0];
  const post = { id: doc.id, ...doc.data() };
  return (
    <>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">{post.title}</h1>
        <div className="text-sm text-zinc-500 mt-1">
          {post.publishedAt && new Date(post.publishedAt.seconds * 1000).toLocaleDateString()} • {post.tags?.join(", ")}
        </div>
        <article className="prose prose-invert max-w-none mt-6">
          <p>{post.content}</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
