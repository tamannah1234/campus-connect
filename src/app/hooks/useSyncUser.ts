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

    console.log("🔥 SYNCING USER TO CONVEX:", user.id);

    upsertUser({
      clerkId: user.id,
      name: user.fullName ?? "No Name",
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl ?? "",
    });
  }, [isLoaded, user, upsertUser]);
}