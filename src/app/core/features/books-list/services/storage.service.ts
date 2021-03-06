/*
 * Implements universal Storage API that works in browser and Node.
 * This shouldn't be used as a database replacement in a real production app,
 * but for the purposes of this dev puzzle it is fine. :)
 */
import { getStorage } from '../utils/get-storage';

export class StorageService<T extends object = any> {
  private state: T = null;
  private storage = getStorage();

  constructor(private readonly key: string, private readonly initialState: T) {
    this.readFromStorage();
  }

  read(): T {
    return this.state;
  }

  update(mutate: (s: T) => T): void {
    this.state = mutate(this.state);
    this.writeToStorage();
  }

  private readFromStorage(): void {
    const serialized = this.storage.getItem(this.key);
    if (serialized) {
      try {
        this.state = JSON.parse(serialized);
      } catch {}
    }
    if (!this.state) {
      this.state = this.initialState;
    }
  }

  private writeToStorage(): void {
    this.storage.setItem(this.key, JSON.stringify(this.state));
  }
}
