"use client"

import { Post } from '@/backend/post';
import Markdown from 'react-markdown';
import Nav from './Nav';

export default function PostPage({ post }: { post: Post }) {
  return (
    <main>
      <div className="container mx-auto px-8">
        <Nav />
      </div>
      
      <h1 className="py-32 text-center bg-cover font-bold text-3xl text-white" style={{ backgroundImage: `url(/.netlify/images?url=/images/${post.slug}.jpg&fit=cover&w=2000&h=400)` }}>
        {post.title}
      </h1>

      <div className='mx-auto max-w-[65ch] p-8'>
        <article className="prose">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </main>
  );
}