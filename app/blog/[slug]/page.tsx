// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
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

// generateStaticParams も型注釈が必要
export async function generateStaticParams(): Promise<
  { slug: string }[]
> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}
