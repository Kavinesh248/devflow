import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

export default async function RootHome() {
  const session = await auth();

  return (
    <>
      <h1 className="text-2xl font-black">Welcome</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
}
