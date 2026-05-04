/**
 * Single source for WorkProjectsCarousel copy and cover slides on the projects index
 * and shared case-study data for `portfolioCarouselBySlug`.
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
      'Wood bench POC → two modular production fixtures (magnetic-swap LIV for packaged engine + Headers; optical beam sizing for the same form factors) plus the LIV test system spec for software.',
    result: '~3× batch throughput vs legacy; LIV + beam-size screening; technician-ready spec.',
    tags: ['SolidWorks', 'GD&T', 'Opto-mechanical', 'Tolerance stacks', 'ISO 13485'],
    cover: '/images/liv-layman-bench-poc.png',
    coverSlides: [
      '/images/liv-layman-bench-poc.png',
      '/images/LIV%20test.svg',
      '/images/Optical%20test.svg',
    ],
  },
  {
    title: 'Press Test Fixture',
    slug: 'press-test-fixture',
    eyebrow: 'Work Project',
    context: 'Press-fit · yield at scale',
    problem:
      'Critical press-fit relied on manual alignment and subjective checks; variation drove yield loss and escapes as volume grew.',
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
    summary:
      'Physical testing is expensive, slow, and gives one answer at a time. Simulation lets you ask "what if" fast: change a geometry, a boundary condition, or a material, and see the effect before touching hardware. My approach: narrow the design space before you build, so hardware iterations are targeted rather than exploratory.',
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
    title: 'SolidWorks Flow Simulation Studies',
    slug: 'solidworks-simulation-studies',
    eyebrow: 'CAD & Simulation',
    context: 'Internal flow · Porous media · Design optimisation',
    problem: '',
    action: '',
    result: '',
    summary: 'SolidWorks Flow Simulation used to evaluate internal flow distribution, pressure drop, and design alternatives before committing to hardware. Each study starts with a baseline, tests multiple configurations, and ends with a clear recommendation backed by quantitative results.',
    studyLinks: [
      { label: 'Catalytic Converter: Flow Optimisation Study', meta: 'SolidWorks Flow Simulation · Porous media · 6-case parametric study', slug: 'catalytic-converter-flow-optimization' },
      { label: 'Wind Tunnel Simulation: Fan Design & Thermal Flow Analysis', meta: 'SolidWorks Flow Simulation · Forced convection · Fan speed parametric study', slug: 'wind-tunnel-fan-simulation' },
      { label: 'CHT: Electronics Enclosure Cooling', meta: 'SolidWorks Flow Simulation · 8-case · Fan config · Heat sink optimisation', slug: 'cht-electronics-cooling' },
      { label: 'Shell & Tube HX: CHT & Flow Arrangement Study', meta: 'SolidWorks Flow Simulation · Conjugate heat transfer · 4-case · Water-water', slug: 'shell-and-tube-hx-flow-simulation' },
    ],
    tags: ['SolidWorks', 'Flow Simulation', 'CFD', 'Porous Media', 'Parametric Study'],
    cover: '/images/catalytic-converter/case6-trajectories.png',
  },
] as const satisfies readonly PortfolioCarouselEntry[];

/** Individual case studies (ANSYS / SolidWorks) for `portfolioCarouselBySlug` and any consumer that needs full P/A/R copy. */
export const simulationStudyCarouselProjects = [
  {
    title: 'CHT Analysis: GPU Thermal Management',
    slug: 'cht-analysis-gpu',
    eyebrow: 'Case Study',
    context: 'Conjugate heat transfer · electronics cooling',
    problem:
      'A graphics card in an enclosure must shed processor heat through fin stacks and forced air; fluid-only or solid-only models would miss the coupled solid-fluid interface and mis-predict hot spots and wall heat flux.',
    action:
      'ANSYS Fluent CHT with a coarse global mesh and a refined inner-enclosure mesh; k-ε turbulence, resolved PCB / processor / fin stack, and the enclosure air domain with boundary conditions matched to the design intent.',
    result:
      'Clear temperature and heat-flux readouts across the assembly; identification of recirculation and hotspot regions to inform thermal path and mesh choices before hardware.',
    tags: [
      'ANSYS Fluent',
      'CFD',
      'Conjugate Heat Transfer',
      'Turbulence Modelling',
      'Mesh Refinement',
      'Thermal Analysis',
      'k-ε Model',
      'Post-processing',
    ],
    cover: '/images/cht-analysis/cht-case1-geometry-3d.jpg',
  },
  {
    title: 'Mixing T-Junction: Thermal Mixing Simulation',
    slug: 't-junction-mixing-simulation',
    eyebrow: 'Case Study',
    context: 'Thermal mixing · parametric sweep',
    problem:
      'Hot and cold airstreams in a 90° mixing tee can leave the outlet poorly mixed. Channel length and momentum ratio both drive how uniform the blended temperature is.',
    action:
      'Three ANSYS Fluent cases: varied tee length and hot/cold momentum ratio, k-ε turbulence, and outlet temperature standard deviation as the metric for mixing quality.',
    result:
      'Quantified how length and momentum ratio move mixing effectiveness, giving a defensible read on which geometry regime delivers consistent outlet temperature.',
    tags: ['ANSYS Fluent', 'CFD', 'Thermal Mixing', 'Momentum Ratio', 'Turbulence Modelling', 'Parametric Study'],
    cover: '/images/t-junction/t-junction-case1-velocity-cutplane.jpg',
  },
  {
    title: 'Flow Over Cylinder: Vortex Shedding Study',
    slug: 'flow-over-cylinder-simulation',
    eyebrow: 'Case Study',
    context: 'Bluff body · transient CFD',
    problem:
      'Periodic vortex shedding at Re = 100 drives lift oscillation, noise, and mixing; steady-only CFD cannot recover the correct shedding frequency and Strouhal number.',
    action:
      'ANSYS Fluent: triangular mesh with inflation on the cylinder, steady and transient solvers, and a velocity-time record for post-processing the shedding frequency.',
    result:
      'Von Kármán street captured in the transient case with Strouhal number aligned to published expectations for the benchmark at this Reynolds number.',
    tags: ['ANSYS Fluent', 'CFD', 'Vortex Shedding', 'Transient Analysis', 'Reynolds Number', 'Strouhal Number'],
    cover: '/images/flow-cylinder/cylinder-case2-vortex-shedding.jpg',
  },
  {
    title: 'Ahmed Body: External Aerodynamics',
    slug: 'ahmed-body-simulation',
    eyebrow: 'Case Study',
    context: 'External flow · grid refinement',
    problem:
      'The Ahmed bluff body is a standard automotive-style benchmark: wake and drag depend strongly on near-wall and wake resolution, so a single grid is often insufficient to judge convergence.',
    action:
      'Multizone hexa mesh with inflation, density-based steady k-ε solver, and a three-level refinement study toward a mesh-independent drag and wake read.',
    result:
      'Documented residuals, force history, and field plots (velocity, pressure, vectors) with discussion of how grid refinement changes wake structure and wall pressure.',
    tags: ['ANSYS Fluent', 'CFD', 'Ahmed body', 'Bluff body', 'k-ε turbulence', 'Mesh refinement', 'External aerodynamics'],
    cover: '/images/ahmed-body/80c6045deb647f4ab1e837af52e5c800.jpg',
  },
  {
    title: 'Catalytic Converter: Flow Optimisation Study',
    slug: 'catalytic-converter-flow-optimization',
    eyebrow: 'Case Study',
    context: 'Internal flow · porous media',
    problem:
      'A baseline converter showed large flow maldistribution on the catalyst face, wasting active area, raising pressure drop, and risking uneven deactivation.',
    action:
      'SolidWorks Flow Simulation: six cases from baseline through baffle and guided-vane ideas, with porous media treatment and parametric comparison of front-face distribution vs total Δp.',
    result:
      'A configuration that both improves catalyst inlet uniformity and reduces total pressure drop, with quantitative plots supporting the down-select.',
    tags: [
      'SolidWorks Flow Simulation',
      'CFD',
      'Porous Media',
      'Internal Flow',
      'Pressure Drop',
      'Parametric Study',
      'Design Optimisation',
    ],
    cover: '/images/catalytic-converter/case6-trajectories.png',
  },
  {
    title: 'Wind Tunnel Simulation: Fan Design & Thermal Flow Analysis',
    slug: 'wind-tunnel-fan-simulation',
    eyebrow: 'Case Study',
    context: 'Axial fan · forced convection',
    problem:
      'A heated fin in a custom tunnel needs a credible forced-convection read across fan operating points; the model must include the parametric fan assembly, tunnel domain, and thermal path.',
    action:
      'Full parametric fan design in SolidWorks, motion where needed, and Flow Simulation runs over a heated fin in the tunnel with fan speed as the swept parameter.',
    result:
      'Clear maps of fin surface and fluid temperature versus fan condition, showing how more aggressive fan operation cools the fin and downstream air.',
    tags: ['SolidWorks', 'Flow Simulation', 'Thermal Analysis', 'Assembly', 'Motion Study'],
    cover: '/images/wind-tunnel/tunnel-fluid-temp-200rps.jpg',
  },
  {
    title: 'CHT: Electronics Enclosure Cooling Optimisation',
    slug: 'cht-electronics-cooling',
    eyebrow: 'Case Study',
    context: 'Enclosure CHT · fan and heat sink',
    problem:
      'A 25 W main chip and 10 W power block in one enclosure need to stay below 85 °C; fan position, shrouding, and heat sink form factor all compete for a narrow thermal budget.',
    action:
      'Eight SolidWorks Flow Simulation CHT cases exploring fan location, shroud, cross-flow, and heat sink options with comparable boundary conditions and goals.',
    result:
      'A ranked view of which layouts meet the temperature goals and the tradeoffs between air routing, part count, and peak silicon case temperature.',
    tags: [
      'SolidWorks Flow Simulation',
      'CHT',
      'Electronics Cooling',
      'Forced Convection',
      'Heat Sink',
      'Parametric Study',
      'Thermal Management',
    ],
    cover: '/images/cht-electronics/case08_cross_fan_temperature_cut.png',
  },
  {
    title: 'Shell & Tube Heat Exchanger: Flow Simulation & CHT Study',
    slug: 'shell-and-tube-hx-flow-simulation',
    eyebrow: 'Case Study',
    context: 'CHT · heat exchanger · internal flow',
    problem:
      'A shell and tube design needs defensible hot and cold outlet temperatures, heat duty, and tube/shell pressure drop before layout changes are committed; ideal counterflow vs parallel assumptions may not match baffle-dominated shell-side behavior.',
    action:
      'SolidWorks Flow Simulation: steady internal CHT with conduction in solids, water-water operation, local mesh at the bundle and baffles, four cases from counterflow baseline through parallel comparison, tube-side inlet refinement, and doubled shell-side velocity.',
    result:
      'Quantified table of bulk outlet temperatures, kW, and Δp: best heat transfer at high shell velocity, best balanced low-Δp design on the tube-inlet optimization case, with energy balance checks and full documentation in the engineering report.',
    tags: [
      'SolidWorks Flow Simulation',
      'Conjugate Heat Transfer',
      'Heat Exchanger',
      'Internal Flow',
      'Thermal Analysis',
      'Parametric Study',
    ],
    cover: '/images/shell-tube-hx/case4-trajectories.png',
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
      'Needed a large, lightweight RC airframe that could carry a high-resolution survey camera with a wide field of view without guessing the airfoil or propulsion stack.',
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
    ...simulationStudyCarouselProjects,
  ]) {
    map[entry.slug] = entry;
  }
  return map;
})();
