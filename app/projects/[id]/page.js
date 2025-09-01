import { db } from "@/lib/firebase";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";

export async function generateMetadata({ params }) {
  const { id } = params;
  const docRef = doc(db, "projects", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return { title: "Project • Not found" };
  const p = { id: snap.id, ...snap.data() };
  return { title: `${p.title} • Project` };
}

export default async function ProjectPage({ params }) {
  const docRef = doc(db, "projects", params.id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    return (
      <>
        <Navbar />
        <main className="container py-10">Project not found</main>
        <Footer />
      </>
    );
  }
  const p = { id: snap.id, ...snap.data() };
  return (
    <>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">{p.title}</h1>
        <div className="mt-4">{p.description}</div>
        <div className="mt-4">
          {p.link && <a className="btn" href={p.link} target="_blank">Live ↗</a>}
          {p.repo && <a className="btn" href={p.repo} target="_blank">Code ↗</a>}
          <Link className="btn" href="/projects">← Back</Link>
        </div>
        {p.tags?.length ? (
          <div className="mt-4 text-sm text-zinc-400">Tags: {p.tags.join(", ")}</div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
