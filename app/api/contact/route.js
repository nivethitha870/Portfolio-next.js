import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { z } from "zod";

// validate incoming request
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(req) {
  try {
    const data = await req.json();

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "contacts"), {
      ...parsed.data,
      createdAt: serverTimestamp(),
    });

    return Response.json({ success: true, id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
