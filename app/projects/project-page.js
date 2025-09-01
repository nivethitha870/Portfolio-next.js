"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetch(`/api/projects${tag ? `?tag=${tag}` : ""}`)
      .then((r) => r.json())
      .then(setProjects);
  }, [tag]);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <select
            className="bg-zinc-900 border border-zinc-700 rounded-lg p-2"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">All tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div><p>Hellojghgdgff</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p._id} p={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
