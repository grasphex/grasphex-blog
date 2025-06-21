import { getPostData } from '@/lib/getSinglePost';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const postsDirectory = path.join(process.cwd(), 'posts');

// ✅ 静的パス生成
export async function generateStaticParams() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// ✅ ページ本体（params を明示的に展開）
export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);

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
