import { type Message } from "../types/chat";
import ChatMessage from "./chat-message";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function ChatWindow({ messages }: { messages: Message[] }) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
    setIsAtBottom(nearBottom);
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current?.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
    >
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
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col min-h-full">
          <div className="flex-grow" />
          {messages.map((msg, index) => (
            <ChatMessage 
              key={`${msg._id}-${msg.createdAt}-${index}`} 
              message={msg} 
            />
          ))}
        </div>
      )}
    </div>
  );
}