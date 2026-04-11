import "@testing-library/jest-dom/vitest";

class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];

  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

function createStorageMock(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

if (typeof window !== "undefined" && typeof window.localStorage?.clear !== "function") {
  Object.defineProperty(window, "localStorage", {
    writable: true,
    configurable: true,
    value: createStorageMock(),
  });
}
