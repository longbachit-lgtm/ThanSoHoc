// Simple in-memory cache (can be replaced with Redis in production)
class Cache {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 10 * 60 * 1000; // 10 minutes
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Clean expired entries (run periodically)
  clean() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Singleton instance
const cache = new Cache();

// Clean expired entries every 5 minutes
setInterval(() => {
  cache.clean();
}, 5 * 60 * 1000);

module.exports = cache;

