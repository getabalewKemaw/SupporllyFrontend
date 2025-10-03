export interface Feature {
  id: string;
  icon: string; // Iconify icon name
  title: string;
  description: string;
  cta?: string; // optional button text
}

export const features: Feature[] = [
  {
    id: "f1",
    icon: "mdi:robot",
    title: "AI-Powered Responses",
    description: "Get instant, context-aware answers to customer queries using advanced AI.",
  },
  {
    id: "f2",
    icon: "mdi:image-multiple",
    title: "Attachment Support",
    description: "Upload images, PDFs, or links, and receive AI analysis or responses instantly.",
  },
  {
    id: "f3",
    icon: "mdi:history",
    title: "Full History Tracking",
    description: "All tickets and messages are saved for further reference or auditing.",
  },
  {
    id: "f4",
    icon: "mdi:edit",
    title: "Editable Queries",
    description: "Update questions anytime and get fresh AI-generated answers.",
  },
  {
    id: "f5",
    icon: "mdi:shield-check",
    title: "Secure & Reliable",
    description: "All data is securely stored and managed with full authentication and roles.",
  },
  {
    id: "f6",
    icon: "mdi:monitor-dashboard",
    title: "Real-Time Dashboard",
    description: "Track AI responses, ticket status, and attachments in one place easily.",
  },
];

