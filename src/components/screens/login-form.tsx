"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login, type AuthFormState } from "@/lib/actions/auth";

const initialState: AuthFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";

  return (
    <>
      <div className="screen-header">
        <div className="screen-title">Log in</div>
        <div className="screen-subtitle">Welcome back to Klipvo</div>
      </div>

      <form action={formAction}>
        <input type="hidden" name="next" value={next} />
        {state.error && (
          <div className="form-section">
            <div className="form-error">{state.error}</div>
          </div>
        )}
        <div className="form-section">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" className="form-input" placeholder="you@example.com" required />
        </div>
        <div className="form-section">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input id="password" name="password" type="password" className="form-input" placeholder="••••••••" required />
        </div>
        <button type="submit" className="submit-btn" disabled={pending}>
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}
