export const siteConfig = {
  name: "Yash Morbia",
  /** Short label for hero eyebrow / tight UI */
  roleShort: "Senior Mechanical Engineer",
  role: "Senior Mechanical Engineer | Product Development, Manufacturing & Scale",
  bio: "Senior mechanical engineer building hardware that has to ship, scale, and survive the field.",
  avatar: "/images/Yash-morbia-headshot.jpeg",
  location: "Greater Boston",
  phone: "(480) 434-0034",

  url: "https://your-portfolio.example.com",
  description: "Yash Morbia, senior mechanical engineer focused on regulated hardware, NPI, manufacturing scale-up, and product reliability.",
  ogImage: "/images/og.jpg",

  social: {
    github: "",
    linkedin: "https://www.linkedin.com/in/yashmorbia/",
    twitter: "",
    email: "Yash10morbia@gmail.com",
  },

  nav: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Projects", href: "/projects", icon: "Briefcase" },
    { label: "Certifications", href: "/certificates", icon: "Award" },
  ],

  skills: [
    "SolidWorks",
    "Siemens NX",
    "DFM/DFA",
    "ISO 13485",
    "FEA",
    "Thermal Management",
    "GD&T",
    "NPI Leadership",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
