export interface Message {
  _id: string;
  ticketId: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
    role?: string;
  };
  content: string;
  isAIGenerated: boolean;
  createdAt: string;
}
