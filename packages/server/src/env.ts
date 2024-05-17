export function setupEnv(env: Env) {
  AppEnv.init(env);
}

export default class AppEnv {
  static SKIP_S1: boolean;
  // secret
  static SECRET_KEY: string;
  static ADMIN_UID_LIST: number[] = [];
  // public
  static APP_VERSION: string;
  static S1_APP_API_URL: string;
  static S1ReactionDB: D1Database;

  static init(env: Env) {
    this.SKIP_S1 = !!env.SKIP_S1;

    if (!env.SECRET_KEY) {
      throw new Error('SECRET_KEY is not set');
    }
    this.SECRET_KEY = env.SECRET_KEY;

    if (env.ADMIN_UID_LIST) {
      env.ADMIN_UID_LIST
        .split(',')
        .forEach(item => {
          const uid = item.trim();
          if (uid && /^\d+$/.test(uid)) {
            this.ADMIN_UID_LIST.push(parseInt(uid, 10));
          }
        });
    }

    if (!env.APP_VERSION) {
      throw new Error('APP_VERSION is not set');
    }
    this.APP_VERSION = env.APP_VERSION;

    if (!env.S1_APP_API_URL) {
      throw new Error('S1_APP_API_URL is not set');
    }
    this.S1_APP_API_URL = env.S1_APP_API_URL;

    if (!env.S1ReactionDB) {
      throw new Error('S1ReactionDB is not set');
    }
    this.S1ReactionDB = env.S1ReactionDB;
  }
}
