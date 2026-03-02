import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useMessages(userA?: string, userB?: string) {
  const messages = useQuery(
    api.messages.getConversation,
    userA && userB ? { userId: userA, otherUserId: userB } : "skip"
  ) ?? [];

  const sendMessage = useMutation(api.messages.sendMessage);

  return { messages, sendMessage };
}