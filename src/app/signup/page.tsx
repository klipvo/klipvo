import { SignupForm } from "@/components/screens/signup-form";

export const metadata = {
  title: "Klipvo — Sign up",
};

export default function SignupPage() {
  return (
    <div className="auth-screen">
      <SignupForm />
    </div>
  );
}
