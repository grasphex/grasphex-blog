// app/page.tsx

import Link from 'next/link';
import { getSortedPostsData } from '@/lib/getPosts';

export default function BlogListPage() {
  const posts = getSortedPostsData();

  return (
    <main className="bg-white text-gray-900 min-h-screen px-6 py-12">
      <h1 className="text-5xl font-bold tracking-wide mb-10 border-b pb-4 text-center">
        Grasphex Blog
      </h1>
      <ul className="space-y-10 max-w-3xl mx-auto">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <p className="text-sm text-gray-500 tracking-widest uppercase">
              {post.date}
            </p>
            <h2 className="text-2xl font-semibold mt-2">{post.title}</h2>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-gray-700 hover:underline"
            >
              → Read more
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
