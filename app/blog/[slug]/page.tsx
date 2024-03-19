import { getPostBySlug } from "@/backend/get-posts-by-slug";
import PostPage from "@/components/PostPage";

export default async function Page(context: any) {
  const { slug } = context.params;

  const post = await getPostBySlug({
    source: "test",
    locale: "en-US",
    slug,
  });

  if(!post) {
    return {
      notFound: true,
    }
  }

  return <PostPage post={post}/>
}