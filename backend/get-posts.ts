import { Post, testPosts } from "./post";


export const getTestPosts = async (): Promise<Post[]> => {
  return testPosts;
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