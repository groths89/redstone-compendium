// worker.ts
import serverless from 'serverless-http';
import { app } from './api/src/app';

// Import Astro's built worker bundle generated during `astro build`
// @ts-ignore
import astroHandler from './web/dist/_worker.js/index.js';

// Wrap the standalone Express app
const expressHandler: any = serverless(app);

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Route all /api requests to Express
    if (url.pathname.startsWith('/api')) {
      return expressHandler(request, env, ctx) as any;
    }

    // Route all page/asset requests to Astro
    return astroHandler.fetch(request, env, ctx);
  }
};