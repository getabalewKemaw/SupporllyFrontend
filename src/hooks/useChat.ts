import { useEffect, useState } from "react";
import { fetchMessages, sendMessage, createTicket } from "../api/chatApi";
import { type Message } from "../types/chat";

export function useChat(ticketId?: string, pollingInterval = 2000) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(ticketId || null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!currentTicketId) {
      setLoading(false);
      return;
    }

    async function loadMessages() {
      try {
        if (currentTicketId) {
          const data = await fetchMessages(currentTicketId);
          setMessages(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setLoading(false);
      }
    }

    loadMessages();
    const interval = setInterval(loadMessages, pollingInterval);

    return () => clearInterval(interval);
  }, [currentTicketId, pollingInterval]);

  async function handleSend(text: string) {
    if (!currentTicketId || sending) return;
    
    setSending(true);
    try {
      await sendMessage(currentTicketId, text);
      // Don't manually add messages here - let the polling handle it
      // This prevents duplicate messages
      
      // Small delay to give AI time to respond before next poll
      setTimeout(() => {
        if (currentTicketId) {
          fetchMessages(currentTicketId).then(setMessages);
        }
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  }

  async function createNewTicket(title: string, description: string, priority: string = "medium") {
    try {
      const response = await createTicket(title, description, priority);
      if (response.success) {
        setCurrentTicketId(response.data._id);
        // The AI will automatically respond to the description, so we'll fetch messages
        setTimeout(() => {
          if (response.data._id) {
            fetchMessages(response.data._id).then(setMessages);
          }
        }, 1000);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to create ticket:', error);
      throw error; // Re-throw so the UI can handle it
    }
  }

  return { 
    messages, 
    loading, 
    sending,
    currentTicketId,
    handleSend, 
    createNewTicket,
    setCurrentTicketId
  };
}
