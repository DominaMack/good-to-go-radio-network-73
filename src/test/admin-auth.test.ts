import { afterEach, describe, expect, it } from "vitest";
import { findAdminUser, getAdminUsers } from "../../api/_lib/auth.js";

describe("admin users", () => {
  const previousAdminUsers = process.env.ADMIN_USERS;

  afterEach(() => {
    process.env.ADMIN_USERS = previousAdminUsers;
  });

  it("includes DC McCraney as the default first admin", () => {
    delete process.env.ADMIN_USERS;

    expect(getAdminUsers()).toEqual([
      {
        name: "DC McCraney",
        email: "Dominique.McCraney@gmail.com",
        username: "Dominique.McCraney@gmail.com",
      },
    ]);
    expect(findAdminUser("dominique.mccraney@gmail.com")).toMatchObject({
      name: "DC McCraney",
      email: "Dominique.McCraney@gmail.com",
    });
  });

  it("supports adding multiple admins through ADMIN_USERS", () => {
    process.env.ADMIN_USERS = JSON.stringify([
      {
        name: "DC McCraney",
        email: "Dominique.McCraney@gmail.com",
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
