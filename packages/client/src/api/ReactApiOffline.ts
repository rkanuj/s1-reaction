import { LocalStorage } from '@/store';
import { deepCopy, formatTimestamp } from 'shared';

export class ReactApiOffline {
  dataSource = LocalStorage.getReactList() || [];

  saveDataSource(dataSource: typeof this.dataSource) {
    this.dataSource = dataSource;
    LocalStorage.setReactList(dataSource);
  }

  postQueryPostReacts(requestData: {
    pids: number[]
  }): {
    pid: number,
    react: ReactionOffline
  }[] {
    const { pids } = requestData;
    const dataSource = deepCopy(this.dataSource);

    const result: Record<string, ReturnType<typeof this.postQueryPostReacts>[0]> = {};
    for (let i = 0; i < dataSource.length; i++) {
      const dataItem = dataSource[i];
      if (!pids.includes(dataItem.pid)) {
        continue;
      }
      result[dataItem.pid] = {
        pid: dataItem.pid,
        react: {
          smiley: dataItem.smiley,
          remark: dataItem.remark,
          pid: dataItem.pid,
          uid2: dataItem.uid2,
        },
      };
    }

    return Object.values(result);
  }

  postQueryUserReacts(requestData: {
    uid2: number
  }): ReactionOffline[] {
    const { uid2 } = requestData;
    const dataSource = deepCopy(this.dataSource);

    const result: ReturnType<typeof this.postQueryUserReacts> = [];
    for (let i = 0; i < dataSource.length; i++) {
      const dataItem = dataSource[i];
      if (dataItem.uid2 === uid2) {
        result.push({
          smiley: dataItem.smiley,
          remark: dataItem.remark,
          pid: dataItem.pid,
          uid2: dataItem.uid2,
        });
      }
    }

    return result;
  }

  postUpdatePostReact(requestData: {
    pid: number,
    uid2: number,
    smiley: string | null,
    remark: string
  }): ReturnType<typeof this.postQueryPostReacts> {
    const { pid, uid2, smiley, remark } = requestData;
    const dataSource = deepCopy(this.dataSource);

    const index = dataSource.findIndex(item => {
      return item.pid === pid;
    });
    if (index !== -1) {
      dataSource.splice(index, 1);
    }

    if (smiley !== null) {
      dataSource.push({
        pid,
        uid2,
        smiley,
        remark,
        created_at: formatTimestamp(),
      });
    }

    this.saveDataSource(dataSource);

    return this.postQueryPostReacts({
      pids: [pid],
    });
  }
}
