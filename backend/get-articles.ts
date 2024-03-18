import { Article, testArticles } from "./article";


export const getTestArticles = async (): Promise<Article[]> => {
  return testArticles;
};

export async function getArticles(
  params: { 
    source: string,
    locale: string,
  }): Promise<Article[]> {
  switch(params.source) {
    case "test":
      return getTestArticles();
    default:
      return [];
  }
}