import { type Message } from "../types/chat";
import { Icon } from "@iconify/react";

export default function ChatMessage({ message }: { message: Message }) {
  const isAI = message.isAIGenerated;
  const senderName = message.senderId?.name || "Unknown";
  
  return (
    <div className={`mb-6 ${isAI ? 'flex justify-start' : 'flex justify-end'}`}>
      <div className={`flex gap-3 max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAI 
            ? 'bg-purple-600' 
            : 'bg-gray-600'
        }`}>
          {isAI ? (
            <Icon icon="mdi:robot" className="w-4 h-4 text-white" />
          ) : (
            <Icon icon="mdi:account" className="w-4 h-4 text-white" />
          )}
        </div>
        
        {/* Message Content */}
        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
          {/* Sender Name */}
          <div className={`flex items-center gap-2 mb-1 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
            <span className="text-sm font-medium text-gray-300">
              {isAI ? 'AI Assistant' : senderName}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(message.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          
          {/* Message Bubble */}
          <div className={`rounded-2xl px-4 py-3 ${
            isAI 
              ? 'bg-gray-800 text-gray-100 border border-gray-700' 
              : 'bg-purple-600 text-white'
          }`}>
            <div className="prose prose-invert max-w-none">
              <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
