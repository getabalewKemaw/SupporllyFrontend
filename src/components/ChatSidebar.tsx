"use client";

import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { getUserTickets } from "../api/chatApi";
import { getCurrentUser,logout} from "../api/auth"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface ChatHistory {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface ChatSidebarProps {
  onTicketSelect: (ticketId: string) => void;
  currentTicketId: string | null;
  onNewChat: () => void;
}

export function ChatSidebar({ onTicketSelect, currentTicketId, onNewChat }: ChatSidebarProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setAuthUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  // Fetch user data and chat history
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current user
        const userResponse = await getCurrentUser();
        if (userResponse.success) {
          setUser(userResponse.user);
        }
        
        // Fetch chat history
        const historyResponse = await getUserTickets();
        if (historyResponse.success) {
          setChatHistory(historyResponse.data.tickets);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // If authentication fails, redirect to login
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setAuthUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  return (
    <aside className={`flex h-screen flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
            <Icon icon="mdi:robot" className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && <span className="font-semibold text-white">AI Assistant</span>}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon icon={isCollapsed ? "mdi:chevron-right" : "mdi:chevron-left"} className="h-5 w-5" />
        </button>
      </div>
      {/* New Chat Button */}
      {!isCollapsed && (
        <div className="p-3">
          <button 
            onClick={onNewChat}
            className="w-full flex items-center gap-3 rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
          >
            <Icon icon="mdi:plus" className="h-4 w-4" />
            New Chat
          </button>
        </div>
      )}

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Icon icon="mdi:loading" className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : !isCollapsed ? (
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Chats</h3>
            </div>
            {chatHistory.length === 0 ? (
              <div className="px-3 py-4 text-center">
                <p className="text-gray-500 text-sm">No chats yet</p>
                <p className="text-gray-600 text-xs mt-1">Start a new conversation!</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => onTicketSelect(chat._id)}
                  className={`w-full flex items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    currentTicketId === chat._id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon icon="mdi:message-text" className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{chat.title}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{chat.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(chat.updatedAt)}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {chatHistory.slice(0, 5).map((chat) => (
              <button
                key={chat._id}
                onClick={() => onTicketSelect(chat._id)}
                className={`w-full flex items-center justify-center rounded-lg p-2 transition-colors ${
                  currentTicketId === chat._id
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                title={chat.title}
              >
                <Icon icon="mdi:message-text" className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-700 p-3">
        <div className="relative group">
          <div className="flex items-center gap-3 rounded-lg p-2 text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
              <Icon icon="mdi:account" className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || 'Loading...'}</span>
                <span className="text-xs text-gray-400">{user?.email || 'Loading...'}</span>
              </div>
            )}
            {!isCollapsed && (
              <Icon icon="mdi:chevron-down" className="h-4 w-4 ml-auto" />
            )}
          </div>
          
          {/* Dropdown Menu */}
          {!isCollapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:logout" className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
