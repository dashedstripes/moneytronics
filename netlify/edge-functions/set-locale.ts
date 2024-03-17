import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {  
  const body = await request.json();
  const locale = body.locale;

  context.cookies.set({
    name: "NEXT_LOCALE",
    value: locale,
  });

  return new Response("Modified locale");
};

export const config = { path: "/set-locale" };