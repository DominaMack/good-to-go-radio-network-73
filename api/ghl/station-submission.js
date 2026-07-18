import crypto from "node:crypto";
import { createSubmissionIssue, githubConfigured } from "../_lib/github.js";
import { compactStationDraft, stationDraftFromPayload } from "../_lib/station-draft.js";

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const submittedSecret = (req) => {
  const authorization = req.headers.authorization || "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }
  return req.headers["x-ghl-webhook-secret"] || req.query?.secret || "";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GHL_WEBHOOK_SECRET) {
    return res.status(503).json({ error: "GHL webhook secret is not configured." });
  }

  if (!safeEqual(submittedSecret(req), process.env.GHL_WEBHOOK_SECRET)) {
    return res.status(401).json({ error: "Invalid webhook secret" });
  }

  const stationDraft = compactStationDraft(stationDraftFromPayload(req.body || {}));

  if (req.query?.dryRun === "1") {
    return res.status(200).json({ stored: false, stationDraft });
  }

  if (!githubConfigured()) {
    return res.status(503).json({
      error: "GitHub issue storage is not configured. Refusing to drop a paid station submission.",
      stationDraft,
    });
  }

  try {
    const issue = await createSubmissionIssue({ stationDraft, rawPayload: req.body || {} });
    return res.status(202).json({
      stored: true,
      issue: {
        number: issue.number,
        url: issue.html_url,
      },
      stationDraft,
    });
  } catch (error) {
    return res.status(502).json({ error: error.message || "Unable to store submission", stationDraft });
  }
}
