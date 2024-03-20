import { getPosts } from '@/backend/get-posts';
import BlogPage from '../components/BlogPage';

export default async function Page() {
  const posts = await getPosts({
    source: "test",
    locale: "en-US",
  });
  
  return <BlogPage posts={posts}/>;
}