"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function UsersPage() {
  const users = useQuery(api.users.getAllUsers);

  if (!users) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>ALL USERS FROM CONVEX</h2>

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}