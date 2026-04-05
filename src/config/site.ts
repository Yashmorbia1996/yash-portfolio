export const siteConfig = {
  // Personal info — update these with your details
  name: "Your Name",
  role: "Senior Mechanical Engineer",
  bio: "Senior Mechanical Engineer specializing in FDA-cleared electromechanical systems, precision packaging, and thermal management.",
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
