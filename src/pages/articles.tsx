import React from 'react';
import { Article } from '../../backend/article';
import { getArticles } from '../../backend/get-articles';

export default function Articles({ articles }: { articles: Article[] }) {

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const articles = await getArticles({
    source: "test",
    locale: context.locale,
  });

  context.res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  return {
    props: {
      articles: articles || [],
    },
  };
}