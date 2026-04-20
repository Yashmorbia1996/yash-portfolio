/**
 * Single source for WorkProjectsCarousel copy and cover slides on the projects index
 * and on individual project pages ("More projects").
 */
export type StudyLink = {
  label: string;
  meta: string;
  slug: string;
};

export type PortfolioCarouselEntry = {
  title: string;
  slug: string;
  context: string;
  problem: string;
  action: string;
  result: string;
  tags: readonly string[];
  cover: string;
  coverSlides?: readonly string[];
  eyebrow?: string;
  summary?: string;
  studyLinks?: readonly StudyLink[];
};

export const workCarouselProjects = [
  {
    title: 'Thermal Redesign Journey',
    slug: 'thermal-redesign-journey',
    eyebrow: 'Work Project',
    context: 'Thermal path · field reliability',
    problem:
      'Field overheating pushed returns past a sustainable rate; needed a real fix to the thermal path, not a workaround.',
    action:
      'Phase 1: airflow + grill work (Flow Simulation + physical validation). Phase 2: stack upgrade (package + all-metal heatsink) to remove the junction-to-case bottleneck.',
    result:
      '−16 °C chip temp; returns under 3%; both phases shipped; ~+50% operating power vs prior gen.',
    tags: [
      'Thermal Analysis',
      'Flow Simulation',
      'RCA / FMEA',
      'Design iteration',
      'DFM',
      'Physical validation',
    ],
    cover: '/images/Phase%202_Design%20change%202_3.png',
    coverSlides: [
      '/images/Option4_airflow.png',
      '/images/Phase%202_Design%20change%202_1.png',
      '/images/Phase%202_Design%20change%202_3.png',
    ],
  },
  {
    title: 'LIV Optical Test Rig',
    slug: 'liv-optical-test-rig',
    eyebrow: 'Work Project',
    context: 'Laser engines · batch screening',
    problem:
      'No trustworthy batch screen before full commit; manual LIV was slow, operator-dependent, and weak on beam quality.',
    action:
      'In-house LIV from POC → three production fixtures (TO-9, packaged engine, InGaAs imaging) plus the software-facing test spec.',
    result: '3 production fixtures; ~3× batch throughput; power + spatial screening in one AQL-ready station.',
    tags: ['SolidWorks', 'GD&T', 'Opto-mechanical', 'Tolerance stacks', 'ISO 13485'],
    cover: '/images/liv-layman-bench-poc.png',
    coverSlides: ['/images/liv-layman-bench-poc.png'],
  },
  {
    title: 'Press Test Fixture',
    slug: 'press-test-fixture',
    eyebrow: 'Work Project',
    context: 'Press-fit · yield at scale',
    problem:
      'Critical press-fit relied on manual alignment and subjective checks—variation drove yield loss and escapes as volume grew.',
    action:
      'Three generations: bench concept → pneumatic pilot (GD&T + optical verify) → production poka-yoke with fewer DOF and constraint-driven tooling.',
    result:
      'Scaled toward ~1.5k units/week at ~95% FPY; architecture aimed at zero alignment-induced errors and ~3× throughput vs early tooling.',
    tags: [
      'SolidWorks',
      'GD&T',
      'Optical alignment',
      'Poka-yoke',
      'Fixturing',
      'ISO 13485',
    ],
    cover: '/images/Working%20concept_CAD2.png',
    coverSlides: [
      '/images/Working%20concept_CAD2.png',
      '/images/Working%20concept_actual.png',
      '/images/Concept%202_Pneumatic%20systems_press.png',
      '/images/Concept%203_pneumatic%20with%20optimized%20parts_blurred.png',
    ],
  },
  {
    title: 'Yarn Connector NPI: Smart Textiles',
    slug: 'connector-npi-smart-textiles',
    eyebrow: 'Work Project',
    context: 'Flex co-op · yarn-to-PCB NPI',
    problem:
      'No COTS connector could join conductive yarn to standard electronics in a compact, manufacturable way.',
    action:
      '10 concepts → 3 via DFM/DFA; SolidWorks + printed prototypes; formal design review with 23 stakeholders.',
    result: '3 validated prototypes; two designs advanced into the Papyrus II program.',
    tags: ['SolidWorks', 'DFM/DFA', 'NPI', 'Rapid prototyping', 'TRL/MRL'],
    cover: '/images/connector-1-yarn.png',
    coverSlides: ['/images/connector-1-yarn.png', '/images/connector-2-yarn.png', '/images/connector-3-yarn.png'],
  },
] as const satisfies readonly PortfolioCarouselEntry[];

export const cadCarouselProjects = [
  {
    title: 'ANSYS Software Studies',
    slug: 'ansys-simulation-studies',
    eyebrow: 'CAD & Simulation',
    context: 'CFD · FEA · Conjugate heat transfer',
    problem: '',
    action: '',
    result: '',
    summary: 'Physical testing is expensive, slow, and gives one answer at a time. Simulation lets you ask what if fast — change a geometry, a boundary condition, a material — and see the effect before touching hardware. My approach: narrow the design space before you build, so hardware iterations are targeted rather than exploratory.',
    studyLinks: [
      { label: 'CHT Analysis: GPU Thermal Management', meta: 'ANSYS Fluent · Conjugate heat transfer · Two-case mesh study', slug: 'cht-analysis-gpu' },
      { label: 'Mixing T-Junction: Thermal Mixing Simulation', meta: 'ANSYS Fluent · Parametric study · Length & momentum ratio', slug: 't-junction-mixing-simulation' },
      { label: 'Flow Over Cylinder: Vortex Shedding Study', meta: 'ANSYS Fluent · Steady & transient · Strouhal number', slug: 'flow-over-cylinder-simulation' },
      { label: 'Ahmed Body: External Aerodynamics', meta: 'ANSYS Fluent · Bluff-body benchmark · k-ε · Mesh refinement', slug: 'ahmed-body-simulation' },
    ],
    tags: ['ANSYS Fluent', 'CFD', 'FEA', 'Conjugate Heat Transfer', 'Mesh Refinement'],
    cover: '/images/cht-analysis/cht-case1-velocity-vectors.jpg',
  },
  {
    title: 'SolidWorks Personal Projects',
    slug: 'solidworks-personal-projects',
    context: 'CAD & simulation · Personal CAD exploration',
    problem: 'Independent projects were used to keep design thinking sharp and practice translating ideas into buildable mechanical concepts.',
    action: 'Developed assemblies, mechanisms, and manufacturable part concepts with disciplined model structure and iterative refinement.',
    result: 'Built breadth in CAD execution and design communication outside formal product programs.',
    tags: ['SolidWorks', 'Assemblies', 'Mechanisms', 'DFM'],
    cover: '/images/projects/project-2.svg',
  },
] as const satisfies readonly PortfolioCarouselEntry[];

export const academicPersonalCarouselProjects = [
  {
    title: 'Badge Reel Redesign: A Systems Approach',
    slug: 'badge-reel-redesign',
    eyebrow: 'Personal Project',
    context: 'Design challenge · Product engineering case study',
    problem:
      'A commodity badge reel snaps back at 4.4 m/s, hammering the housing on every retraction and causing cord fraying, spring fatigue, and jamming across 10 to 15K cycles.',
    action:
      'Competitive teardown across three market tiers, four progressive design concepts (CF spring, TPU gasket, bumper spring, eddy brake), full spring spec, manufacturing process, COGS breakdown, and V&V test plan.',
    result:
      'Recommended concept brings end-of-stroke speed to effectively zero. $1.00 COGS at 500K units. FOS 5.1 on spring spec, rated for 50K+ cycles.',
    tags: ['SolidWorks', 'DFM/DFA', 'Concept Development', 'Engineering Calculations', 'COGS Analysis'],
    cover: '/images/whoop-badge-slide-1.jpg',
    coverSlides: [
      '/images/badge-reel-cad-assembled.png',
      '/images/badge-reel-cad-exploded.jpg',
      '/images/badge-reel-d3-cad-assembled.png',
      '/images/badge-reel-photo-light-open.png',
      '/images/badge-reel-teardown-light.png',
    ],
  },
  {
    title: 'B.Tech Final Project',
    slug: 'btech-final-project',
    eyebrow: 'Undergrad Capstone',
    context: 'Capstone · RC surveillance-style fixed wing',
    problem:
      'Needed a large, lightweight RC airframe that could carry a high-resolution survey camera with a wide field of view—without guessing the airfoil or propulsion stack.',
    action:
      'Screened airfoils in XFLR5 (Clark Y selected), analyzed Cl/Cd/Cm vs AOA at 10 m/s, verified with wind-tunnel data; sized 1000 Kv / 343 W-class propulsion with bench thrust tests; hand-built Depron, balsa, and boxwood structure from blueprints.',
    result:
      '10 ft span / 7.5 ft fuselage / 3000 g target class; integrated ESC, LiPo, and servos; project featured in The Times of India.',
    tags: [
      'Capstone',
      'XFLR5',
      'Wind tunnel analysis',
      'RC aircraft',
      'Clark Y',
      'Fabrication',
      '3D printing',
      'CAD Design',
      'Simulation',
      'DFM/DFA',
      'Electronics selection',
      'Material selection',
    ],
    cover: '/images/projects/btech/rc-plane-complete.png',
    coverSlides: [
      '/images/projects/btech/rc-plane-complete.png',
      '/images/projects/btech/fabrication-blueprint-wing-2.png',
      '/images/projects/btech/wind-tunnel-airfoil-model.png',
    ],
  },
] as const satisfies readonly PortfolioCarouselEntry[];

/** All projects in carousel order: work first, then personal/capstone at the end */
export const allProjectsCarouselProjects = [
  ...workCarouselProjects,
  ...academicPersonalCarouselProjects,
] as const satisfies readonly PortfolioCarouselEntry[];

export const portfolioCarouselBySlug: Record<string, PortfolioCarouselEntry> = (() => {
  const map: Record<string, PortfolioCarouselEntry> = {};
  for (const entry of [
    ...workCarouselProjects,
    ...academicPersonalCarouselProjects,
    ...cadCarouselProjects,
  ]) {
    map[entry.slug] = entry;
  }
  return map;
})();
