import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    lastSeen: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_receiver", ["receiverId"]),
});