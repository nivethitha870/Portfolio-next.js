"use client";  

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl font-semibold mb-4">Blog</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(p => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
