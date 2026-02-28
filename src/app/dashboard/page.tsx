 "use client";

import { useState } from "react";           // 🔹 Import useState
import { useUser, UserButton } from "@clerk/nextjs";
import { useUsers } from "../hooks/useUsers";
import Chat from "../components/Chat";

export default function Dashboard() {
  const { user } = useUser();
  const users = useUsers();

  // 🔹 Declare state for selected user to chat with
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Users List */}
      <div style={{ flex: 1 }}>
        <h2>All Users</h2>
        <ul>
          {users
            .filter((u) => u._id !== user.id)
            .map((u) => (
              <li
                key={u._id}
                onClick={() => setSelectedUserId(u._id)}
                style={{ cursor: "pointer" }}
              >
                {u.name} — {u.email}
              </li>
            ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 2 }}>
        {selectedUserId ? (
          <Chat otherUserId={selectedUserId} />
        ) : (
          <p>Select a user to chat with</p>
        )}
      </div>

      {/* Profile */}
      <div>
        <UserButton />
      </div>
    </div>
  );
}

