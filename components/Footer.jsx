export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800/60">
      <div className="container py-8 text-sm text-zinc-400 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p>© {new Date().getFullYear()} Nivethitha. All rights reserved.</p>
        <div className="flex gap-4">
          <a href=" https://github.com/nivethitha870" className="hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/nivethitha-p-4a3772290" className="hover:text-white">LinkedIn</a>
          <a href="mailto:nivethitha507@gmail.com" className="hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
