"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api"; 

export function useUsers() {
  const users = useQuery(api.users.getUsers);
  return users ?? [];
}