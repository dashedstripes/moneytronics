import { Post } from "./post";
import fs from "fs";
import path from "path";


export const getTestPosts = async (): Promise<Post[]> => {
  const postsDir = path.join(process.cwd(), 'backend', 'posts');
  const postFiles = fs.readdirSync(postsDir);

  const posts = postFiles.map((postFile: string, index: number) => {
    const postPath = path.join(postsDir, postFile);
    const postContent = fs.readFileSync(postPath, 'utf8');

    const title = postContent.split('\n')[0].replace('#', '').trim();
    const content = postContent.split('\n').slice(1).join('\n');

    return {
      id: index,
      title,
      slug: postFile.replace('.md', ''),
      content: content,
    };
  });

  return posts;
};

export async function getPosts(
  params: { 
    source: string,
    locale: string,
  }): Promise<Post[]> {
  switch(params.source) {
    case "test":
      return getTestPosts();
    default:
      return [];
  }
}