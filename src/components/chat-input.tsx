"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

// Simple Button component to replace "@/components/ui/button"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "icon" | "default";
}

function Button({ size = "default", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClass = size === "icon" ? "p-2" : "px-4 py-2";
  return (
    <button className={`${base} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Optional cn utility
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ChatInput({ onSend, sending = false }: { onSend: (text: string) => void; sending?: boolean }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !sending) {
      onSend(message);
      setMessage("");
    }
  };
  

  return (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="relative flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Upload file"
            >
              <Icon icon="mdi:paperclip" className="h-5 w-5" />
            </button>
          </div>
          <Button
            type="submit"
            size="icon"
            className={cn(
              "h-10 w-10 shrink-0 rounded-xl bg-purple-500 text-white hover:bg-purple-600",
              (!message.trim() || sending) && "opacity-50 cursor-not-allowed"
            )}
            disabled={!message.trim() || sending}
          >
            {sending ? (
              <Icon icon="mdi:loading" className="h-5 w-5 animate-spin" />
            ) : (
              <Icon icon="mdi:send" className="h-5 w-5" />
            )}
            <span className="sr-only">{sending ? "Sending..." : "Send message"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
