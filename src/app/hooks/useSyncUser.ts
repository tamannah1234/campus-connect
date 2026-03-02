"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useSyncUser() {
  const { user, isLoaded } = useUser();
  const upsertUser = useMutation(api.users.upsertUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email =
      user.emailAddresses && user.emailAddresses.length > 0
        ? user.emailAddresses[0].emailAddress
        : "";

    upsertUser({
      clerkId: user.id,
      name: user.fullName ?? "No Name",
      email,
      imageUrl: user.imageUrl ?? "",
    });
  }, [isLoaded, user, upsertUser]);

  return upsertUser;
}