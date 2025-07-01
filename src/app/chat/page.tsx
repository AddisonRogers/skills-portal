"use client"

import UnauthenticatedScreen from "@/app/login/UnauthenticatedScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

interface Message {
  id: number;
  user: string;
  text: string;
}

export default function ChatPage() {
  const { isPending, data } = useSession();
  const status = isPending ? "loading" : "authenticated";
  const user = data?.user;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading…</div>
  }

  if (status !== "authenticated" || !user) {
    return <UnauthenticatedScreen />;
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: user?.email ?? "Me", text: input }
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-xl my-16">
        <CardHeader>
          <h2 className="text-xl font-bold">Chat Room</h2>
          <p className="text-sm text-muted-foreground">Signed in as <span className="font-medium">{user?.email}</span></p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3 min-h-[300px] max-h-[40vh] overflow-y-auto mb-4">
            {messages.length ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.user === user?.email ? "justify-end" : "justify-start"}`}
                >
                  <div className="px-3 py-2 rounded-md bg-blue-700 text-white max-w-xs break-words">
                    <span className="block text-xs text-blue-200">{m.user}</span>
                    {m.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-sm text-center py-12">No messages yet. Say hello 👋</div>
            )}
          </div>
          <form className="flex gap-2" onSubmit={sendMessage}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}