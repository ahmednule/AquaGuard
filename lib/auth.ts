export const CREDENTIALS = {
  admin: {
    email: "admin@aquaguard.io",
    password: "care123",
    role: "admin" as const,
    name: "Admin",
  },
  user: {
    email: "resident@aquaguard.io",
    password: "user123",
    role: "user" as const,
    name: "Jane Wanjiku",
  },
};

// Legacy single credential kept for backwards compat
export const TEST_CREDENTIALS = {
  email: CREDENTIALS.admin.email,
  password: CREDENTIALS.admin.password,
};

export function getRoleFromCookie(): "admin" | "user" {
  if (typeof document === "undefined") return "user";
  const match = document.cookie.match(/aqua_role=([^;]+)/);
  return (match?.[1] as "admin" | "user") ?? "user";
}

export function makeMockToken(payload: Record<string, any>) {
  try {
    const json = JSON.stringify({ ...payload, iat: Date.now() });
    return Buffer.from(json).toString("base64");
  } catch (e) {
    return "dev-token";
  }
}
