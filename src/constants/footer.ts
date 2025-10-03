
export type FooterLink = {
  id: number;
  label: string;
  href: string;
};

export type SocialLink = {
  id: number;
  icon: string; // iconify icon name
  href: string;
};

export const footerLinks: FooterLink[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Features", href: "#features" },
  { id: 3, label: "About", href: "#about" },
  { id: 4, label: "How It Works", href: "#how-it-works" },
  { id: 5, label: "Testimonials", href: "#testimonials" },
  { id: 6, label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { id: 1, icon: "mdi:twitter", href: "https://twitter.com/getabalewKemaw" },
  { id: 2, icon: "mdi:linkedin", href: "https://linkedin.com/in/getabalewKemaw" },
  { id: 3, icon: "mdi:github", href: "https://github.com/getabalewKemaw" },
];

export const footerNote = {
  company: "Soportlly Developed by Getabalew ", // Your brand name
  year: new Date().getFullYear(),
  text: "All rights reserved.",
};

