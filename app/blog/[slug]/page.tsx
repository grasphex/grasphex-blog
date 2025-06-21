// app/blog/[slug]/page.tsx

import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Metadata } from 'next';

// ✅ Markdownファイルのあるディレクトリ
const postsDirectory = path.join(process.cwd(), 'posts');

// ✅ 動的ルーティング用の静的パス生成
export async function generateStaticParams() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// ✅ ページコンポーネント（正しい型付け）
type Props = {
  params: { slug: string };
};

export default async function BlogPost({ params }: Props) {
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
