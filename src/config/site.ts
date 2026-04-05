export const siteConfig = {
  // Personal info — update these with your details
  name: "Your Name",
  role: "Your Role / Title",
  bio: "A brief one-or-two sentence bio that describes who you are and what you do. Keep it personal and authentic.",
  avatar: "/images/avatar.svg",
  location: "San Francisco, CA",

  // Site metadata
  url: "https://your-portfolio.example.com",
  description: "Portfolio of Your Name — brief description of your work and expertise.",
  ogImage: "/images/og.jpg",

  // Social links — remove any that don't apply
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "you@example.com",
  },

  // Navigation links
  nav: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Projects", href: "/projects", icon: "Briefcase" },
    { label: "About", href: "/about", icon: "User" },
  ],

  // Skills to display on the About page
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Figma",
    "AWS",
    "Docker",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
