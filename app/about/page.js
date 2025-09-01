import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About • Nivethitha"
};

export default function About() {
  return (
    <>
      <Navbar />
      <main className="container py-12">
        <h1 className="text-3xl md:text-4xl font-semibold">About Me</h1>
        <p className="mt-4 text-zinc-300 max-w-3xl">
          I’m a passionate about building clean and user-friendly digital experiences.
          Skilled in coding, design, and data analysis, I bring creativity and problem-solving into every project.
          I enjoy crafting impactful solutions that blend technology with innovation.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card p-6">
            <h2 className="font-semibold text-xl">Skills</h2>
            <ul className="mt-3 space-y-2 text-zinc-300">
              <li>Python</li>
              <li>Html,css,Javascript</li>
              <li>Graphic designer</li>
              <li>Data & ML fundamentals</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-xl">Highlights</h2>
            <ul className="mt-3 space-y-2 text-zinc-300 list-disc list-inside">
              <li>Built 3+ projects</li>
              <li>Mentored juniors on fullstack</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
