"use client";

import { useState, useRef, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useUser } from "@clerk/nextjs";
import { useMessages } from "../hooks/useMessages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Chat({ otherUserId }: { otherUserId: string }) {
  const { user } = useUser();
  const { messages, sendMessage } = useMessages(user?.id, otherUserId);
  const [text, setText] = useState("");
  const users = useQuery(api.users.getUsers);
  const otherUser = users?.find((u: any) => u.clerkId === otherUserId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !user) return;

    await sendMessage({
      senderId: user.id,
      receiverId: otherUserId,
      text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-xl overflow-hidden shadow-sm">

      {/* Chat Header */}
      <div className="bg-slate-50 border-b">
        <div className="flex items-center gap-3 px-4 py-3 h-16">
          <div className="h-11 w-11 rounded-full overflow-hidden bg-slate-200 flex-none border">
            {otherUser?.imageUrl ? (
              <img src={otherUser.imageUrl} alt={otherUser?.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-sm font-bold text-white bg-slate-400">
                {otherUser?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{otherUser?.name ?? "Unknown"}</div>
            <div className="mt-1 h-6 text-xs text-slate-600 flex items-center">{otherUser?.lastSeen ? `Last seen ${new Date(otherUser.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Last seen —'}</div>
          </div>
        </div>
      </div>

      {/* Messages Scrollable Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50"
      >
        {messages.map((m: { senderId: string; _id: Key | null | undefined; text: any; createdAt: string | number | Date; }) => {
          const isMe = m.senderId === user?.id;
          const align = isMe ? 'items-end' : 'items-start';

          return (
            <div key={m._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col ${align} max-w-[80%]`}> 
                <div className={`px-5 py-3 text-sm rounded-2xl ${isMe ? 'bg-black text-white' : 'bg-gray-100 text-slate-900 border border-gray-200'}`}>
                  <p className="break-words">{m.text}</p>
                </div>
                <div className={`text-[10px] text-slate-400 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Input
            value={text}
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="h-12 px-4 rounded-full text-sm flex-1 focus:ring-2 focus:ring-black"
          />
          <Button
            onClick={handleSend}
            disabled={!user || !text.trim()}
            className={`h-12 w-12 rounded-full flex items-center justify-center ${!user || !text.trim() ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-black text-white hover:bg-black/90'}`}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}