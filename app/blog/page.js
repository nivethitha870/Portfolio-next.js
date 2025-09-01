"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-400 mt-2">{post.content}</p>
              {post.tags && (
                <p className="text-sm text-gray-500 mt-2">
                  Tags: {post.tags.join(", ")}
                </p>
              )}
              {post.date && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.date).toDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
