// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const postsDirectory = path.join(process.cwd(), 'posts');

// ✅ 静的パス生成
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// ✅ ページコンポーネント
type BlogPostProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPostData(params.slug);

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
