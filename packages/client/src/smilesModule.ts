import API from '@/api';
import type { GetSmiles200Response } from '@/api/S1ApiOffline';
import { smilesList } from '@/store';
import { justAlert, justLogError } from '@/utils';
import { responseErrorHandle } from 'shared';
import { get } from 'svelte/store';

export default class SmilesModule {
  private static json: SmilesData[] = [];
  private static urls: Record<string, string>;

  static async init() {
    if (this.json.length > 0) {
      return;
    }
    const smilesJson = import.meta.glob<SmilesData[]>('/src/assets/smiles.json', {
      import: 'default',
      eager: true,
    });
    this.json = Object.values(smilesJson)[0];

    this.urls = import.meta.glob<string>([
      '/src/assets/smiley/*/*.png',
      '/src/assets/smiley/*/*.gif',
    ], {
      import: 'default',
      eager: true,
    });
  }

  static async getJSON() {
    await this.init();
    return this.json;
  }

  static async replaceWithLocal(url: string) {
    await this.init();
    url = url.replace(import.meta.env.VITE_S1_STATIC_IMAGE_URL, '/src/assets');
    return this.urls[url] || '';
  }
}

export async function checkSmiles() {
  if (!import.meta.env.VITE_SKIP_S1) {
    const smiles = get(smilesList);
    if (smiles.length > 0) {
      return true;
    }
  }

  const response = await (import.meta.env.VITE_OFFLINE ? API.s1ApiOffline : API.s1Api)
    .getSmiles().catch(responseErrorHandle<GetSmiles200Response>);
  if (!response.success) {
    justAlert('通过 S1 接口获取麻将脸表情列表失败');
    if (response.message) {
      justLogError(response.message);
    }
    return false;
  }
  smilesList.set(response.data.slice(0, 6));
  return true;
}
