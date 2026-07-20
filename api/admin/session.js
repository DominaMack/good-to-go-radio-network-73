import { adminAuthConfigured, getAdminSession } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminUser = getAdminSession(req);

  return res.status(200).json({
    adminConfigured: adminAuthConfigured(),
    authenticated: Boolean(adminUser),
    adminUser: adminUser || null,
  });
}
