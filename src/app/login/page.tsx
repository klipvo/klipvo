import { Suspense } from "react";
import { LoginForm } from "@/components/screens/login-form";

export const metadata = {
  title: "Klipvo — Log in",
};

export default function LoginPage() {
  return (
    <div className="auth-screen">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
