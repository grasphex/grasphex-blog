// app/blog/[slug]/page.tsx

import { getSinglePost } from '../../../lib/getSinglePost';
import { getSortedPostsData } from '../../../lib/getPosts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

// ✅ 型を next の PageProps に準拠させる
interface PageProps {
  params: {
    slug: string;
  };
}

// ✅ generateStaticParams（これは問題なし）
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ page 関数の引数に PageProps を明示的に指定
export default async function PostPage({ params }: PageProps) {
  const post = getSinglePost(params.slug);
  if (!post) return notFound();

  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
