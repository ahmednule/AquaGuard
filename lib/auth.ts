export const CREDENTIALS = {
  caretaker: {
    email: "caretaker@aquaguard.io",
    password: "care123",
    role: "caretaker" as const,
    name: "Caretaker Admin",
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
  email: CREDENTIALS.caretaker.email,
  password: CREDENTIALS.caretaker.password,
};

export function getRoleFromCookie(): "caretaker" | "user" {
  if (typeof document === "undefined") return "caretaker";
  const match = document.cookie.match(/aqua_role=([^;]+)/);
  return (match?.[1] as "caretaker" | "user") ?? "caretaker";
}

export function makeMockToken(payload: Record<string, any>) {
  try {
    const json = JSON.stringify({ ...payload, iat: Date.now() });
    return Buffer.from(json).toString("base64");
  } catch (e) {
    return "dev-token";
  }
}
