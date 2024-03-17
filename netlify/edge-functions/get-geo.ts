import { Context } from '@netlify/edge-functions'

export default async (request: Request, context: Context) => {
  const language: {[key: string]: string} = {
    US: "en-us",
    GB: "en-gb",
    ES: "es-es",
  };

  const countryCode = context.geo?.country?.code || 'US';

  return new Response(language[countryCode], {
    headers: { "content-type": "text/html" },
  });
};

export const config = { path: "/get-geo" };