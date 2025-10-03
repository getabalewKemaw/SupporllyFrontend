export type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Manager",
    message:
      "Soportlly transformed our customer support! AI answers are instant, accurate, and keep our team productive.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Software Engineer",
    message:
      "The AI attachment analysis saved us hours every week. Highly recommend Soportlly for any team.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Customer Support Lead",
    message:
      "Our customers love the instant AI responses. Soportlly keeps our support fast and accurate!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

