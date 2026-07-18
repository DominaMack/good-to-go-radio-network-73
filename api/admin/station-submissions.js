import { requireAdmin } from "../_lib/auth.js";
import { githubConfigured, listSubmissionIssues } from "../_lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  if (!githubConfigured()) {
    return res.status(200).json({
      storageConfigured: false,
      submissions: [],
      message: "GitHub issue storage is not configured.",
    });
  }

  try {
    const submissions = await listSubmissionIssues();
    return res.status(200).json({ storageConfigured: true, submissions });
  } catch (error) {
    return res.status(502).json({ error: error.message || "Unable to load submissions" });
  }
}
