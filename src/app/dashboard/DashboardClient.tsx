"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import UsersSidebar from "../components/UsersSidebar";
import Chat from "../components/Chat";
import { useSearchParams } from "next/navigation";

export default function DashboardClient() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const userParam = searchParams?.get("user");
    if (userParam) setSelectedUserId(userParam);
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="h-14 shrink-0 bg-white border-b flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-slate-800">
          Campus Connect
        </h1>

        <div className="flex items-center gap-3">
          <Link
            href="/users"
            className="inline-flex h-9 px-4 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90"
          >
            Find Users
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <UsersSidebar
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />

        <main className="flex-1 flex flex-col p-4 overflow-hidden">
          {!selectedUserId ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Select a user to start chatting
            </div>
          ) : (
            <Chat otherUserId={selectedUserId} />
          )}
        </main>
      </div>
    </div>
  );
}