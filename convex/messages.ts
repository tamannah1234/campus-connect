import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Send a message
export const sendMessage = mutation({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get all messages between two users
export const getMessages = query({
  args: {
    userA: v.string(),
    userB: v.string(),
  },
  handler: async (ctx, { userA, userB }) => {
    return await ctx.db
      .query("messages")
      .filter(
        (q) =>
          (q.eq("senderId", userA) && q.eq("receiverId", userB)) ||
          (q.eq("senderId", userB) && q.eq("receiverId", userA))
      )
      .collect();
  },
});