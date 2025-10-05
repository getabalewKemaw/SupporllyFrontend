import { type Message } from "../types/chat";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function ChatWindow({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <Icon icon="mdi:robot" className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-gray-300 text-lg font-medium">Welcome to AI Assistant</p>
            <p className="text-gray-500 text-sm mt-2">Start a conversation by asking me anything!</p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={`${msg._id}-${msg.createdAt}-${index}`} 
              message={msg} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
