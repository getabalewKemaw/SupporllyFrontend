import { type Message } from "../types/chat";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";

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
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Start a conversation with AI</p>
            <p className="text-gray-500 text-sm mt-2">Ask me anything!</p>
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
