import { adminAuthConfigured, createAdminSession, findAdminUser, setAdminCookie, verifyAdminPassword } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!adminAuthConfigured()) {
    return res.status(503).json({ error: "Admin authentication is not configured." });
  }

  const username = req.body?.username;
  const password = req.body?.password;
  const adminUser = findAdminUser(username);

  if (!adminUser || !verifyAdminPassword(password)) {
    return res.status(401).json({ error: "Invalid admin username or password" });
  }

  setAdminCookie(res, createAdminSession(adminUser));
  return res.status(200).json({ authenticated: true, adminUser });
}
