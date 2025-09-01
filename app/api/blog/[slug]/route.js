import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(_req, { params }) {
  const q = query(collection(db, "posts"), where("slug", "==", params.slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return new Response("Not found", { status: 404 });
  const doc = snapshot.docs[0];
  return Response.json({ id: doc.id, ...doc.data() });
}
