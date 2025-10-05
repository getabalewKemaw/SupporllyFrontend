import { type Message } from "../types/chat";

export default function ChatMessage({ message }: { message: Message }) {
  const isAI = message.isAIGenerated;
  const senderName = message.senderId?.name || "Unknown";
  
  return (
    <div className={`mb-4 flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isAI 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-purple-500 text-white'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium ${
            isAI ? 'text-gray-600' : 'text-purple-100'
          }`}>
            {senderName}
            {isAI && <span className="ml-1 text-xs">(AI)</span>}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <span className={`text-xs mt-1 block ${
          isAI ? 'text-gray-500' : 'text-purple-200'
        }`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
