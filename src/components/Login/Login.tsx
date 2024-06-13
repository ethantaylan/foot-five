import { SignIn, SignedOut as SignedOutClerk } from "@clerk/clerk-react";

export default function Login() {
  return (
    <SignedOutClerk>
      <div className="flex items-center h-full justify-center">
        <SignIn
          fallbackRedirectUrl="/onsignup"
        />
      </div>
    </SignedOutClerk>
  );
}
