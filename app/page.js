"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data); 
      });

    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            <span className="grad">NIVETHITHA</span>
          </motion.h1>
          <p className="mt-4 text-lg text-zinc-300 max-w-2xl">
            Web Developer, Designer & Data Analyst
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/projects" className="btn">
              View Projects
            </Link>
            <Link href="/contact" className="btn">
              Contact Me
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <Section title="PROJECTS" subtitle="Recent work that I build.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p._id} p={p} />
            ))}
          </div>
        </Section>

        {/* Blog Section */}
        <Section title="POSTS" subtitle="Notes on engineering, AI, and career.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(0, 4).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="mt-4">
            <Link href="/blog" className="btn">
              Read the blog →
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
