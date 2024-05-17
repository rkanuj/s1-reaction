export function currentTimestamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000);
}

export function formatTimestamp(timestamp: number, toLocal = false) {
  const date = new Date(timestamp * 1000);
  if (toLocal) {
    return date.toLocaleString();
  }
  return date.toISOString();
}

export function obj2form(data: Record<string, string | number | undefined>) {
  return Object.keys(data).map(key => {
      const value = data[key];
      if (value === undefined) {
        return '';
      }
      return `${ encodeURIComponent(key) }=${ encodeURIComponent(value) }`;
    },
  ).filter(item => item).join('&');
}

export function responseErrorHandle<T>(e: any) {
  const response: Response | undefined = (() => {
    if (e instanceof Response) {
      return e;
    }
    if (e.response && e.response instanceof Response) {
      return e.response as Response;
    }
  })();
  if (response) {
    return response.json() as Promise<T>;
  }
  return {
    success: false,
    message: e instanceof Error ? e.message : String(e),
  } as T;
}

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dedupArray<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
