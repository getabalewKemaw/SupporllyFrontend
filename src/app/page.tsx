"use client";

import { useState, useContext } from "react";
import { Sidebar } from "../components/side-bar";
import ChatWindow from "../components/chat-window";
import { ChatInput } from "../components/chat-input";
import { useChat } from "../hooks/useChat";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const { messages, loading, sending, currentTicketId, handleSend, createNewTicket } = useChat();
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
        <Sidebar />
        <main className="flex flex-1 flex-col">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Create New Ticket
                </h2>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={ticketForm.title}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter ticket title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your issue or question"
                      rows={4}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Create Ticket
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
      <Sidebar />
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-gray-700 bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">
                {currentTicketId ? `Ticket #${currentTicketId.slice(-8)}` : "AI Support Chat"}
              </h1>
              <p className="text-sm text-gray-400">
                {currentTicketId ? "Chat with our AI assistant" : "Create a ticket to get started"}
              </p>
            </div>
            <button
              onClick={handleNewTicket}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              New Chat
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <ChatWindow messages={messages} />
          {loading && <p className="text-center text-gray-400 py-4">Loading messages...</p>}
          <ChatInput onSend={handleSend} sending={sending} />
        </div>
      </main>
    </div>
  );
}
