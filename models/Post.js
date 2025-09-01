import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

// Reference to the "posts" collection in Firestore
const postCollection = collection(db, "posts");

// Fetch all posts
export async function getAllPosts() {
  const snapshot = await getDocs(postCollection);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

// Fetch a post by Firestore document ID
export async function getPostById(id) {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Fetch a post by slug (since you want unique slugs)
export async function getPostBySlug(slug) {
  const q = query(postCollection, where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

// Add a new post
export async function addPost(postData) {
  const docRef = await addDoc(postCollection, {
    ...postData,
    publishedAt: postData.publishedAt || new Date() // set default date if not provided
  });
  return docRef.id;
}

// Update an existing post
export async function updatePost(id, updatedData) {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, updatedData);
}

// Delete a post
export async function deletePost(id) {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
}
