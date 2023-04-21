import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import getPem from "rsa-pem-from-mod-exp";

/**
 * Configuration options.
 */
interface Config {
  /**
   * Number of milliseconds to cache public keys. Default: 1 hour
   */
  cacheLifetime?: number;
}

/**
 * Verify options.
 */
interface VerifyOptions {
  /**
   * `jwk_uri` value obtained from B2C policy metadata endpoint.
   */
  jwksUri: string;

  /**
   * `issuer` value obtained from B2C policy metadata endpoint.
   */
  issuer: string;

  /**
   * Application ID of the application accessing the tenant.
   */
  audience: string;
}

/**
 * Public key cache item.
 */
interface CacheItem {
  /**
   * RSA public key result.
   */
  result: Promise<string>;

  /**
   * Resolve function from `value`'s promise.
   */
  done?: (value: string) => void;

  /**
   * Date, in milliseconds, the cache will be considered expired.
   */
  expiry: number;
}

/**
 * Azure json web key set.
 */
interface AzureJwks {
  keys: AzureJwk[];
}

/**
 * Azure json web key.
 */
interface AzureJwk {
  kid: string;
  nbf: number;
  use: string;
  kty: string;
  e: string;
  n: string;
}
/**
 * Default value for `cacheLifetime`.
 */
const DEFAULT_CACHE_LIFETIME = 60 * 60 * 1000; // one hour

/**
 * Current configuration.
 */
let config: Config = {
  cacheLifetime: DEFAULT_CACHE_LIFETIME,
};

/**
 * Set config properties.
 *
 * @param config Object of properties to set.
 */
function setConfig(overrides: Config) {
  return Object.assign(config, overrides);
}

/**
 * Get current configuration.
 */
function getConfig() {
  return config;
}

/**
 * Reset configuration to defaults.
 */
function resetConfig() {
  config = {
    cacheLifetime: DEFAULT_CACHE_LIFETIME,
  };
}

/**
 * Public key cache.
 */
const cache = new Map<string, CacheItem>();

/**
 * Get expiry.
 */
function getExpiry() {
  const now = new Date().getTime();
  const config = getConfig();

  return now + config.cacheLifetime;
}

/**
 * Set cache item.
 *
 * @param key Cache item key.
 * @param value Cache item value.
 */
function setItem(key: string, value: string) {
  return cache.set(key, {
    result: Promise.resolve(value),
    expiry: getExpiry(),
  });
}

/**
 * Set deferred cache item.
 *
 * @param key Cache item key.
 */
function setDeferredItem(key: string) {
  let done: (value: string) => void;
  const result = new Promise<string>((resolve) => {
    done = resolve;
  });

  return cache.set(key, {
    result,
    done,
    expiry: getExpiry(),
  });
}

/**
 * Get cache item.
 *
 * @param key Cache item key.
 */
function getItem(key: string) {
  const value = cache.get(key);
  const now = new Date().getTime();

  if (!value) {
    return null;
  }

  if (value.expiry < now) {
    // expired
    cache.delete(key);
    return null;
  }

  return value;
}

/**
 * Remove cache item.
 *
 * @param key Cache item key.
 */
function removeItem(key: string) {
  return cache.delete(key);
}

/**
 * Clear all items.
 */
function clear() {
  cache.clear();
}
/**
 * Get public key.
 *
 * @param jwksUri Json web key set URI.
 * @param kid Public key to get.
 */
function getPublicKey(jwksUri: string, kid: string) {
  let item = getItem(kid);

  if (item) {
    return item.result;
  }

  // immediately defer to prevent duplicate calls to get jwks
  setDeferredItem(kid);

  return fetch(jwksUri)
    .then((res) => res.json() as Promise<AzureJwks>)
    .then((res) => {
      res.keys.forEach((key) => {
        const existing = getItem(key.kid);
        const pem: string = getPem(key.n, key.e);

        if (existing && existing.done) {
          // deferred item
          existing.done(pem);
        } else {
          setItem(key.kid, pem);
        }
      });

      item = getItem(kid);

      if (!item) {
        throw new Error("public key not found");
      }

      return item.result;
    });
}

/**
 * Verify token.
 *
 * @param token Token to verify.
 * @param options Configuration options.
 */
function verify(token: string, options: VerifyOptions) {
  const { jwksUri, audience, issuer } = options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decoded: { [key: string]: any };
  let kid: string;

  try {
    decoded = jwt.decode(token, { complete: true, json: true });
    kid = decoded.header.kid;

    if (!kid) {
      throw new Error("kid missing from token header");
    }
  } catch (error) {
    console.log(error);
    console.log(token);
    throw Error(`invalid token: ${token}`);
  }

  return getPublicKey(jwksUri, kid).then((key) =>
    jwt.verify(token, key, {
      algorithms: ["RS256"],
      audience,
      issuer,
    })
  );
}

/**
 * App Settings
 */
const jwksUri = process.env.JWKSURI;
const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;
/**
 * Configuration
 */
const verifyOptions: VerifyOptions = {
  jwksUri: jwksUri,
  issuer: issuer,
  audience: audience,
};
type Email = string;

/**
 * Verify token.
 *
 * @param token Token to verify.
 * @returns Email wrapped in a promise containing first email associated with B2C account.
 */
const verifyToken = async (token: string): Promise<Email> => {
  try {
    if (!token || token === "" || token.length <= 0) {
      throw Error("unauthorized");
    }
    const value = token.split(" ")[1];

    const decoded: any = await verify(value, verifyOptions);

    const email = decoded.emails[0];
    if (!email) {
      throw Error("invalid email");
    }
    return email;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export default verifyToken;
