let localStorage: Storage;

export function getStorage(): Storage {
  if (localStorage) {
    return localStorage;
  }

  if (typeof window !== 'undefined') {
    localStorage = window.localStorage;
  } else {
    throw new Error('Unsupported environment');
  }

  return localStorage;
}
