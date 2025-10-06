import type { Message } from "../types/chat"
import { Icon } from "@iconify/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css" // You can choose any theme

export default function ChatMessage({ message }: { message: Message }) {
  const isAI = message.isAIGenerated
  const senderName = message.senderId?.name || "Unknown"

  return (
    <div
      className={`mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
        isAI ? "flex justify-start" : "flex justify-end"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[85%] sm:max-w-[80%] ${
          isAI ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
            isAI
              ? "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 ring-2 ring-purple-500/20"
              : "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 ring-2 ring-blue-500/20"
          }`}
        >
          {isAI ? (
            <Icon icon="mdi:robot" className="w-5 h-5 text-white drop-shadow-sm" />
          ) : (
            <Icon icon="mdi:account" className="w-5 h-5 text-white drop-shadow-sm" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col gap-1.5 min-w-0 flex-1 ${
            isAI ? "items-start" : "items-end"
          }`}
        >
          {/* Sender Name & Timestamp */}
          <div
            className={`flex items-center gap-2 px-1 ${
              isAI ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <span className="text-sm font-semibold text-gray-200 tracking-wide">
              {isAI ? "AI Assistant" : senderName}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Message Bubble */}
          <div
            className={`rounded-2xl px-5 py-3.5 shadow-xl transition-all duration-300 hover:shadow-2xl ${
              isAI
                ? "bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 text-gray-50 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/30"
                : "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white shadow-blue-500/20 hover:shadow-blue-500/30"
            }`}
          >
            <div
              className={`prose prose-invert max-w-none ${
                isAI ? "prose-purple" : "prose-blue"
              }`}
            >
              <div
                className={`text-[15px] leading-relaxed whitespace-pre-wrap m-0 ${
                  isAI ? "text-gray-100" : "text-white"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
