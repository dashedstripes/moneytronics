import type { Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"

export default async (req: Request, context: Context) => {
  const auth = req.headers.get('Authorization');
  const jwt = auth?.split('Bearer ')[1];

  // TODO: validate JWT, no idea how to do this yet
  if (!jwt) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { email } = await req.json();

  const store = getStore('language');
  const language = await store.get(email);

  return new Response(language);
}