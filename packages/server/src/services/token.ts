import AppEnv from '@/env';
import { payloadSchema } from '@/schemas';
import { TableReactList } from '@/services';
import { isTokenBanned, isUIDBanned } from '@/services/ban';
import crypto from 'node:crypto';
import { currentTimestamp } from 'shared';
import { z } from 'zod';

export function generateToken(payload: z.infer<typeof payloadSchema>) {
  return crypto.createHmac('sha256', AppEnv.SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest('base64');
}

export async function verifyToken(token: string, payload: z.infer<typeof payloadSchema>, bannedCheck = true) {
  if (token !== generateToken(payload)) {
    return false;
  }
  if (payload.exp !== 0 && (payload.iat + payload.exp) < currentTimestamp()) {
    return false;
  }
  if (!bannedCheck) {
    return true;
  }
  return !await isUIDBanned(payload.uid) && !await isTokenBanned(token);
}

export async function verifyAdminToken(token: string, payload: z.infer<typeof payloadSchema>) {
  const isTokenVerified = await verifyToken(token, payload);
  return isTokenVerified && AppEnv.ADMIN_UID_LIST.includes(payload.uid);
}

export async function queryUIDByToken(token: string) {
  return await TableReactList.queryUIDByToken
    .bind(token)
    .first<number>('uid');
}
