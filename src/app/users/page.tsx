"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";

export default function UsersPage() {
  const router = useRouter();
  const users = useQuery(api.users.getUsers);
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  if (!users) return <p className="p-6">Loading...</p>;

  // put logged-in user first (if present) then others
  const me = users?.find((u: any) => user && u.clerkId === user.id);
  const others = filteredUsers.filter((u: any) => u.clerkId !== me?.clerkId);

  return (
    <div className="h-screen w-full flex flex-col items-center bg-slate-50 px-6 py-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Campus Connect</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md h-10 px-4 mb-6 rounded-full border outline-none focus:ring-2 focus:ring-black"
      />

      <div className="w-full max-w-6xl">
        {/* Logged-in user's card (single horizontal) */}
        {me && (
          <div className="mb-6">
            <div className="w-64 bg-white rounded-2xl border shadow-sm p-5 text-center mx-auto">
              <div className="relative mx-auto h-20 w-20 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                {me.imageUrl ? (
                  <img src={me.imageUrl} alt={me.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">{me.name?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>
              <h3 className="mt-3 text-sm font-semibold truncate">{me.name}</h3>
              <p className="text-xs text-slate-500 truncate">{me.email || "You"}</p>
            </div>
          </div>
        )}

        {/* Other users: wrap to multiple rows */}
        <div className="flex flex-wrap gap-4">
          {others.map((u) => (
            <div key={u.clerkId} className="w-64 bg-white rounded-2xl border shadow-sm p-5 text-center">
              <div className="relative mx-auto h-20 w-20 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                {u.imageUrl && u.imageUrl.trim() !== "" ? (
                  <img
                    src={u.imageUrl}
                    alt={u.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">{u.name?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>

              <h3 className="mt-3 text-sm font-semibold truncate">{u.name}</h3>
              <p className="text-xs text-slate-500 truncate">{u.email || "Active user"}</p>

              <button
                onClick={() => router.push(`/dashboard?user=${u.clerkId}`)}
                className="mt-4 w-full h-9 rounded-full bg-black text-white text-sm font-semibold hover:bg-black/90"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}