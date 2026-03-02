// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// // Send a message
// export const sendMessage = mutation({
//   args: {
//     senderId: v.string(),
//     receiverId: v.string(),
//     text: v.string(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("messages", {
//       ...args,
//       createdAt: Date.now(),
//     });
//   },
// });

// // Get all messages between two users
// export const getMessages = query({
//   args: {
//     userA: v.string(),
//     userB: v.string(),
//   },
//   handler: async (ctx, { userA, userB }) => {
//     return await ctx.db
//       .query("messages")
//       .filter(
//         (q) =>
//           (q.eq("senderId", userA) && q.eq("receiverId", userB)) ||
//           (q.eq("senderId", userB) && q.eq("receiverId", userA))
//       )
//       .collect();
//   },
// });


import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get full conversation between two users
 */
export const getConversation = query({
  args: {
    userId: v.string(),
    otherUserId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.userId),
            q.eq(q.field("receiverId"), args.otherUserId)
          ),
          q.and(
            q.eq(q.field("senderId"), args.otherUserId),
            q.eq(q.field("receiverId"), args.userId)
          )
        )
      )
      .order("asc")
      .collect();
  },
});

/**
 * Send message
 */
export const sendMessage = mutation({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      text: args.text,
      createdAt: Date.now(),
    });
  },
});

/**
 * Sidebar: last message per user
 */
export const getLastMessagesForUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages").collect();

    const map = new Map<string, { text: string; createdAt: number }>();

    for (const m of messages) {
      if (m.senderId !== args.userId && m.receiverId !== args.userId) continue;

      const otherId =
        m.senderId === args.userId ? m.receiverId : m.senderId;

      const prev = map.get(otherId);
      if (!prev || m.createdAt > prev.createdAt) {
        map.set(otherId, {
          text: m.text,
          createdAt: m.createdAt,
        });
      }
    }

    return Object.fromEntries(map);
  },
});