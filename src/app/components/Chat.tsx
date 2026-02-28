"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMessages } from "../hooks/useMessages";

export default function Chat({ otherUserId }: { otherUserId: string }) {
  const { user } = useUser();
  const { messages, sendMessage } = useMessages(user!.id, otherUserId);
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ senderId: user!.id, receiverId: otherUserId, text });
    setText("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", maxWidth: "400px" }}>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages.map((m) => (
          <div key={m._id}>
            <strong>{m.senderId === user!.id ? "You" : "Them"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%", marginRight: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}