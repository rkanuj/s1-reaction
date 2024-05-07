import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';

const router = OpenAPIRouter({
  docs_url: '/',
});

// 404 for everything else
router.all('*', () =>
  Response.json(
    {
      success: false,
      error: 'Route not found',
    },
    { status: 404 },
  ),
);

// noinspection JSUnusedGlobalSymbols
export default {
  fetch: router.handle,
} as {
  fetch: any
};
