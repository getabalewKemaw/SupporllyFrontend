import { type Message } from "../types/chat";

const API_BASE_URL = "http://localhost:5000/api";

// Create headers for cookie-based authentication
function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    // Include credentials for cookie-based authentication
  };
}

// Create fetch options with credentials
function getFetchOptions(method: string = "GET", body?: Record<string, unknown>): RequestInit {
  return {
    method,
    headers: getHeaders(),
    credentials: "include", // This is crucial for cookie-based auth
    ...(body && { body: JSON.stringify(body) })
  };
}

// Create a new ticket
export async function createTicket(title: string, description: string, priority: string = "medium"): Promise<{ success: boolean; data: { _id: string; title: string; description: string; status: string; priority: string; customerId: string; companyId: string | null; createdAt: string; updatedAt: string } }> {
  const res = await fetch(`${API_BASE_URL}/tickets`, getFetchOptions("POST", { title, description, priority }));
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required. Please log in.");
    }
    throw new Error(`Failed to create ticket: ${res.statusText}`);
  }
  
  return res.json();
}

// Fetch messages for a ticket
export async function fetchMessages(ticketId: string, page = 1, limit = 20): Promise<Message[]> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}?page=${page}&limit=${limit}`, getFetchOptions());
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required. Please log in.");
    }
    throw new Error(`Failed to fetch messages: ${res.statusText}`);
  }
  
  const json = await res.json();
  return json.data?.messages || [];
}

// Send a message to a ticket
export async function sendMessage(ticketId: string, text: string): Promise<{ userMessage: Message; aiMessage: Message | null }> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}/messages`, getFetchOptions("POST", { content: text }));
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required. Please log in.");
    }
    throw new Error(`Failed to send message: ${res.statusText}`);
  }
  
  const json = await res.json();
  return json.data;
}

// Get ticket with messages
export async function getTicketWithMessages(ticketId: string, page: number = 1, limit: number = 10): Promise<{ success: boolean; data: { ticket: { _id: string; title: string; description: string; status: string; priority: string; customerId: { _id: string; name: string; email: string }; companyId: string | null; createdAt: string; updatedAt: string }; messages: Message[]; totalMessages: number; page: number; limit: number } }> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}?page=${page}&limit=${limit}`, getFetchOptions());
  return res.json();
}

// Update ticket
export async function updateTicket(ticketId: string, title?: string, description?: string): Promise<{ success: boolean; data: { _id: string; title: string; description: string; status: string; priority: string; customerId: string; companyId: string | null; createdAt: string; updatedAt: string } }> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, getFetchOptions("PATCH", { title, description }));
  return res.json();
}

// Get all tickets for current user (chat history)
export async function getUserTickets(page: number = 1, limit: number = 20): Promise<{ success: boolean; data: { tickets: { _id: string; title: string; description: string; status: string; priority: string; customerId: string; companyId: string | null; createdAt: string; updatedAt: string }[]; totalTickets: number; page: number; limit: number } }> {
  const res = await fetch(`${API_BASE_URL}/tickets?page=${page}&limit=${limit}`, getFetchOptions());
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required. Please log in.");
    }
    throw new Error(`Failed to fetch tickets: ${res.statusText}`);
  }
  
  return res.json();
}

// Get current user info
export async function getCurrentUser(): Promise<{ success: boolean; user: { _id: string; name: string; email: string; role: string } }> {
  const res = await fetch(`${API_BASE_URL}/auth-local/me`, getFetchOptions());

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Authentication required. Please log in.");
    }
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }

  return await res.json();
}





// Logout user
export async function logout(): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE_URL}/auth-local/logout`, getFetchOptions("POST"));
  
  if (!res.ok) {
    throw new Error(`Failed to logout: ${res.statusText}`);
  }
  
  return res.json();
}
