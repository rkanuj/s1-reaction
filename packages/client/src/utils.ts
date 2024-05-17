import { dedupArray, randomInt } from 'shared';

export function sortReacts(reacts: Reaction[]) {
  return reacts.toSorted((a, b) => {
    const num = b.count - a.count;
    return num !== 0 ? num : a.smiley.localeCompare(b.smiley);
  });
}

export function extractId(str: string, regexp: RegExp) {
  const idStr = str.match(regexp)?.[1] ?? '';
  if (!idStr) {
    return null;
  }
  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return null;
  }
  return id;
}

export function generateTestReacts(minLen = 0, maxLen = 5, minCount = 1, maxCount = 200) {
  const smiles = dedupArray(new Array(randomInt(minLen, maxLen)).fill('').map(() => {
    return `[f:${ String(Math.floor(Math.random() * 275 + 1)).padStart(3, '0') }]`;
  }));
  const reacts = smiles.map(smiley => {
    return {
      smiley,
      count: randomInt(minCount, maxCount),
      reacted: false,
    } as Reaction;
  });
  if (reacts.length > 0) {
    reacts[randomInt(0, reacts.length - 1)].reacted = true;
  }
  return reacts;
}

export function justAlert(message: string) {
  alert(`[S1 Reaction]: ${ message }`);
}

export function justLogError(message: any) {
  console.error('[S1 Reaction]: ', message);
}
