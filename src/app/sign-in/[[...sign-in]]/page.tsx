import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn appearance={{
    elements: {
      card: "shadow-lg border rounded-lg",
    },
  }} />
    </div>
  );
}