import { scrypt, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16);
    scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      resolve(`${salt.toString("hex")}:${key.toString("hex")}`);
    });
  });
}

export function verifyPassword(password: string, stored: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [saltHex, keyHex] = stored.split(":");
    if (!saltHex || !keyHex) return resolve(false);
    scrypt(password, Buffer.from(saltHex, "hex"), 64, (err, key) => {
      if (err) return reject(err);
      if (key.length !== Buffer.from(keyHex, "hex").length) return resolve(false);
      resolve(timingSafeEqual(key, Buffer.from(keyHex, "hex")));
    });
  });
}
