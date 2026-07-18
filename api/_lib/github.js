const defaultLabel = "station-submission";
const markerStart = "<!-- good-to-go-station-submission";
const markerEnd = "-->";

export const githubConfigured = () =>
  Boolean(process.env.GITHUB_TOKEN && getRepository());

export const getRepository = () => {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  if (process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
    return `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;
  }
  if (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG) {
    return `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`;
  }
  return "";
};

const githubFetch = async (path, options = {}) => {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(body?.message || `GitHub request failed with ${response.status}`);
  }
  return body;
};

export const createSubmissionIssue = async ({ stationDraft, rawPayload }) => {
  const repository = getRepository();
  const label = process.env.GITHUB_ISSUE_LABEL || defaultLabel;
  const titleName = stationDraft.name || rawPayload?.contact?.name || "New station";
  const body = [
    "A paid GHL station intake form was submitted.",
    "",
    `Station: ${stationDraft.name}`,
    `Contact: ${stationDraft.hostName || "Not provided"}`,
    `Email: ${stationDraft.contactEmail || "Not provided"}`,
    `Tier: ${stationDraft.tier}`,
    "",
    `${markerStart}`,
    JSON.stringify({ stationDraft, rawPayload, receivedAt: new Date().toISOString() }, null, 2),
    `${markerEnd}`,
  ].join("\n");

  return githubFetch(`/repos/${repository}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: `[Station Submission] ${titleName}`,
      body,
      labels: [label],
    }),
  });
};

export const listSubmissionIssues = async () => {
  const repository = getRepository();
  const label = process.env.GITHUB_ISSUE_LABEL || defaultLabel;
  const issues = await githubFetch(
    `/repos/${repository}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=50`,
  );

  return issues.map((issue) => {
    const [, jsonBlock = "{}"] =
      issue.body?.match(/<!-- good-to-go-station-submission\s*([\s\S]*?)\s*-->/) || [];
    let parsed = {};
    try {
      parsed = JSON.parse(jsonBlock);
    } catch {
      parsed = {};
    }

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      url: issue.html_url,
      createdAt: issue.created_at,
      stationDraft: parsed.stationDraft,
      rawPayload: parsed.rawPayload,
    };
  });
};
