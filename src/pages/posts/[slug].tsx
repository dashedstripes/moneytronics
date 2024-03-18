import Nav from '@/components/Nav';
import { getPostBySlug } from '../../../backend/get-posts-by-slug';
import { Post } from '../../../backend/post';
import Markdown from 'react-markdown';

export default function PostPage({ post }: { post: Post }) {
  return (
    <main className="container mx-auto px-8">
      <Nav />
      
      <div className='mx-auto max-w-[65ch] py-8'>
        <article className="prose">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const { locale } = context;

  const post = await getPostBySlug({
    source: "test",
    locale,
    slug,
  });

  return {
    props: {
      post,
    }
  }
}