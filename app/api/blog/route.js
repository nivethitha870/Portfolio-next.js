import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return Response.json(posts);
}

export async function POST(req) {
  const body = await req.json();
  const data = { ...body, publishedAt: serverTimestamp() };
  const docRef = await addDoc(collection(db, "posts"), data);
  return Response.json({ id: docRef.id, ...data }, { status: 201 });
}
