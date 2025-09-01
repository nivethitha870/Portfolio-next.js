"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-zinc-800/60">
      <nav className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-lg">
          <span className="grad">Nivethitha</span>
        </Link>
        <ul className="flex gap-1">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`px-3 py-2 rounded-lg hover:bg-zinc-800/50 ${path === it.href ? "bg-zinc-800/60" : ""}`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
