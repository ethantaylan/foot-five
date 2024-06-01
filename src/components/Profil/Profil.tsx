import { UserButton, SignedIn as SignedInClerk } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";

export default function Profil({ children }: PropsWithChildren) {
  return (
    <SignedInClerk>
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              border: '0px solid white',
              height: 35,
              width: 35,
              boxShadow: "0px 5px 7px rgb(0 ,0 ,0, 0.3);",
            },
          },
        }}
      />
      {children}
    </SignedInClerk>
  );
}
