import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <article className="card p-4">
      <h3 className="text-xl font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="text-zinc-400 mt-1">{post.excerpt}</p>
      <div className="text-xs text-zinc-500 mt-2">
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        {post.tags?.length ? <span> • {post.tags.join(", ")}</span> : null}
      </div>
    </article>
  );
}
