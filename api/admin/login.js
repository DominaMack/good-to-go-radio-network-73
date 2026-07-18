import { adminAuthConfigured, createAdminSession, setAdminCookie, verifyGoogleCredential } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!adminAuthConfigured()) {
    return res.status(503).json({ error: "Admin authentication is not configured." });
  }

  const adminUser = await verifyGoogleCredential(req.body?.credential);

  if (!adminUser) {
    return res.status(401).json({ error: "This Google account is not authorized for admin access." });
  }

  setAdminCookie(res, createAdminSession(adminUser));
  return res.status(200).json({ authenticated: true, adminUser });
}
