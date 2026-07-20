import { afterEach, describe, expect, it } from "vitest";
import { adminAuthConfigured, createAdminSession, getAdminSession } from "../../api/_lib/auth.js";

describe("admin auth", () => {
  const previousSupabaseUrl = process.env.SUPABASE_URL;
  const previousSupabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const previousSessionSecret = process.env.ADMIN_SESSION_SECRET;

  afterEach(() => {
    process.env.SUPABASE_URL = previousSupabaseUrl;
    process.env.SUPABASE_ANON_KEY = previousSupabaseAnonKey;
    process.env.ADMIN_SESSION_SECRET = previousSessionSecret;
  });

  it("requires Supabase and session settings", () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.ADMIN_SESSION_SECRET;

    expect(adminAuthConfigured()).toBe(false);
  });

  it("reads a signed admin session without a stored admin list", () => {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_ANON_KEY = "anon-key";
    process.env.ADMIN_SESSION_SECRET = "test-session-secret";

    const token = createAdminSession({
      name: "Admin Name",
      email: "admin@example.com",
      username: "admin@example.com",
    });
    const session = getAdminSession({ headers: { cookie: `gtg_admin_session=${encodeURIComponent(token)}` } });

    expect(session).toMatchObject({ name: "Admin Name", email: "admin@example.com" });
  });
});
