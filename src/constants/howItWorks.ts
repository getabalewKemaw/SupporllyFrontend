// src/constants/howItWorks.ts

export type Step = {
  id: number;
  title: string;
  description: string;
  icon: string; // Use Iconify icon name
  bgColor?: string; // optional background color
};

export const howItWorks: Step[] = [
  {
    id: 1,
    title: "Ask a Question",
    description: "Type your question or upload an image to get instant AI insights.",
    icon: "mdi:message-text-outline",
    bgColor: "#5032a8",
  },
  {
    id: 2,
    title: "AI Processes Your Query",
    description: "Our AI analyzes the context and provides a clear, actionable answer.",
    icon: "mdi:robot-outline",
    bgColor: "#7a5af8",
  },
  {
    id: 3,
    title: "Receive Instant Response",
    description: "Get the AI-generated response immediately in your dashboard or chat.",
    icon: "mdi:lightning-bolt-outline",
    bgColor: "#ff6f61",
  },
  {
    id: 4,
    title: "Track Your History",
    description: "All questions and AI answers are stored for easy reference anytime.",
    icon: "mdi:history",
    bgColor: "#facc15",
  },
];

