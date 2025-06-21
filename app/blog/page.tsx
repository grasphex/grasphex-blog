import Link from "next/link";

const dummyPosts = [
  { slug: "post-1", title: "最初の記事" },
  { slug: "post-2", title: "2番目の記事" },
];

export default function BlogListPage() {
  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
