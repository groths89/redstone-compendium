// worker.ts
import { httpServerHandler } from 'cloudflare:node';
import { app } from './api/src/app';

// Import Astro's built worker bundle generated during `astro build`
// @ts-ignore
import astroHandler from './web/dist/server/entry.mjs';

// Serve the Express app through Workers' Node HTTP server compatibility
app.listen(8080);
const expressHandler: any = httpServerHandler({ port: 8080 });

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Route all /api requests to Express
    if (url.pathname.startsWith('/api')) {
      return expressHandler.fetch(request, env, ctx);
    }

    // Route all page/asset requests to Astro
    return astroHandler.fetch(request, env, ctx);
  }
};