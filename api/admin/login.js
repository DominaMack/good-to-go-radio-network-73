import { adminAuthConfigured, createAdminSession, setAdminCookie, verifySupabasePassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!adminAuthConfigured()) {
    return res.status(503).json({ error: "Admin authentication is not configured." });
  }

  const adminUser = await verifySupabasePassword(req.body?.email, req.body?.password);

  if (!adminUser) {
    return res.status(401).json({ error: "Invalid Supabase admin email or password." });
  }

  setAdminCookie(res, createAdminSession(adminUser));
  return res.status(200).json({ authenticated: true, adminUser });
}
