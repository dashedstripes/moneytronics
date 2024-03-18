import React from 'react';
import { Post } from '../../backend/post';
import { getPosts } from '../../backend/get-posts';
import Nav from '@/components/Nav';
import Link from 'next/link';

export default function Posts({ posts }: { posts: Post[] }) {

  return (
    <main className="container mx-auto px-8">
      <Nav/>
      <div className="grid grid-cols-2">
      <h1 className='font-bold text-4xl'>blog</h1>
      <div>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.slug}`}>
          <h2 className='font-bold text-2xl mb-10'>{post.title}</h2>
        </Link>
      ))}
      </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const posts = await getPosts({
    source: "test",
    locale: context.locale,
  });

  context.res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  return {
    props: {
      posts: posts || [],
    },
  };
}