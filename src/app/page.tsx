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
      <div className="flex h-screen overflow-hidden bg-gray-900">
        <ChatSidebar 
          onTicketSelect={setCurrentTicketId} 
          currentTicketId={currentTicketId} 
          onNewChat={handleNewTicket}
        />
        <main className="flex flex-1 flex-col bg-gray-900">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:robot" className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
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
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Ask me anything..."
                      rows={4}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors font-medium"
                  >
                    Start Chat
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <ChatSidebar 
        onTicketSelect={setCurrentTicketId} 
        currentTicketId={currentTicketId} 
        onNewChat={handleNewTicket}
      />
      <main className="flex flex-1 flex-col bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-700 bg-gray-800 px-6 py-4">
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
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              + New Chat
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <ChatWindow messages={messages} />
          {loading && <p className="text-center text-gray-400 py-4">Loading messages...</p>}
          <ChatInput onSend={handleSend} sending={sending} ticketId={currentTicketId!} />
        </div>
      </main>
    </div>
  );
}
