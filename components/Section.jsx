export default function Section({ title, subtitle, children, id }) {
  return (
    <section id={id} className="container my-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
