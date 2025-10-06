"use client";

import { useState, useContext } from "react";
import { ChatSidebar } from "../components/ChatSidebar";
import ChatWindow from "../components/chat-window";
import { ChatInput } from "../components/chat-input";
import { useChat } from "../hooks/useChat";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Page() {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const { messages, loading, sending, currentTicketId, handleSend, createNewTicket, setCurrentTicketId } = useChat();
  const [showCreateTicket, setShowCreateTicket] = useState(!currentTicketId);
  const [ticketForm, setTicketForm] = useState({ title: "", description: "" });

  // Redirect to login if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketForm.title.trim() && ticketForm.description.trim()) {
      try {
        await createNewTicket(ticketForm.title, ticketForm.description);
        setShowCreateTicket(false);
        setTicketForm({ title: "", description: "" });
      } catch (error) {
        console.error('Error creating ticket:', error);
        alert(error instanceof Error ? error.message : 'Failed to create ticket. Please try again.');
      }
    }
  };

  const handleNewTicket = () => {
    setShowCreateTicket(true);
  };

  if (showCreateTicket) {
    return (
      <div className="flex h-screen overflow-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-[60%] left-[15%] w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-float-fast" />
          <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-[50%] left-[40%] w-56 h-56 bg-violet-600/20 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute bottom-[10%] left-[30%] w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl animate-float-fast" />
        </div>

        <ChatSidebar 
          onTicketSelect={setCurrentTicketId} 
          currentTicketId={currentTicketId} 
          onNewChat={handleNewTicket}
        />
        <main className="flex flex-1 flex-col relative z-10">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/30 animate-pulse-subtle">
                      <Icon icon="mdi:robot" className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 text-balance">
                      Start New Chat
                    </h2>
                    <p className="text-gray-400">Begin a conversation with AI Assistant</p>
                  </div>
                  <form onSubmit={handleCreateTicket} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                        Chat Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={ticketForm.title}
                        onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-600/50 rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="What would you like to discuss?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="description"
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-600/50 rounded-lg bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                        placeholder="Ask me anything..."
                        rows={4}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-medium shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Chat
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-[60%] left-[15%] w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-[50%] left-[40%] w-56 h-56 bg-violet-600/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-[10%] left-[30%] w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl animate-float-fast" />
      </div>

      <ChatSidebar 
        onTicketSelect={setCurrentTicketId} 
        currentTicketId={currentTicketId} 
        onNewChat={handleNewTicket}
      />
      <main className="flex flex-1 flex-col relative z-10">
        <div className="border-b border-gray-700/50 bg-gray-800/80 backdrop-blur-xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">
                {currentTicketId ? `Chat #${currentTicketId.slice(-8)}` : "AI Assistant"}
              </h1>
              <p className="text-sm text-gray-400">
                {currentTicketId ? "Chat with our AI assistant" : "Create a new chat to get started"}
              </p>
            </div>
            <button
              onClick={handleNewTicket}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95"
            >
              + New Chat
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col overflow-auto">
          <ChatWindow messages={messages} />
          {loading && <p className="text-center text-gray-400 py-4">Loading messages...</p>}
          <ChatInput onSend={handleSend} sending={sending} ticketId={currentTicketId!} />
        </div>
      </main>


    </div>
  );
}
