"use client";
import Image from "next/image";

export default function ProjectCard({ p }) {
  return (
    <div className="bg-gray-900 text-pink-400 p-6 rounded-xl shadow-lg cursor-pointer text-center transition transform hover:scale-105 hover:bg-gray-800">
      <Image
        src={p.image}
        alt={p.title}
        width={400}
        height={250}
        className="rounded-lg mx-auto mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{p.title}</h2>
      <p className="text-gray-300 text-sm">{p.description}</p>
    </div>
  );
}
