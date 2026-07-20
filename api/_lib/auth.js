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
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && process.env.ADMIN_SESSION_SECRET);

const supabaseAuthUrl = (path) => {
  const baseUrl = String(process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  return `${baseUrl}/auth/v1/${path}`;
};

const adminUserFromSupabase = (user) => {
  const email = String(user?.email || "").trim();
  if (!email) return null;

  return {
    name: String(user?.user_metadata?.name || user?.user_metadata?.full_name || email).trim(),
    email,
    username: email,
  };
};

export const verifySupabasePassword = async (email, password) => {
  if (!adminAuthConfigured() || !email || !password) return null;

  const response = await fetch(supabaseAuthUrl("token?grant_type=password"), {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) return null;

  const session = await response.json();
  return adminUserFromSupabase(session.user);
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
    return {
      name: session.name || session.sub,
      email: session.sub,
      username: session.username || session.sub,
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
