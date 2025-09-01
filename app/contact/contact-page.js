"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

async function submit(e) {
  e.preventDefault();

  // Optional: Basic client-side validation
  if (!form.name || !form.email || !form.message) {
    setStatus("Please fill in all required fields.");
    return;
  }

  setStatus("Sending...");
  
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Thanks! I'll get back to you soon.");
      // Optionally reset the form
      setForm({ name: "", email: "", message: "" });
    } else {
      const errorData = await res.json();
      setStatus(errorData.message || "Please check your inputs and try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    setStatus("Something went wrong. Please try again later.");
  }
}


  return (
    <>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl font-semibold mb-4">Contact</h1>
        <form onSubmit={submit} className="card p-6 grid gap-3 max-w-xl">
          <input
            className="bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="bg-zinc-900 border border-zinc-700 rounded-lg p-3"
            rows="5"
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button className="btn" type="submit">Send</button>
          {status && <p className="text-sm text-zinc-400">{status}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
