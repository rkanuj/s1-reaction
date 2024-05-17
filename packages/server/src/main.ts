import BanUserOrToken from '@/endpoints/admin/BanUserOrToken';
import QueryUIDByToken from '@/endpoints/admin/QueryUIDByToken';
import QueryPostReacts from '@/endpoints/react/QueryPostReacts';
import QueryUserReacts from '@/endpoints/react/QueryUserReacts';
import UpdatePostReact from '@/endpoints/react/UpdatePostReact';
import GenerateToken from '@/endpoints/token/GenerateToken';
import VerifyToken from '@/endpoints/token/VerifyToken';
import AppEnv, { setupEnv } from '@/env';
import { setupStatement } from '@/services';
import { responseError } from '@/utils';
import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import { cors } from 'itty-router';

const { preflight, corsify } = cors({
  origin: true,
});

const router = OpenAPIRouter({
  docs_url: '/',
});

router.all('*', preflight);

router.post('/admin/banUserOrToken', BanUserOrToken);
router.post('/admin/queryUIDByToken', QueryUIDByToken);
router.post('/token/generate', GenerateToken);
router.post('/token/verify', VerifyToken);
router.post('/react/queryPost', QueryPostReacts);
router.post('/react/queryUser', QueryUserReacts);
router.post('/react/update', UpdatePostReact);

// 404 for everything else
router.all('*', () => {
  return responseError('Route not found', 404);
});

// noinspection JSUnusedGlobalSymbols
export default {
  async fetch(request, env, ctx): Promise<Response> {
    setupEnv(env);
    setupStatement();
    const response: Response = await router.handle(request, ctx);
    response.headers.set('S1-Reaction-App-Version', AppEnv.APP_VERSION);
    return corsify(response, request);
  },
} satisfies ExportedHandler<Env>;
