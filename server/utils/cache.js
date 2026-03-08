/**
 * Simple in-memory cache with TTL (Time To Live).
 * Each entry expires independently.
 */
class Cache {
  constructor() {
    this.store = new Map();
  }

  /**
   * Get a cached value. Returns null if expired or missing.
   */
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  /**
   * Set a cache entry with a TTL in milliseconds.
   */
  set(key, value, ttlMs) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
      cachedAt: new Date().toISOString(),
    });
  }

  /**
   * Check if a key exists and is valid.
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Remove a specific key.
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clear all entries.
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache stats.
   */
  stats() {
    let valid = 0;
    let expired = 0;
    for (const [, entry] of this.store) {
      if (Date.now() > entry.expiresAt) expired++;
      else valid++;
    }
    return { valid, expired, total: this.store.size };
  }
}

// Singleton instance shared across services
const cache = new Cache();
export default cache;
