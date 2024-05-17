import AppEnv from '@/env';

export function setupStatement() {
  TableReactList.init();
  TableBanList.init();
}

export class TableReactList {
  static queryReactsByPID: D1PreparedStatement;
  static queryReactsWithUIDByPID: D1PreparedStatement;
  static queryReactsByUID: D1PreparedStatement;
  static queryReactsByUID2: D1PreparedStatement;

  static insert: D1PreparedStatement;
  static deleteByPIDAndUID: D1PreparedStatement;

  static queryUIDByToken: D1PreparedStatement;

  static init() {
    this.queryReactsByPID = AppEnv.S1ReactionDB
      .prepare('select pid, smiley, count(*) as count, 0 as reacted from react_list where pid = ? group by smiley');
    this.queryReactsWithUIDByPID = AppEnv.S1ReactionDB
      .prepare('select pid, smiley, count(*) as count, sum(case when uid = ? then 1 else 0 end) as reacted from react_list where pid = ? group by smiley');
    this.queryReactsByUID = AppEnv.S1ReactionDB
      .prepare('select smiley, count(*) as count from react_list where uid = ? group by smiley');
    this.queryReactsByUID2 = AppEnv.S1ReactionDB
      .prepare('select smiley, count(*) as count from react_list where uid2 = ? group by smiley');

    this.insert = AppEnv.S1ReactionDB
      .prepare('insert into react_list (pid, uid, uid2, smiley, token, created_at) values (?, ?, ?, ?, ?, datetime(?, \'unixepoch\'))');
    this.deleteByPIDAndUID = AppEnv.S1ReactionDB
      .prepare('delete from react_list where pid = ? and uid = ?');

    this.queryUIDByToken = AppEnv.S1ReactionDB
      .prepare('select uid from react_list where token = ?');
  }
}

export class TableBanList {
  static queryExpiredAtByUID: D1PreparedStatement;
  static insertUID: D1PreparedStatement;
  static deleteByUID: D1PreparedStatement;

  static queryExpiredAtByToken: D1PreparedStatement;
  static insertToken: D1PreparedStatement;
  static deleteByToken: D1PreparedStatement;

  static init() {
    this.queryExpiredAtByUID = AppEnv.S1ReactionDB
      .prepare('select expired_at from ban_list where uid = ?');
    this.insertUID = AppEnv.S1ReactionDB
      .prepare('insert into ban_list (uid, expired_at, created_at) values (?, ?, datetime(?, \'unixepoch\'))');
    this.deleteByUID = AppEnv.S1ReactionDB
      .prepare('delete from ban_list where uid = ?');

    this.queryExpiredAtByToken = AppEnv.S1ReactionDB
      .prepare('select expired_at from ban_list where token = ?');
    this.insertToken = AppEnv.S1ReactionDB
      .prepare('insert into ban_list (token, expired_at, created_at) values (?, ?, datetime(?, \'unixepoch\'))');
    this.deleteByToken = AppEnv.S1ReactionDB
      .prepare('delete from ban_list where token = ?');
  }
}
