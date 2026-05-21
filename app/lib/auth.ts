import { useRouteLoaderData } from "react-router";

import type { User } from "~/lib/user.server";

type RootLoaderData = {
  user: User | null;
};

function isUser(user: unknown): user is User {
  return (
    !!user &&
    typeof user === "object" &&
    "email" in user &&
    typeof (user as User).email === "string"
  );
}

export function useOptionalUser(): User | undefined {
  const data = useRouteLoaderData("root") as RootLoaderData | undefined;
  if (!data?.user || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const user = useOptionalUser();
  if (!user) {
    throw new Error(
      "No user found in root loader. Use useOptionalUser if user is optional."
    );
  }
  return user;
}
