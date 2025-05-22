import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 */
let cachedArticles: any[] = [];
let lastFetch = 0;
const GNEWS_URL = 'https://gnews.io/api/v4/top-headlines?category=entertainment&lang=pt&country=br&max=10&apikey=eb46cc543e94637864fa83e7c54f4e6b';

// Função para buscar e atualizar artigos do GNews
async function fetchAndCacheArticles() {
  try {
    const res = await axios.get(GNEWS_URL);
    if (res.data && Array.isArray(res.data.articles)) {
      cachedArticles = res.data.articles;
      lastFetch = Date.now();
      console.log(`[GNews] Artigos atualizados: ${cachedArticles.length}`);
    }
  } catch (err) {
    console.error('[GNews] Falha ao buscar artigos:', err);
  }
}

// Atualiza ao iniciar e a cada 1 hora
fetchAndCacheArticles();
setInterval(fetchAndCacheArticles, 60 * 60 * 1000);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Rota para obter todos os artigos
 */
app.get('/api/articles', (req, res) => {
  res.json({ articles: cachedArticles });
});

/**
 * Rota para busca local nos artigos já armazenados
 */
app.get('/api/articles/search', (req, res) => {
  const q = (req.query['q'] as string || '').toLowerCase();
  if (!q) return res.json({ articles: cachedArticles });
  const filtered = cachedArticles.filter(article =>
    article.title?.toLowerCase().includes(q) ||
    article.description?.toLowerCase().includes(q) ||
    article.content?.toLowerCase().includes(q)
  );
  res.json({ articles: filtered });
  return;
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
