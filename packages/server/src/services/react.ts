import AppEnv from '@/env';
import { pidSchema, reactSchema, userReactSchema } from '@/schemas';
import { TableReactList } from '@/services';
import { currentTimestamp } from 'shared';
import { z } from 'zod';

export type PostReact = z.infer<typeof reactSchema> & {
  pid: z.infer<typeof pidSchema>
}

export type UserReact = z.infer<typeof userReactSchema>

function queryReactsByPID(pid: number, uid?: number) {
  if (uid !== undefined) {
    return TableReactList.queryReactsWithUIDByPID.bind(uid, pid);
  }
  return TableReactList.queryReactsByPID.bind(pid);
}

export async function queryPostReacts(pid: number, uid?: number) {
  const result = await queryReactsByPID(pid, uid).all<PostReact>();
  return result.results;
}

export async function queryPostReactsBatch(pids: number[], uid?: number) {
  const result = await AppEnv.S1ReactionDB
    .batch<PostReact>(pids.map(pid => {
      return queryReactsByPID(pid, uid);
    }));
  return result.map(item => item.results);
}

export async function queryUserReacts(uid: number) {
  const result = await AppEnv.S1ReactionDB
    .batch<UserReact>([
      TableReactList.queryReactsByUID.bind(uid),
      TableReactList.queryReactsByUID2.bind(uid),
    ]);
  return {
    sent: result[0].results,
    received: result[1].results,
  };
}

export async function updatePostReact(pid: number, uid: number, uid2: number, smiley: string | null, token: string) {
  await TableReactList.deleteByPIDAndUID
    .bind(pid, uid)
    .run();
  if (smiley !== null) {
    const createdAt = currentTimestamp();
    await TableReactList.insert
      .bind(pid, uid, uid2, smiley, token, createdAt)
      .run();
  }
  return await queryPostReacts(pid, uid);
}
