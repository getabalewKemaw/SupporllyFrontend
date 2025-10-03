export type AboutItem = {
  id: number;
  title: string;
  description: string;
  icon: string; 
};
export const aboutItems: AboutItem[] = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To empower businesses with instant AI-powered customer support, improving response times and satisfaction.",
    icon: "mdi:target",
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "To be the leading AI assistant platform, helping every company deliver smart, context-aware support seamlessly.",
    icon: "mdi:eye",
  },
  {
    id: 3,
    title: "Why Soportlly?",
    description:
      "We combine AI intelligence with simplicity, letting teams focus on solving problems while Soportlly handles support efficiently.",
    icon: "mdi:robot",
  },
];
