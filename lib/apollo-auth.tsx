"use client";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clearAuthCookies, getAuthToken } from "@/lib/graphql";
import { getRoleFromCookie } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

const SESSION_QUERY = gql`
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
`;

export type AppRole = "user" | "admin";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  community?: string | null;
  phone?: string | null;
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  status: AuthStatus;
  user: AppUser | null;
  role: AppRole | null;
  token: string | null;
  refreshSession: () => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function normalizeRole(role?: string | null): AppRole {
  return role === "admin" || role === "caretaker" ? "admin" : "user";
}

function decodeToken(token: string): Partial<AppUser & { role: string }> | null {
  try {
    const payload = token.includes(".") ? token.split(".").at(-2) ?? "" : token;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }
}

function buildFallbackUser(token: string): AppUser | null {
  const payload = decodeToken(token);
  const role = normalizeRole(payload?.role ?? getRoleFromCookie());

  if (!payload?.email && !payload?.name) {
    return {
      id: role === "admin" ? "admin-session" : "user-session",
      email: role === "admin" ? "admin@aquaguard.io" : "resident@aquaguard.io",
      name: role === "admin" ? "Admin" : "Resident",
      role,
    };
  }

  return {
    id: payload.id ?? (role === "admin" ? "admin-session" : "user-session"),
    email: payload.email ?? (role === "admin" ? "admin@aquaguard.io" : "resident@aquaguard.io"),
    name: payload.name ?? (role === "admin" ? "Admin" : "Resident"),
    role,
    community: payload.community ?? null,
    phone: payload.phone ?? null,
  };
}

function SessionLoader() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-slate-950 text-slate-400">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm">
        Restoring your session...
      </div>
    </div>
  );
}

export function ApolloAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    if (typeof document === "undefined") {
      return false;
    }

    const currentToken = getAuthToken();
    if (!currentToken) {
      clearAuthCookies();
      setUser(null);
      setToken(null);
      setStatus("unauthenticated");
      return false;
    }

    setToken(currentToken);

    try {
      const result = await apolloClient.query<{ me?: AppUser }>({
        query: SESSION_QUERY,
        fetchPolicy: "network-only",
      });

      if (result.data?.me) {
        const sessionUser = result.data.me;
        const normalizedUser: AppUser = {
          ...sessionUser,
          role: normalizeRole(sessionUser.role),
        };

        setUser(normalizedUser);
        setStatus("authenticated");
        return true;
      }
    } catch {
      const fallbackUser = buildFallbackUser(currentToken);
      if (fallbackUser) {
        setUser(fallbackUser);
        setStatus("authenticated");
        return true;
      }
    }

    clearAuthCookies();
    setUser(null);
    setToken(null);
    setStatus("unauthenticated");
    return false;
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const signOut = useCallback(() => {
    clearAuthCookies();
    setUser(null);
    setToken(null);
    setStatus("unauthenticated");
    void apolloClient.clearStore();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      role: user?.role ?? null,
      token,
      refreshSession,
      signOut,
    }),
    [refreshSession, signOut, status, token, user]
  );

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider value={value}>
        {status === "loading" ? <SessionLoader /> : children}
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within ApolloAuthProvider");
  }

  return context;
}

function dashboardRouteForRole(role: AppRole) {
  return role === "admin" ? "/dashboard" : "/dashboard/user";
}

export function AuthGate({
  children,
  allowedRoles,
  redirectTo = "/login",
}: {
  children: ReactNode;
  allowedRoles?: AppRole[];
  redirectTo?: string;
}) {
  const router = useRouter();
  const { status, role } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(redirectTo);
      return;
    }

    if (status === "authenticated" && allowedRoles && role && !allowedRoles.includes(role)) {
      router.replace(dashboardRouteForRole(role));
    }
  }, [allowedRoles, redirectTo, role, router, status]);

  if (status === "loading" || status === "unauthenticated") {
    return <SessionLoader />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <SessionLoader />;
  }

  return <>{children}</>;
}