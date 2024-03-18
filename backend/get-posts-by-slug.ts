import { getTestPosts } from "./get-posts";
import { Post } from "./post";

async function getTestPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getTestPosts();
  const post = posts.filter((post) => post.slug === slug)[0];
  return post || null;
}
export async function getPostBySlug(
  params: { 
    source: string,
    locale: string,
    slug: string,
  }): Promise<Post | null> {
  switch(params.source) {
    case "test":
      return getTestPostBySlug(params.slug);
    default:
      return null;
  }
}