import { UserButton, SignedIn as SignedInClerk } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";

export default function Profil({ children }: PropsWithChildren) {
  return (
    <SignedInClerk>
      <UserButton
        appearance={{
          elements: {
            avatarBox: { border: "2px solid grey", height: 35, width: 35 },
          },
        }}
      />
      {children}
    </SignedInClerk>
  );
}
