"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMemo, useState } from "react";

export default function UsersSidebar({
  selectedUserId,
  onSelectUser,
}: {
  selectedUserId: string | null;
  onSelectUser: (id: string) => void;
}) {
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const users = useQuery(api.users.getUsers, user ? {} : "skip");

  const filteredUsers = useMemo(() => {
    if (!users || !user) return [];
    return users.filter(
      (u) =>
        u.clerkId !== user.id &&
        u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search, user]);

  return (
    <aside className="w-[240px] shrink-0 h-full bg-white border-r flex flex-col">
      {/* Search */}
      <div className="p-3 border-b">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users here"
          className="w-full h-8 px-3 rounded-md bg-slate-100 text-sm outline-none
                     focus:ring-2 focus:ring-slate-300"
        />
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto py-1">
        {filteredUsers.map((u) => (
          <button
            key={u.clerkId}
            onClick={() => onSelectUser(u.clerkId)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left
              transition-colors
              ${
                selectedUserId === u.clerkId
                  ? "bg-slate-200"
                  : "hover:bg-slate-100"
              }`}
          >
            {/* 🔒 HARD-LOCKED AVATAR SIZE */}
            <img
              src={u.imageUrl || ""}
              alt={u.name}
              className="h-8 w-8 rounded-full object-cover flex-none bg-slate-300"
            />

            {/* Name only (compact) */}
            <span className="text-sm font-semibold truncate text-slate-800">
              {u.name}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}