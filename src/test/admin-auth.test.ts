import { afterEach, describe, expect, it } from "vitest";
import { findAdminUser, getAdminUsers } from "../../api/_lib/auth.js";

describe("admin users", () => {
  const previousAdminUsers = process.env.ADMIN_USERS;

  afterEach(() => {
    process.env.ADMIN_USERS = previousAdminUsers;
  });

  it("requires admins to be configured through ADMIN_USERS", () => {
    delete process.env.ADMIN_USERS;

    expect(getAdminUsers()).toEqual([]);
    expect(findAdminUser("admin@example.com")).toBeNull();
  });

  it("supports adding multiple admins through ADMIN_USERS", () => {
    process.env.ADMIN_USERS = JSON.stringify([
      {
        name: "First Admin",
        email: "admin@example.com",
      },
      {
        name: "Second Admin",
        email: "second@example.com",
      },
    ]);

    expect(getAdminUsers()).toHaveLength(2);
    expect(findAdminUser("second@example.com")).toMatchObject({
      name: "Second Admin",
      username: "second@example.com",
    });
  });
});
