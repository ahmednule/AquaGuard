const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("No data returned from API");
  }

  return json.data;
}

export const AUTH_MUTATIONS = {
  LOGIN: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
          name
          role
          community
          phone
        }
      }
    }
  `,
  SIGNUP: `
    mutation Signup($email: String!, $password: String!, $name: String!, $role: String, $community: String, $phone: String) {
      signup(email: $email, password: $password, name: $name, role: $role, community: $community, phone: $phone) {
        token
        user {
          id
          email
          name
          role
          community
          phone
        }
      }
    }
  `,
  ME: `
    query Me {
      me {
        id
        email
        name
        role
        community
        phone
      }
    }
  `,
};

export interface AuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    community?: string | null;
    phone?: string | null;
  };
}

export async function isBackendAvailable(): Promise<boolean> {
  try {
    const url = `${API_URL}/health`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { method: "GET", signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

const AUTH_COOKIE = "aqua_auth";
const ROLE_COOKIE = "aqua_role";

export function storeAuthCookies(token: string, role: string) {
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${AUTH_COOKIE}=${token}; path=/; max-age=${maxAge}`;
  document.cookie = `${ROLE_COOKIE}=${role}; path=/; max-age=${maxAge}`;
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${AUTH_COOKIE}=([^;]+)`));
  return match?.[1] ?? null;
}