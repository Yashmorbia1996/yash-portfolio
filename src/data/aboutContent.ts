/** Shared About copy + metrics (homepage About block & /about intro). */
export const aboutTitle = "About";

/** Short line next to your name — same typography as About me body copy. */
export const aboutNameNote =
  "Thanks for checking out my portfolio! Whether you're a recruiter, fellow engineer, friend, or lost stranger, I hope you enjoy the ride.";

export const aboutBioParagraphs = [
  "I'm a senior mechanical engineer who has spent the last 4+ years helping scale an FDA-cleared Class IV handheld laser at NIRA.",
  "In one seat, I owned far more than design: manufacturing, fixtures, throughput, supplier coordination, CAPAs, audits, and production execution.",
  "That breadth let me solve problems end to end, from thermal redesigns that cut field returns from 23% to 3%, to systems that helped scale output from 500 to 1,500 units per week.",
  "I'm looking to bring that same product-to-production ownership to a senior hardware team building ambitious physical products.",
] as const;

export const aboutMetrics = [
  {
    label: "$4M -> $15M",
    description: "Revenue supported through production scaling.",
  },
  {
    label: "500 -> 1500/week",
    description: "Three-times throughput increase.",
  },
  {
    label: "85% -> 95%",
    description: "First-pass yield improvement.",
  },
  {
    label: "23% -> 3%",
    description: "Field return rate reduction.",
  },
  {
    label: "20+ fixtures",
    description: "Custom production and test fixtures designed.",
  },
  {
    label: "8 audits",
    description: "Three MDSAP plus five internal, zero major findings.",
  },
] as const;
