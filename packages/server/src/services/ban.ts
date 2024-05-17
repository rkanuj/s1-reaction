import { TableBanList } from '@/services';
import { currentTimestamp, formatTimestamp } from 'shared';

export async function queryExpiredAtByUID(uid: number) {
  const expiredAt = await TableBanList.queryExpiredAtByUID
    .bind(uid)
    .first<number>('expired_at');
  if (expiredAt === null) {
    return null;
  }
  return formatTimestamp(expiredAt);
}

export async function queryExpiredAtByToken(token: string) {
  const expiredAt = await TableBanList.queryExpiredAtByToken
    .bind(token)
    .first<number>('expired_at');
  if (expiredAt === null) {
    return null;
  }
  return formatTimestamp(expiredAt);
}

export async function updateBanListByUID(uid: number, exp: number) {
  await TableBanList.deleteByUID
    .bind(uid)
    .run();
  if (exp > 0) {
    const createdAt = currentTimestamp();
    const expiredAt = createdAt + exp;
    await TableBanList.insertUID
      .bind(uid, expiredAt, createdAt)
      .run();
    return formatTimestamp(expiredAt);
  }
  return null;
}

export async function updateBanListByToken(token: string, exp: number) {
  await TableBanList.deleteByToken
    .bind(token)
    .run();
  if (exp > 0) {
    const createdAt = currentTimestamp();
    const expiredAt = createdAt + exp;
    await TableBanList.insertToken
      .bind(token, expiredAt, createdAt)
      .run();
    return formatTimestamp(expiredAt);
  }
  return null;
}

export async function isUIDBanned(uid: number) {
  const expiredAt = await queryExpiredAtByUID(uid);
  if (expiredAt === null) {
    return false;
  }
  return currentTimestamp(new Date(expiredAt)) >= currentTimestamp();
}

export async function isTokenBanned(token: string) {
  const expiredAt = await queryExpiredAtByToken(token);
  if (expiredAt === null) {
    return false;
  }
  return currentTimestamp(new Date(expiredAt)) >= currentTimestamp();
}
