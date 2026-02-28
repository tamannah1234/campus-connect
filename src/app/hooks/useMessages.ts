"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useMessages(userA: string, userB: string) {
  const messages = useQuery(api.messages.getMessages, { userA, userB }) ?? [];
  const sendMessage = useMutation(api.messages.sendMessage);
  return { messages, sendMessage };
}