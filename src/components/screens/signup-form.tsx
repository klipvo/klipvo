"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthFormState } from "@/lib/actions/auth";

const initialState: AuthFormState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <>
      <div className="screen-header">
        <div className="screen-title">Sign up</div>
        <div className="screen-subtitle">Create your Klipvo account</div>
      </div>

      <form action={formAction}>
        {state.error && (
          <div className="form-section">
            <div className="form-error">{state.error}</div>
          </div>
        )}
        <div className="form-section">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" className="form-input" placeholder="Alex Rivera" required />
        </div>
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
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </div>
        <label className="checkbox-row">
          <input type="checkbox" name="isCreator" />
          I&apos;m a creator — I want to post deals
        </label>
        <button type="submit" className="submit-btn" disabled={pending}>
          {pending ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
