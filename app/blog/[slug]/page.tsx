// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';

// ✅ generateStaticParams を最初に export（重要）
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) return notFound();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {post.content}
      </ReactMarkdown>
    </div>
  );
}
