import "./globals.css";

export const metadata = {
  title: "Nivethitha • Portfolio",
  description: "Web Developer, Designer & Data Analyst",
  openGraph: {
    title: "Nivethitha • Portfolio",
    description: "Web Developer, Designer & Data Analyst",
    type: "website",
  },
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
