// lib/getPosts.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    // 日付チェック（ISO形式である前提）
    if (!data.date || isNaN(Date.parse(data.date))) {
      throw new Error(
        `Error in "${fileName}": Missing or invalid 'date' in frontmatter.`
      );
    }

    // タイトルがない場合は slug を代用
    const title = data.title || slug;

    return {
      slug,
      title,
      date: data.date,
    };
  });

  // 日付で降順（新しい順）にソート
  return allPostsData.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
}
