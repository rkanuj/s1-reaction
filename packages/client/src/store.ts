import { get, readable, writable } from 'svelte/store';

export class LocalStorage {
  static prefix = 's1-reaction';

  static setUserInfoDict(value: Record<string, UserInfo>) {
    this.setItem('users', value);
  }

  static getUserInfoDict() {
    return this.getItem<Record<string, UserInfo>>('users');
  }

  static setSelectedUID(value: number | null) {
    this.setItem('users.selected', value);
  }

  static getSelectedUID() {
    return this.getItem<number | null>('users.selected');
  }

  static setSmilesList(value: SmilesData[]) {
    this.setItem('smiles', value);
  }

  static getSmilesList() {
    return this.getItem<SmilesData[]>('smiles');
  }

  private static setItem<T>(key: string, value: T) {
    localStorage.setItem(`${ this.prefix }.${ key }`, JSON.stringify(value));
  }

  private static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(`${ this.prefix }.${ key }`);
    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  }
}

export const userInfoDict = writable<Record<string, UserInfo>>(LocalStorage.getUserInfoDict() || {});
userInfoDict.subscribe(value => {
  LocalStorage.setUserInfoDict(value);
});

export const userInfoList = readable<UserInfo[]>([], set => {
  return userInfoDict.subscribe(value => {
    set(Object.values(value).toSorted((a, b) => a.uid - b.uid));
  });
});

export const needLogin = readable(true, set => {
  return userInfoList.subscribe(value => {
    set(value.length === 0);
  });
});

export const selectedUID = writable<number | null>(LocalStorage.getSelectedUID());
selectedUID.subscribe(value => {
  LocalStorage.setSelectedUID(value);
});

export const selectedUserInfo = readable<UserInfo | null>(null, set => {
  return selectedUID.subscribe(value => {
    if (value === null) {
      set(null);
      return;
    }
    const selected = get(userInfoDict)[value];
    set(selected);
  });
});

export const reactsDict = writable<Record<string, Reaction[]>>({});

export const smilesList = writable<SmilesData[]>(LocalStorage.getSmilesList() || []);
smilesList.subscribe(value => {
  LocalStorage.setSmilesList(value);
});

export const smilesTable = readable<(Omit<SmilesData, 'list'> & {
  list: (SmilesData['list'])[],
})[]>([], set => {
  return smilesList.subscribe(value => {
    const table = value.map(smiles => {
      const list: (SmilesData['list'])[] = [];

      smiles.list.forEach((item, i) => {
        if (i % 12 === 0) {
          list.push([]);
        }
        list[list.length - 1].push(item);
      });

      return {
        typeid: smiles.typeid,
        type: smiles.type,
        list,
      };
    });
    set(table);
  });
});

export const smileyDict = readable<Record<string, string>>({}, set => {
  return smilesList.subscribe(value => {
    const dict: Record<string, string> = {};
    value.map(item => {
      return item.list;
    }).flat().forEach(item => {
      dict[item.code] = item.url;
    });
    set(dict);
  });
});

export const showModal = writable(false);
export const selectedPost = writable<{
  pid: number,
  uid: number
} | null>(null);
