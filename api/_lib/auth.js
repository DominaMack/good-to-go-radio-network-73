import crypto from "node:crypto";

const cookieName = "gtg_admin_session";
const sessionTtlSeconds = 8 * 60 * 60;

const base64url = (value) =>
  Buffer.from(value).toString("base64url");

const sign = (value, secret) =>
  crypto.createHmac("sha256", secret).update(value).digest("base64url");

const safeEqual = (a, b) => {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};

export const parseCookies = (cookieHeader = "") =>
  Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const [name, ...value] = cookie.split("=");
        return [name, decodeURIComponent(value.join("="))];
      }),
  );

export const adminAuthConfigured = () =>
  Boolean(process.env.ADMIN_USERS && process.env.ADMIN_SESSION_SECRET && process.env.GOOGLE_CLIENT_ID);

export const getAdminUsers = () => {
  const configuredUsers = process.env.ADMIN_USERS?.trim();
  if (!configuredUsers) return [];

  try {
    const users = JSON.parse(configuredUsers);
    if (Array.isArray(users)) {
      return users
        .map((user) => ({
          name: String(user.name || user.email || user.username || "").trim(),
          email: String(user.email || user.username || "").trim(),
          username: String(user.username || user.email || "").trim(),
        }))
        .filter((user) => user.email && user.username);
    }
  } catch {
    // Fall through to comma/newline parsing.
  }

  return configuredUsers
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(.*?)\s*<([^>]+)>$/);
      const name = match?.[1]?.trim();
      const email = (match?.[2] || entry).trim();
      return {
        name: name || email,
        email,
        username: email,
      };
    });
};

export const findAdminUser = (username) => {
  const normalizedUsername = String(username || "").trim().toLowerCase();
  if (!normalizedUsername) return null;

  return (
    getAdminUsers().find((user) => {
      const email = user.email.toLowerCase();
      const configuredUsername = user.username.toLowerCase();
      return normalizedUsername === email || normalizedUsername === configuredUsername;
    }) || null
  );
};

export const verifyGoogleCredential = async (credential) => {
  if (!adminAuthConfigured() || !credential) return null;

  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
  );
  if (!response.ok) return null;

  const profile = await response.json();
  if (profile.aud !== process.env.GOOGLE_CLIENT_ID) return null;
  if (profile.email_verified !== "true" && profile.email_verified !== true) return null;

  const adminUser = findAdminUser(profile.email);
  if (!adminUser) return null;

  return {
    name: adminUser.name || profile.name || profile.email,
    email: adminUser.email,
    username: adminUser.username,
  };
};

export const createAdminSession = (adminUser) => {
  const payload = base64url(
    JSON.stringify({
      sub: adminUser.email,
      name: adminUser.name,
      username: adminUser.username,
      exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds,
    }),
  );
  return `${payload}.${sign(payload, process.env.ADMIN_SESSION_SECRET)}`;
};

export const getAdminSession = (req) => {
  if (!adminAuthConfigured()) return false;

  const token = parseCookies(req.headers.cookie)[cookieName];
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload, process.env.ADMIN_SESSION_SECRET))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.sub || session.exp <= Math.floor(Date.now() / 1000)) return false;
    const adminUser = findAdminUser(session.username || session.sub);
    if (!adminUser) return false;
    return {
      name: session.name || adminUser.name,
      email: adminUser.email,
      username: adminUser.username,
    };
  } catch {
    return false;
  }
};

export const verifyAdminSession = (req) => Boolean(getAdminSession(req));

export const setAdminCookie = (res, token) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionTtlSeconds}${secure}`,
  );
};

export const clearAdminCookie = (res) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
  );
};

export const requireAdmin = (req, res) => {
  if (verifyAdminSession(req)) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
};
