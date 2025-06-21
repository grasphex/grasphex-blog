// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { notFound } from 'next/navigation';

// ✅ 明示的な型を指定
type Params = {
  params: {
    slug: string;
  };
};

export default async function BlogPost({ params }: Params) {
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

// ✅ generateStaticParams にも正しい型注釈を追加
export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));
}
