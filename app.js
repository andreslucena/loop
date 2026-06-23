const state = {
  step: 1,
  cityId: null,
  topics: new Set(),
  matches: [],
  activeProjectId: null,
  userSubmissions: [],
  wheelRotation: 0,
  funnelStep: 1,
  selectedSubmissionId: null,
  pendingBadgeCelebration: false,
};

const cities = [
  { id: "estonia", name: "Estonia", levels: ["Baltic Region", "European Union"] },
  { id: "porto", name: "Porto", levels: ["Norte", "Portugal", "European Union"] },
  { id: "krakow", name: "Krakow", levels: ["Lesser Poland", "Poland", "European Union"] },
  { id: "bologna", name: "Bologna", levels: ["Emilia-Romagna", "Italy", "European Union"] },
  { id: "barcelona", name: "Barcelona", levels: ["Catalonia", "Spain", "European Union"] },
  { id: "madrid", name: "Madrid", levels: ["Community of Madrid", "Spain", "European Union"] },
  { id: "paris", name: "Paris", levels: ["Ile-de-France", "France", "European Union"] },
  { id: "berlin", name: "Berlin", levels: ["Berlin", "Germany", "European Union"] },
  { id: "hamburg", name: "Hamburg", levels: ["Hamburg", "Germany", "European Union"] },
  { id: "munich", name: "Munich", levels: ["Bavaria", "Germany", "European Union"] },
  { id: "rome", name: "Rome", levels: ["Lazio", "Italy", "European Union"] },
  { id: "milan", name: "Milan", levels: ["Lombardy", "Italy", "European Union"] },
  { id: "naples", name: "Naples", levels: ["Campania", "Italy", "European Union"] },
  { id: "lisbon", name: "Lisbon", levels: ["Lisbon", "Portugal", "European Union"] },
  { id: "athens", name: "Athens", levels: ["Attica", "Greece", "European Union"] },
  { id: "thessaloniki", name: "Thessaloniki", levels: ["Central Macedonia", "Greece", "European Union"] },
  { id: "brussels", name: "Brussels", levels: ["Brussels-Capital Region", "Belgium", "European Union"] },
  { id: "antwerp", name: "Antwerp", levels: ["Flanders", "Belgium", "European Union"] },
  { id: "amsterdam", name: "Amsterdam", levels: ["North Holland", "Netherlands", "European Union"] },
  { id: "rotterdam", name: "Rotterdam", levels: ["South Holland", "Netherlands", "European Union"] },
  { id: "the-hague", name: "The Hague", levels: ["South Holland", "Netherlands", "European Union"] },
  { id: "vienna", name: "Vienna", levels: ["Vienna", "Austria", "European Union"] },
  { id: "prague", name: "Prague", levels: ["Prague", "Czech Republic", "European Union"] },
  { id: "brno", name: "Brno", levels: ["South Moravian", "Czech Republic", "European Union"] },
  { id: "warsaw", name: "Warsaw", levels: ["Mazovia", "Poland", "European Union"] },
  { id: "gdansk", name: "Gdansk", levels: ["Pomeranian", "Poland", "European Union"] },
  { id: "wroclaw", name: "Wroclaw", levels: ["Lower Silesian", "Poland", "European Union"] },
  { id: "budapest", name: "Budapest", levels: ["Central Hungary", "Hungary", "European Union"] },
  { id: "bucharest", name: "Bucharest", levels: ["Bucharest-Ilfov", "Romania", "European Union"] },
  { id: "cluj-napoca", name: "Cluj-Napoca", levels: ["Cluj", "Romania", "European Union"] },
  { id: "sofia", name: "Sofia", levels: ["Sofia City", "Bulgaria", "European Union"] },
  { id: "plovdiv", name: "Plovdiv", levels: ["Plovdiv", "Bulgaria", "European Union"] },
  { id: "zagreb", name: "Zagreb", levels: ["City of Zagreb", "Croatia", "European Union"] },
  { id: "ljubljana", name: "Ljubljana", levels: ["Central Slovenia", "Slovenia", "European Union"] },
  { id: "bratislava", name: "Bratislava", levels: ["Bratislava", "Slovakia", "European Union"] },
  { id: "dublin", name: "Dublin", levels: ["Leinster", "Ireland", "European Union"] },
  { id: "cork", name: "Cork", levels: ["Munster", "Ireland", "European Union"] },
  { id: "london", name: "London", levels: ["Greater London", "United Kingdom"] },
  { id: "manchester", name: "Manchester", levels: ["North West", "United Kingdom"] },
  { id: "edinburgh", name: "Edinburgh", levels: ["Scotland", "United Kingdom"] },
  { id: "glasgow", name: "Glasgow", levels: ["Scotland", "United Kingdom"] },
  { id: "copenhagen", name: "Copenhagen", levels: ["Capital Region", "Denmark", "European Union"] },
  { id: "aarhus", name: "Aarhus", levels: ["Central Denmark", "Denmark", "European Union"] },
  { id: "stockholm", name: "Stockholm", levels: ["Stockholm County", "Sweden", "European Union"] },
  { id: "gothenburg", name: "Gothenburg", levels: ["Vastra Gotaland", "Sweden", "European Union"] },
  { id: "oslo", name: "Oslo", levels: ["Oslo", "Norway"] },
  { id: "bergen", name: "Bergen", levels: ["Vestland", "Norway"] },
  { id: "helsinki", name: "Helsinki", levels: ["Uusimaa", "Finland", "European Union"] },
  { id: "tampere", name: "Tampere", levels: ["Pirkanmaa", "Finland", "European Union"] },
  { id: "riga", name: "Riga", levels: ["Riga", "Latvia", "European Union"] },
  { id: "vilnius", name: "Vilnius", levels: ["Vilnius County", "Lithuania", "European Union"] },
  { id: "tallinn", name: "Tallinn", levels: ["Harju", "Estonia", "European Union"] },
  { id: "luxembourg-city", name: "Luxembourg City", levels: ["Luxembourg", "Luxembourg", "European Union"] },
  { id: "valletta", name: "Valletta", levels: ["South Eastern", "Malta", "European Union"] },
  { id: "nicosia", name: "Nicosia", levels: ["Nicosia", "Cyprus", "European Union"] },
];

const FEATURED_CITY_IDS = ["estonia", "porto", "krakow", "bologna"];
const MAX_CITY_CARDS = 12;

const topicMeta = {
  Housing: { icon: "🏠" },
  Transport: { icon: "🚇" },
  Health: { icon: "🩺" },
  Education: { icon: "📚" },
  Safety: { icon: "🛡️" },
  Environment: { icon: "🌿" },
  Culture: { icon: "🎭" },
  Sports: { icon: "⚽" },
  "Urban Planning": { icon: "🏗️" },
  Democracy: { icon: "🗳️" },
  Equality: { icon: "⚖️" },
  Justice: { icon: "🏛️" },
  Immigration: { icon: "🧭" },
  Technology: { icon: "💻" },
  Energy: { icon: "⚡" },
  Economy: { icon: "📈" },
};

const allTopics = Object.keys(topicMeta);

const projects = [
  {
    id: "eu-ai-liability",
    scope: ["European Union"],
    topics: ["Technology", "Democracy", "Justice"],
    institution: "European Union",
    opinionCount: 1824,
    deadline: "Open until Jul 15, 2026",
    realTitle:
      "Directive 2024/1689 - Liability rules for AI-generated outputs (public comment period)",
    plainTitle: "Should AI companies be responsible for harmful AI decisions?",
    summary:
      "The European Commission is considering whether product liability rules should be updated for AI systems used in public services, work, and healthcare.",
    keyPoints: [
      "High-risk AI decisions may need human-readable explanations.",
      "People harmed by AI errors could gain stronger compensation rights.",
      "Companies may face transparency duties for training and testing data.",
    ],
    communityOpinions: [
      "I agree with stronger safeguards, especially where AI affects hiring.",
      "The proposal should include easier complaint channels for citizens.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "porto-river-mobility",
    scope: ["Porto"],
    topics: ["Transport", "Environment", "Urban Planning"],
    institution: "Municipality of Porto",
    opinionCount: 768,
    deadline: "Open until Sep 10, 2026",
    realTitle:
      "Draft plan for riverfront mobility corridor and integrated bus-priority redesign",
    plainTitle: "How should Porto improve riverfront transport and public space?",
    summary:
      "Porto is collecting input on bus-priority lanes, cycling safety, and better pedestrian access along the Douro corridor.",
    keyPoints: [
      "Peak-hour bus lanes may reduce private vehicle congestion.",
      "Street redesign options include wider sidewalks and crossing upgrades.",
      "Heat mitigation and tree canopy goals are tied to mobility changes.",
    ],
    communityOpinions: [
      "Please protect bike lanes from parked cars.",
      "Bus lanes are needed, but keep loading access for local businesses.",
    ],
    officialUrl: "https://www.cm-porto.pt/",
  },
  {
    id: "estonia-digital-services",
    scope: ["Estonia"],
    topics: ["Technology", "Democracy", "Justice"],
    institution: "Government of Estonia",
    opinionCount: 1104,
    deadline: "Open until Aug 27, 2026",
    realTitle:
      "National consultation on standards for digital civic services and transparent appeals",
    plainTitle: "How should Estonia make online public services simpler and fairer?",
    summary:
      "Estonia proposes common standards for digital forms, identity checks, and appeal tracking across ministries.",
    keyPoints: [
      "Unified response-time commitments may apply to all digital requests.",
      "Appeal status updates could be visible in one central portal.",
      "Accessibility and language support requirements are under review.",
    ],
    communityOpinions: [
      "The portal is strong already; focus on clearer appeal timelines.",
      "Please ensure older users can still access assisted channels.",
    ],
    officialUrl: "https://www.valitsus.ee/en",
  },
  {
    id: "krakow-clean-heat",
    scope: ["Krakow", "Lesser Poland", "Poland"],
    topics: ["Health", "Environment", "Energy"],
    institution: "City of Krakow",
    opinionCount: 934,
    deadline: "Open until Oct 4, 2026",
    realTitle:
      "Program update on district heating transition and household clean-energy support",
    plainTitle: "What should Krakow prioritize to reduce winter air pollution?",
    summary:
      "The city is reviewing household heating transitions, support eligibility, and neighborhood air monitoring improvements.",
    keyPoints: [
      "Subsidy rules for cleaner heating systems are being updated.",
      "Air monitoring stations may expand in school zones.",
      "Enforcement and support timelines are open for comment.",
    ],
    communityOpinions: [
      "Subsidies should reach renters, not only homeowners.",
      "Monitoring near schools should be implemented first.",
    ],
    officialUrl: "https://www.krakow.pl/",
  },
  {
    id: "bologna-affordable-rent",
    scope: ["Bologna", "Emilia-Romagna", "Italy"],
    topics: ["Housing", "Economy", "Equality"],
    institution: "City of Bologna",
    opinionCount: 846,
    deadline: "Open until Sep 21, 2026",
    realTitle:
      "Municipal framework for affordable rent zones and long-term tenancy protections",
    plainTitle: "How should Bologna protect residents from rising rents?",
    summary:
      "Bologna is consulting on rent pressure indicators, tenant protection measures, and incentives for long-term rental supply.",
    keyPoints: [
      "Data-driven rent pressure zones may trigger targeted policies.",
      "Landlord incentives are proposed for long-term affordable contracts.",
      "Tenant legal support access is under review.",
    ],
    communityOpinions: [
      "Students need dedicated affordability measures.",
      "Please include enforcement for repeated rent abuses.",
    ],
    officialUrl: "https://www.comune.bologna.it/",
  },
  {
    id: "eu-migrant-services",
    scope: ["European Union", "Italy", "Poland", "Portugal", "Estonia"],
    topics: ["Immigration", "Equality", "Health"],
    institution: "European Union",
    opinionCount: 1589,
    deadline: "Open until Nov 5, 2026",
    realTitle:
      "Consultation on minimum standards for local integration services in member states",
    plainTitle: "What support should newcomers receive in their first year?",
    summary:
      "The proposal sets baseline access to language training, legal orientation, mental health services, and school enrollment support.",
    keyPoints: [
      "Cities may receive direct EU support for first-contact services.",
      "Minimum service timelines would be tracked by each member state.",
      "Community organizations could co-design local implementation plans.",
    ],
    communityOpinions: [
      "Legal orientation should be available in plain language.",
      "Mental health support needs dedicated funding from day one.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "eu-grid-flex",
    scope: ["European Union"],
    topics: ["Energy", "Environment", "Economy"],
    institution: "European Union",
    opinionCount: 877,
    deadline: "Open until Aug 18, 2026",
    realTitle:
      "Public consultation on electricity market flexibility and storage participation",
    plainTitle: "Should households be paid for flexible clean energy use?",
    summary:
      "The EU seeks feedback on policies that reward households, cooperatives, and businesses for shifting energy use away from peak hours.",
    keyPoints: [
      "Member states may need local flexibility markets.",
      "Battery and demand-response aggregators could get easier grid access.",
      "Consumer protections for dynamic pricing are under review.",
    ],
    communityOpinions: [
      "Please simplify the billing information for households.",
      "Community energy groups should have a fast onboarding path.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
];

const seededSubmissions = [
  {
    id: "seed-1",
    projectId: "eu-ai-liability",
    projectTitle: "Should AI companies be responsible for harmful AI decisions?",
    stance: "agree",
    submittedAt: "2 weeks ago",
    status: "Under review",
    update: "EU consultation team published first response summary.",
    submittedOpinion:
      "I support stronger accountability for high-risk AI. Citizens should have clear complaint channels and plain-language explanations when decisions affect work, healthcare, or housing.",
    opinionsFromOthers: [
      "Need clear deadlines for company responses.",
      "Please include stronger rights for workers impacted by automated decisions.",
    ],
  },
  {
    id: "seed-2",
    projectId: "porto-river-mobility",
    projectTitle: "How should Porto improve riverfront transport and public space?",
    stance: "agree",
    submittedAt: "1 month ago",
    status: "Accepted",
    update: "Municipality included pedestrian crossing improvements in draft v2.",
    submittedOpinion:
      "I support bus-priority lanes if crossings and bike safety are implemented first in high-footfall zones.",
    opinionsFromOthers: [
      "Keep loading access windows for shops.",
      "Bus priority should include accessibility upgrades at stations.",
    ],
  },
  {
    id: "seed-3",
    projectId: "krakow-clean-heat",
    projectTitle: "What should Krakow prioritize to reduce winter air pollution?",
    stance: "disagree",
    submittedAt: "3 weeks ago",
    status: "Pending",
    update: "No municipal update yet.",
    submittedOpinion:
      "The subsidy model should include tenants, not just homeowners, or inequality will increase.",
    opinionsFromOthers: [
      "Expand school-zone monitors first.",
      "Need clearer enforcement milestones by district.",
    ],
  },
  {
    id: "seed-4",
    projectId: "bologna-affordable-rent",
    projectTitle: "How should Bologna protect residents from rising rents?",
    stance: "agree",
    submittedAt: "6 days ago",
    status: "Under review",
    update: "City opened second round with additional tenant-protection options.",
    submittedOpinion:
      "I support rent pressure zones, but legal aid and transparent enforcement are essential to make policy effective.",
    opinionsFromOthers: [
      "Need student-specific protection measures.",
      "Long-term lease incentives are useful if accountability is strong.",
    ],
  },
  {
    id: "seed-5",
    projectId: "eu-grid-flex",
    projectTitle: "Should households be paid for flexible clean energy use?",
    stance: "agree",
    submittedAt: "4 days ago",
    status: "Pending",
    update: "Draft impact note expected next month.",
    submittedOpinion:
      "Households should be compensated fairly, and pricing rules must be understandable for non-experts.",
    opinionsFromOthers: [
      "Billing dashboards need plain-language explanations.",
      "Protect low-income households from pricing volatility.",
    ],
  },
  {
    id: "seed-6",
    projectId: "eu-migrant-services",
    projectTitle: "What support should newcomers receive in their first year?",
    stance: "agree",
    submittedAt: "Yesterday",
    status: "Under review",
    update: "Community organizations invited to implementation workshop.",
    submittedOpinion:
      "I support minimum service standards, especially legal orientation and mental health support in the first months.",
    opinionsFromOthers: [
      "Language classes should start in week one.",
      "Include school support for families with children.",
    ],
  },
];

const badges = [
  {
    id: "first-submission",
    name: "First Voice",
    description: "Unlocked after your first submission",
    threshold: 1,
    icon: "🥇",
  },
  {
    id: "three-submissions",
    name: "Civic Contributor",
    description: "Unlocked after 3 submissions",
    threshold: 3,
    icon: "🏅",
  },
];

const socialMeta = {
  WhatsApp: {
    chipClass: "border-transparent bg-[#25D366] text-white shadow-[0_8px_18px_rgba(37,211,102,0.35)]",
    iconClass: "text-[#25D366]",
    svg: '<svg viewBox="0 0 32 32" aria-hidden="true" class="h-4 w-4 fill-current"><path d="M19.11 17.21c-.27-.14-1.57-.77-1.82-.86-.24-.09-.42-.13-.6.14-.18.27-.68.86-.83 1.04-.15.18-.3.2-.56.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.3.41-.45.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.45-.83-1.99-.22-.53-.45-.46-.6-.47l-.51-.01c-.18 0-.45.07-.68.34-.24.27-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.14.18 1.8 2.76 4.37 3.87.61.26 1.09.42 1.46.54.61.19 1.16.16 1.6.1.49-.07 1.57-.64 1.79-1.25.22-.61.22-1.13.16-1.25-.07-.12-.24-.2-.51-.34z"></path><path d="M16 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3 29l6.78-1.78a12.74 12.74 0 0 0 6.22 1.58c7.07 0 12.8-5.73 12.8-12.8S23.07 3.2 16 3.2zm0 23.27c-2.01 0-3.97-.53-5.68-1.54l-.41-.24-4.02 1.06 1.07-3.92-.27-.4a10.3 10.3 0 0 1-1.6-5.43c0-5.69 4.63-10.32 10.32-10.32s10.32 4.63 10.32 10.32-4.63 10.32-10.32 10.32z"></path></svg>',
  },
  X: {
    chipClass: "border-transparent bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
    iconClass: "text-black",
    svg: '<svg viewBox="0 0 1200 1227" aria-hidden="true" class="h-4 w-4 fill-current"><path d="M714 519 1160 0h-106L667 450 357 0H0l468 681L0 1227h106l409-476 328 476h357L714 519zM569 688l-48-69L140 72h162l307 442 48 69 399 574H894L569 688z"></path></svg>',
  },
  Facebook: {
    chipClass: "border-transparent bg-[#1877F2] text-white shadow-[0_8px_18px_rgba(24,119,242,0.35)]",
    iconClass: "text-[#1877F2]",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 fill-current"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.017 4.388 11.006 10.125 11.927V15.56H7.078v-3.487h3.047V9.414c0-3.017 1.792-4.688 4.533-4.688 1.313 0 2.686.236 2.686.236v2.963h-1.513c-1.49 0-1.956.93-1.956 1.885v2.263h3.328l-.532 3.487h-2.796V24C19.612 23.079 24 18.09 24 12.073z"></path></svg>',
  },
  Instagram: {
    chipClass: "border-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[0_8px_18px_rgba(221,42,123,0.35)]",
    iconClass: "text-[#E4405F]",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4 fill-current"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"></path></svg>',
  },
};

const cityGrid = document.getElementById("city-grid");
const citySearchInput = document.getElementById("city-search");
const locationSuggestions = document.getElementById("location-suggestions");
const citySearchEmpty = document.getElementById("city-search-empty");
const topicGrid = document.getElementById("topic-grid");
const progressTabs = document.querySelector('section[aria-label="Progress"]');
const resultIntro = document.getElementById("result-intro");
const projectList = document.getElementById("consultation-list");
const projectDetail = document.getElementById("consultation-detail");
const emptyState = document.getElementById("empty-state");
const selectionHint = document.getElementById("selection-hint");
const randomTopicButton = document.getElementById("random-topic");
const randomTopicResult = document.getElementById("random-topic-result");
const topicWheel = document.getElementById("topic-wheel");
const badgePanel = document.getElementById("badge-panel");
const badgeList = document.getElementById("badge-list");
const badgeProgressText = document.getElementById("badge-progress-text");
const completionFunnel = document.getElementById("completion-funnel");
const funnelStepLabel = document.getElementById("funnel-step-label");
const funnelProgressBar = document.getElementById("funnel-progress-bar");
const funnelStepContent = document.getElementById("funnel-step-content");
const funnelActions = document.getElementById("funnel-actions");
const pastSubmissionsPanel = document.getElementById("past-submissions");
const pastSubmissionsList = document.getElementById("past-submissions-list");
const submissionDetailView = document.getElementById("submission-detail-view");
const submissionDetailContent = document.getElementById("submission-detail-content");
const backToSubmissionsButton = document.getElementById("back-to-submissions");

const step1Error = document.getElementById("step-1-error");
const step2Error = document.getElementById("step-2-error");

document.getElementById("to-step-2").addEventListener("click", () => {
  if (!state.cityId) {
    step1Error.hidden = false;
    return;
  }
  step1Error.hidden = true;
  setStep(2, { scrollToProgress: true });
});

document.getElementById("back-to-1").addEventListener("click", () =>
  setStep(1, { scrollToProgress: true })
);

document.getElementById("to-step-3").addEventListener("click", () => {
  if (!state.topics.size) {
    step2Error.hidden = false;
    return;
  }
  step2Error.hidden = true;
  applyFilters();
  setStep(3, { scrollToProgress: true });
});

document.getElementById("back-to-2").addEventListener("click", () =>
  setStep(2, { scrollToProgress: true })
);

citySearchInput.addEventListener("input", () => {
  renderCities(citySearchInput.value);
});

citySearchInput.addEventListener("change", () => {
  trySelectCityFromSearch(citySearchInput.value);
});

citySearchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  event.preventDefault();
  trySelectCityFromSearch(citySearchInput.value);
});

randomTopicButton.addEventListener("click", spinRandomTopic);

for (const marker of document.querySelectorAll("[data-step-marker]")) {
  marker.classList.add("cursor-pointer");
  marker.addEventListener("click", () => {
    const targetStep = Number(marker.dataset.stepMarker);
    if (targetStep === 3 && state.cityId && state.topics.size) {
      applyFilters();
    }
    setStep(targetStep, { scrollToProgress: true });
  });

  marker.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    const targetStep = Number(marker.dataset.stepMarker);
    if (targetStep === 3 && state.cityId && state.topics.size) {
      applyFilters();
    }
    setStep(targetStep, { scrollToProgress: true });
  });
}

backToSubmissionsButton.addEventListener("click", () => {
  state.selectedSubmissionId = null;
  renderPastSubmissions();
});

function handleBrowserNavigation() {
  const requestedStep = parseStepFromLocation();
  if (requestedStep === 3 && state.cityId && state.topics.size) {
    applyFilters();
  }
  setStep(requestedStep, { historyMode: "none", scrollToProgress: true });
}

window.addEventListener("hashchange", handleBrowserNavigation);

const STEP_TRANSITION_MS = 260;
const STEP_TITLE_SCROLL_OFFSET = 96;

function parseStepFromLocation() {
  const match = window.location.hash.match(/^#step-(\d)$/);
  if (!match) {
    return 1;
  }
  const parsed = Number(match[1]);
  return parsed >= 1 && parsed <= 3 ? parsed : 1;
}

function normalizeStepForState(step) {
  if (step >= 2 && !state.cityId) {
    return 1;
  }
  if (step >= 3 && !state.topics.size) {
    return 2;
  }
  return step;
}

function syncHistory(step, mode = "push") {
  const url = `#step-${step}`;
  if (mode === "replace") {
    window.history.replaceState({ step }, "", url);
    return;
  }
  if (mode === "push") {
    window.history.pushState({ step }, "", url);
  }
}

function scrollToProgressTabs() {
  if (!progressTabs) {
    return;
  }
  const targetTop = progressTabs.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

function scrollToStepTitle(stepNumber) {
  const panel = document.querySelector(`[data-step="${stepNumber}"]`);
  const heading = panel?.querySelector("h2");
  if (!heading) {
    return;
  }
  const targetTop = heading.getBoundingClientRect().top + window.scrollY - STEP_TITLE_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

function initializeStepPanels() {
  for (const panel of document.querySelectorAll("[data-step]")) {
    panel.classList.add("transition-all", "duration-300", "ease-out");
    if (panel.hidden) {
      panel.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
      panel.classList.remove("opacity-100", "translate-y-0");
    } else {
      panel.classList.add("opacity-100", "translate-y-0");
      panel.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
    }
  }
}

function setStep(step, options = {}) {
  const historyMode = options.historyMode ?? "push";
  const shouldScrollToProgress = options.scrollToProgress ?? false;
  const targetStep = normalizeStepForState(step);
  const panels = [...document.querySelectorAll("[data-step]")];
  const nextPanel = panels.find((panel) => Number(panel.dataset.step) === targetStep);
  const currentPanel = panels.find((panel) => !panel.hidden);

  if (!nextPanel) {
    return;
  }

  state.step = targetStep;

  for (const panel of panels) {
    if (panel !== nextPanel && panel !== currentPanel) {
      panel.hidden = true;
      panel.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
      panel.classList.remove("opacity-100", "translate-y-0");
    }
  }

  if (currentPanel && currentPanel !== nextPanel) {
    currentPanel.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
    currentPanel.classList.remove("opacity-100", "translate-y-0");

    window.setTimeout(() => {
      if (state.step !== Number(currentPanel.dataset.step)) {
        currentPanel.hidden = true;
      }
    }, STEP_TRANSITION_MS);
  }

  nextPanel.hidden = false;
  nextPanel.classList.remove("pointer-events-none");
  nextPanel.classList.add("opacity-0", "translate-y-2");

  window.requestAnimationFrame(() => {
    nextPanel.classList.remove("opacity-0", "translate-y-2");
    nextPanel.classList.add("opacity-100", "translate-y-0");
  });

  for (const marker of document.querySelectorAll("[data-step-marker]")) {
    const isActive = Number(marker.dataset.stepMarker) === targetStep;
    const dot = marker.querySelector("[data-step-dot]");

    marker.classList.toggle("border-loop-blue", isActive);
    marker.classList.toggle("bg-loop-blue/10", isActive);

    if (dot) {
      dot.classList.toggle("bg-loop-blue", isActive);
      dot.classList.toggle("text-white", isActive);
      dot.classList.toggle("border-loop-blue", isActive);
    }
  }

  if (historyMode !== "none") {
    syncHistory(targetStep, historyMode);
  }

  if (shouldScrollToProgress) {
    if (targetStep === 3) {
      window.setTimeout(() => {
        if (state.step === 3) {
          scrollToStepTitle(3);
        }
      }, STEP_TRANSITION_MS + 20);
    } else {
      scrollToProgressTabs();
    }
  }
}

function renderCities(query = "") {
  cityGrid.innerHTML = "";
  const normalized = query.trim().toLowerCase();
  const featuredCities = FEATURED_CITY_IDS.map((id) => cities.find((city) => city.id === id)).filter(Boolean);
  let filteredCities = cities.filter((city) => {
    if (!normalized) {
      return false;
    }
    return (
      city.name.toLowerCase().includes(normalized) ||
      city.levels.some((level) => level.toLowerCase().includes(normalized))
    );
  });

  if (!normalized) {
    filteredCities = [...featuredCities];
  }

  if (state.cityId && !filteredCities.some((city) => city.id === state.cityId)) {
    const selectedCity = cities.find((city) => city.id === state.cityId);
    if (selectedCity) {
      filteredCities.unshift(selectedCity);
    }
  }

  filteredCities = filteredCities.slice(0, MAX_CITY_CARDS);

  citySearchEmpty.hidden = filteredCities.length > 0;

  for (const city of filteredCities) {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "w-full rounded-xl border border-slate-300 bg-white p-4 text-left shadow-[0_1px_0_rgba(28,43,51,0.08)] transition hover:-translate-y-0.5 hover:border-loop-blue/70 hover:bg-loop-blue/5 hover:shadow-[0_8px_20px_rgba(31,95,168,0.2)]";
    button.setAttribute("role", "radio");
    const selected = state.cityId === city.id;
    button.setAttribute("aria-checked", String(selected));
    button.classList.toggle("border-loop-blue", selected);
    button.classList.toggle("bg-loop-blue/10", selected);
    button.classList.toggle("ring-2", selected);
    button.classList.toggle("ring-loop-blue/30", selected);
    if (!selected) {
      button.classList.add("border-slate-300");
    }
    button.innerHTML = `
      <span class="mb-1 block text-base font-semibold">${city.name}</span>
      <span class="text-sm text-slate-600">${city.levels.join(" - ")}</span>
    `;
    button.addEventListener("click", () => {
      state.cityId = city.id;
      step1Error.hidden = true;
      renderCities(citySearchInput.value);
      renderResultIntro();
    });
    cityGrid.appendChild(button);
  }
}

function trySelectCityFromSearch(rawValue) {
  const query = rawValue.trim().toLowerCase();
  if (!query) {
    return;
  }

  const matchedCity = cities.find((city) => city.name.toLowerCase() === query);
  if (!matchedCity) {
    renderCities(rawValue);
    return;
  }

  state.cityId = matchedCity.id;
  step1Error.hidden = true;
  citySearchInput.value = matchedCity.name;
  renderCities(matchedCity.name);
  renderResultIntro();
}

function renderLocationSuggestions() {
  if (!locationSuggestions) {
    return;
  }

  const suggestionValues = new Set();
  for (const city of cities) {
    suggestionValues.add(city.name);
    for (const level of city.levels) {
      suggestionValues.add(level);
    }
  }

  locationSuggestions.innerHTML = [...suggestionValues]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => `<option value="${value}"></option>`)
    .join("");
}

function renderTopics() {
  topicGrid.innerHTML = "";
  for (const topic of allTopics) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className =
      "rounded-full border border-slate-400 bg-slate-50 px-3 py-2 text-left text-sm text-slate-800 shadow-[0_1px_0_rgba(28,43,51,0.07)] transition hover:-translate-y-0.5 hover:border-loop-blue/70 hover:bg-loop-blue/5 hover:shadow-[0_6px_16px_rgba(31,95,168,0.18)]";
    chip.innerHTML = `<span class="mr-1.5">${topicMeta[topic].icon}</span>${topic}`;
    const active = state.topics.has(topic);
    chip.classList.toggle("border-slate-400", !active);
    chip.classList.toggle("bg-slate-50", !active);
    chip.classList.toggle("text-slate-800", !active);
    chip.classList.toggle("border-loop-blue", active);
    chip.classList.toggle("bg-loop-blue/10", active);
    chip.classList.toggle("text-loop-ink", active);
    chip.classList.toggle("font-semibold", active);
    chip.classList.toggle("ring-2", active);
    chip.classList.toggle("ring-loop-blue/30", active);
    chip.setAttribute("aria-pressed", String(active));
    chip.addEventListener("click", () => {
      if (state.topics.has(topic)) {
        state.topics.delete(topic);
      } else {
        state.topics.add(topic);
      }
      step2Error.hidden = true;
      renderTopics();
      renderTopicHint();
    });
    topicGrid.appendChild(chip);
  }
}

function buildWheelBackground() {
  const slices = allTopics.length;
  const segment = 360 / slices;
  const palette = [
    "#fde68a",
    "#fca5a5",
    "#93c5fd",
    "#86efac",
    "#c4b5fd",
    "#fdba74",
    "#67e8f9",
    "#f9a8d4",
  ];

  const gradientStops = allTopics
    .map((_, index) => {
      const color = palette[index % palette.length];
      const start = index * segment;
      const end = (index + 1) * segment;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  topicWheel.style.background = `conic-gradient(${gradientStops})`;
}

function spinRandomTopic() {
  randomTopicButton.disabled = true;
  randomTopicResult.textContent = "Spinning...";
  const randomIndex = Math.floor(Math.random() * allTopics.length);
  const randomTopic = allTopics[randomIndex];
  const segment = 360 / allTopics.length;
  const centerAngle = randomIndex * segment + segment / 2;
  const extraSpins = 360 * (4 + Math.floor(Math.random() * 3));
  const target = state.wheelRotation + extraSpins + (360 - centerAngle);

  topicWheel.style.transform = `rotate(${target}deg)`;

  window.setTimeout(() => {
    state.topics.add(randomTopic);
    renderTopics();
    renderTopicHint();
    randomTopicResult.textContent = `Wheel picked: ${topicMeta[randomTopic].icon} ${randomTopic}`;
    state.wheelRotation = target % 360;
    randomTopicButton.disabled = false;
  }, 2200);
}

function renderTopicHint() {
  if (!state.topics.size) {
    selectionHint.textContent = "No topics selected yet.";
    return;
  }
  selectionHint.textContent = `Selected topics: ${[...state.topics].join(", ")}.`;
}

function getSelectedCity() {
  return cities.find((city) => city.id === state.cityId) || null;
}

function applyFilters() {
  const city = getSelectedCity();
  if (!city) {
    state.matches = [];
    return;
  }

  const allowedScopes = new Set([city.name, ...city.levels]);
  state.matches = projects.filter((project) => {
    const matchesScope = project.scope.some((s) => allowedScopes.has(s));
    const matchesTopic = project.topics.some((topic) => state.topics.has(topic));
    return matchesScope && matchesTopic;
  });

  state.activeProjectId = state.matches[0]?.id || null;
  renderResults();
}

function getProjectLevel(project, city) {
  if (!city) {
    return project.scope[0] || "Unknown";
  }
  const orderedScopes = [city.name, ...city.levels];
  return orderedScopes.find((scope) => project.scope.includes(scope)) || project.scope[0] || "Unknown";
}

function normalizeInstitutionLevel(levelLabel) {
  const label = (levelLabel || "").toLowerCase();
  if (label.includes("european") || label.includes("union")) {
    return "european";
  }
  if (label.includes("region") || label.includes("county") || label.includes("state") || label.includes("province")) {
    return "regional";
  }
  if (label.includes("country") || label.includes("national") || label.includes("portugal") || label.includes("spain") || label.includes("france") || label.includes("germany") || label.includes("italy") || label.includes("poland") || label.includes("estonia") || label.includes("ireland") || label.includes("belgium") || label.includes("netherlands") || label.includes("austria") || label.includes("czech") || label.includes("romania") || label.includes("bulgaria") || label.includes("croatia") || label.includes("slovenia") || label.includes("slovakia") || label.includes("denmark") || label.includes("sweden") || label.includes("finland") || label.includes("latvia") || label.includes("lithuania") || label.includes("luxembourg") || label.includes("malta") || label.includes("cyprus") || label.includes("united kingdom") || label.includes("norway")) {
    return "national";
  }
  return "local";
}

function getLevelBadgeClass(levelLabel) {
  const level = normalizeInstitutionLevel(levelLabel);
  if (level === "european") {
    return "bg-levels-european/15 text-levels-european border-levels-european/35";
  }
  if (level === "regional") {
    return "bg-levels-regional/15 text-[#8a6411] border-levels-regional/45";
  }
  if (level === "national") {
    return "bg-levels-national/15 text-levels-national border-levels-national/35";
  }
  return "bg-levels-local/15 text-levels-local border-levels-local/35";
}

function renderResultIntro() {
  const city = getSelectedCity();
  const topics = [...state.topics];

  if (!city) {
    resultIntro.textContent = "Choose your location and topics to view projects.";
    return;
  }
  if (!topics.length) {
    resultIntro.textContent = `Covering governments from ${city.name} to ${city.levels[city.levels.length - 1]}.`;
    return;
  }

  resultIntro.textContent = `Based on your interests in ${topics.join(", ")} - covering governments from ${city.name} to ${city.levels[city.levels.length - 1]}.`;
}

function getAllSubmissions() {
  return [...state.userSubmissions, ...seededSubmissions];
}

function getLatestSubmission() {
  return state.userSubmissions[0] || seededSubmissions[0] || null;
}

function getBadgeProgress() {
  const count = state.userSubmissions.length;
  return {
    count,
    firstUnlocked: count >= 1,
    thirdUnlocked: count >= 3,
    remainingToThird: Math.max(0, 3 - count),
  };
}

function renderBadges() {
  if (!badgeList || !badgeProgressText) {
    return;
  }

  const progress = getBadgeProgress();
  badgeProgressText.textContent =
    progress.count === 0
      ? "Make your first submission to unlock your first badge."
      : progress.remainingToThird > 0
        ? `Great start. You have ${progress.count}/3 submissions toward your next badge.`
        : "Amazing. You unlocked both participation badges.";

  badgeList.innerHTML = badges
    .map((badge) => {
      const unlocked = progress.count >= badge.threshold;
      return `<article class="relative overflow-hidden rounded-xl border p-3 ${
        unlocked
          ? "border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 shadow-[0_14px_28px_rgba(251,146,60,0.28)]"
          : "border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50"
      }" data-badge-card="${badge.id}" data-badge-unlocked="${unlocked}">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-8 ${
          unlocked ? "bg-gradient-to-r from-transparent via-white/70 to-transparent animate-pulse" : "hidden"
        }"></div>
        <div class="relative flex items-start gap-3">
          <div class="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border ${
            unlocked
              ? "border-amber-300 bg-gradient-to-br from-yellow-200 to-amber-400 text-lg shadow-[0_6px_14px_rgba(245,158,11,0.35)]"
              : "border-slate-300 bg-white text-base"
          }">${badge.icon}</div>
          <div class="min-w-0">
            <p class="text-sm font-semibold ${unlocked ? "text-amber-900" : "text-slate-600"}">${badge.name}</p>
            <p class="mt-1 text-xs ${unlocked ? "text-amber-800" : "text-slate-500"}">${badge.description}</p>
            <p class="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
              unlocked ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
            }">${unlocked ? "Unlocked" : "Locked"}</p>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function triggerBadgeCelebration() {
  if (!badgePanel) {
    return;
  }

  const unlockedCards = [...badgeList.querySelectorAll('[data-badge-unlocked="true"]')];
  if (!unlockedCards.length) {
    return;
  }

  badgePanel.classList.add("ring-2", "ring-amber-300", "shadow-[0_18px_36px_rgba(251,146,60,0.3)]");
  unlockedCards.forEach((card) => {
    card.classList.add("animate-bounce", "scale-[1.02]");
  });

  const sparkleLayer = document.createElement("div");
  sparkleLayer.className = "pointer-events-none absolute inset-0 overflow-hidden";
  for (let index = 0; index < 8; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.textContent = index % 2 === 0 ? "✨" : "⭐";
    sparkle.className = "absolute text-base opacity-0";
    sparkle.style.left = `${8 + index * 11}%`;
    sparkle.style.top = `${12 + (index % 3) * 18}%`;
    sparkle.style.transition = "transform 700ms ease, opacity 700ms ease";
    sparkleLayer.appendChild(sparkle);

    window.requestAnimationFrame(() => {
      sparkle.style.opacity = "1";
      sparkle.style.transform = "translateY(-12px) scale(1.15)";
    });
  }

  badgePanel.classList.add("relative", "overflow-hidden");
  badgePanel.appendChild(sparkleLayer);

  window.setTimeout(() => {
    badgePanel.classList.remove("ring-2", "ring-amber-300", "shadow-[0_18px_36px_rgba(251,146,60,0.3)]");
    unlockedCards.forEach((card) => {
      card.classList.remove("animate-bounce", "scale-[1.02]");
    });
    sparkleLayer.remove();
  }, 1200);
}

function renderCompletionFunnel() {
  if (!completionFunnel || !funnelStepLabel || !funnelProgressBar || !funnelStepContent || !funnelActions) {
    return;
  }

  if (!state.userSubmissions.length) {
    completionFunnel.hidden = true;
    return;
  }

  completionFunnel.hidden = false;
  const step = state.funnelStep;
  funnelStepLabel.textContent = `Step ${step} of 3`;
  funnelProgressBar.style.width = `${(step / 3) * 100}%`;
  funnelActions.innerHTML = "";

  if (step === 1) {
    const latestOpinion = getLatestSubmission()?.submittedOpinion || "";
    const latestSubmission = getLatestSubmission();
    const officialProject =
      state.matches.find((item) => item.id === state.activeProjectId) ||
      projects.find((item) => item.id === latestSubmission?.projectId) ||
      null;
    funnelStepContent.innerHTML =
      `<p class="text-sm text-slate-700">Copy your final opinion and paste it into the official platform submission form.</p>
      <textarea id="funnel-copy-text" class="mt-2 w-full rounded-xl border border-civic-200 bg-white p-3 text-sm text-slate-700" rows="6" readonly>${latestOpinion}</textarea>`;
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className =
      "rounded-xl bg-loop-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#184f8d]";
    copyBtn.textContent = "Copy to official platform";
    copyBtn.addEventListener("click", async () => {
      const textArea = document.getElementById("funnel-copy-text");
      const text = textArea?.value?.trim() || "";
      if (text) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (_error) {
          if (textArea) {
            textArea.focus();
            textArea.select();
          }
        }
      }
      if (officialProject?.officialUrl) {
        window.open(officialProject.officialUrl, "_blank", "noopener,noreferrer");
      }
      state.funnelStep = 2;
      renderCompletionFunnel();
    });
    funnelActions.appendChild(copyBtn);
    return;
  }

  if (step === 2) {
    funnelStepContent.innerHTML =
      '<p class="text-sm text-slate-700">Share your contribution with others to encourage more participation.</p><p class="mt-1 text-xs text-slate-600">You can skip this step and continue.</p><div class="mt-2 flex flex-wrap gap-2">' +
      Object.keys(socialMeta)
        .map(
          (network) =>
            `<a class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition hover:-translate-y-0.5 hover:scale-[1.02] ${socialMeta[network].chipClass}" href="#" data-funnel-share="${network}"><span class="inline-flex items-center justify-center rounded-full bg-white p-1 ${socialMeta[network].iconClass}">${socialMeta[network].svg}</span><span class="font-semibold">${network}</span></a>`
        )
        .join("") +
      "</div>";

    for (const link of funnelStepContent.querySelectorAll("[data-funnel-share]")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const latest = getLatestSubmission();
        const project =
          state.matches.find((item) => item.id === state.activeProjectId) ||
          projects.find((item) => item.id === latest?.projectId);
        if (project) {
          window.open(createShareLink(link.dataset.funnelShare, project), "_blank", "noopener,noreferrer");
        }
      });
    }

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className =
      "rounded-xl bg-loop-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#184f8d]";
    nextBtn.textContent = "Next";
    nextBtn.addEventListener("click", () => {
      state.funnelStep = 3;
      renderCompletionFunnel();
    });

    const skipBtn = document.createElement("button");
    skipBtn.type = "button";
    skipBtn.className =
      "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700";
    skipBtn.textContent = "Skip";
    skipBtn.addEventListener("click", () => {
      state.funnelStep = 3;
      renderCompletionFunnel();
    });
    funnelActions.append(skipBtn, nextBtn);
    return;
  }

  funnelStepContent.innerHTML =
    '<p class="text-sm text-slate-700">Great work. Review your submissions and track updates on each project.</p>';
  const seeBtn = document.createElement("button");
  seeBtn.type = "button";
  seeBtn.className =
    "rounded-xl bg-loop-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#184f8d]";
  seeBtn.textContent = "See my past submissions";
  seeBtn.addEventListener("click", () => {
    pastSubmissionsPanel.hidden = false;
    pastSubmissionsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    if (state.pendingBadgeCelebration) {
      triggerBadgeCelebration();
      state.pendingBadgeCelebration = false;
    }
  });
  funnelActions.appendChild(seeBtn);
}

function getStatusBadgeClass(status) {
  const normalized = (status || "").toLowerCase();
  if (normalized.includes("accepted")) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
  if (normalized.includes("review")) {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }
  if (normalized.includes("pending")) {
    return "bg-sky-100 text-sky-700 border-sky-200";
  }
  if (normalized.includes("rejected") || normalized.includes("declined")) {
    return "bg-rose-100 text-rose-700 border-rose-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function renderSubmissionDetail() {
  const allSubmissions = getAllSubmissions();
  const selected = allSubmissions.find((item) => item.id === state.selectedSubmissionId);
  if (!selected) {
    submissionDetailView.hidden = true;
    return;
  }

  pastSubmissionsPanel.hidden = false;
  submissionDetailView.hidden = false;
  const project = projects.find((item) => item.id === selected.projectId);
  const statusClass = getStatusBadgeClass(selected.status);
  submissionDetailContent.innerHTML = `
    <article class="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(14,116,144,0.12)]">
      <p class="text-sm font-semibold">${selected.projectTitle}</p>
      <p class="mt-1 text-xs text-slate-600">Submitted ${selected.submittedAt} · ${
        selected.stance === "agree" ? "Agree" : "Disagree"
      }</p>
      <p class="mt-1"><span class="inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusClass}">${selected.status || "Pending"}</span></p>
      <p class="mt-1 text-xs text-civic-700">${selected.update}</p>
    </article>

    <article class="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(14,116,144,0.12)]">
      <h4 class="text-sm font-semibold">Project summary</h4>
      <p class="mt-1 text-sm text-slate-700">${project?.summary || "Summary unavailable."}</p>
      <div class="mt-2 flex flex-wrap gap-1">
        ${(project?.topics || [])
          .map(
            (topic) =>
              `<span class="inline-block rounded-full bg-civic-100 px-2 py-0.5 text-xs font-medium text-civic-700">${topicMeta[topic]?.icon || "•"} ${topic}</span>`
          )
          .join("")}
      </div>
      <p class="mt-2 text-xs text-slate-600">Institution: ${project?.institution || "Unknown"}</p>
      <p class="mt-1 text-xs text-slate-600">Deadline: ${project?.deadline || "Unknown"}</p>
      <h5 class="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">Key points</h5>
      <ul class="mt-1 list-disc pl-5 text-sm text-slate-700">
        ${(project?.keyPoints || ["No key points available."])
          .map((point) => `<li>${point}</li>`)
          .join("")}
      </ul>
    </article>

    <article class="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(14,116,144,0.12)]">
      <h4 class="text-sm font-semibold">Your submitted opinion</h4>
      <p class="mt-1 text-sm text-slate-700">${selected.submittedOpinion || "No opinion text available."}</p>
    </article>

    <article class="mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_20px_rgba(14,116,144,0.12)]">
      <h4 class="text-sm font-semibold">Opinions from others</h4>
      <div class="mt-2 grid gap-2">
        ${(selected.opinionsFromOthers || [])
          .map(
            (opinion) =>
              `<p class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-700">${opinion}</p>`
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderResults() {
  projectList.innerHTML = "";
  renderResultIntro();
  renderBadges();
  renderCompletionFunnel();
  renderPastSubmissions();
  renderSubmissionDetail();
  const city = getSelectedCity();

  if (!state.matches.length) {
    emptyState.hidden = false;
    projectDetail.innerHTML =
      '<p class="text-sm text-slate-600">No project selected yet. Update filters to see matching results.</p>';
    return;
  }

  emptyState.hidden = true;

  for (const project of state.matches) {
    const levelLabel = getProjectLevel(project, city);
    const levelBadgeClass = getLevelBadgeClass(levelLabel);
    const card = document.createElement("button");
    card.type = "button";
    card.className =
      "mb-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-left shadow-[0_1px_0_rgba(28,43,51,0.08)] transition hover:-translate-y-0.5 hover:border-loop-blue/70 hover:bg-loop-blue/5 hover:shadow-[0_8px_22px_rgba(31,95,168,0.18)]";
    const isActive = project.id === state.activeProjectId;
    card.classList.toggle("border-loop-blue", isActive);
    card.classList.toggle("bg-loop-blue/10", isActive);
    card.classList.toggle("ring-2", isActive);
    card.classList.toggle("ring-loop-blue/30", isActive);
    card.innerHTML = `
      <p class="m-0 font-semibold">${project.plainTitle}</p>
      <p class="my-1 text-sm text-slate-600">${project.institution}</p>
      <div class="mb-1">
        <span class="inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelBadgeClass}">Level: ${levelLabel}</span>
      </div>
      <p class="mb-1 text-xs text-slate-500">${project.opinionCount.toLocaleString("en-US")} opinions submitted</p>
      <div class="mb-2 flex flex-wrap gap-1">
        ${project.topics
          .slice(0, 3)
          .map(
            (topic) =>
              `<span class="inline-block rounded-full bg-civic-100 px-2 py-0.5 text-xs font-medium text-civic-700">${topicMeta[topic].icon} ${topic}</span>`
          )
          .join("")}
      </div>
      <p class="m-0 text-xs font-semibold text-civic-700">${project.deadline}</p>
    `;
    card.addEventListener("click", () => {
      state.activeProjectId = project.id;
      renderResults();
    });
    projectList.appendChild(card);
  }

  renderDetail();
}

function createShareLink(network, project) {
  const text = encodeURIComponent(`I found this open public project: ${project.plainTitle}`);
  const projectSlug = encodeURIComponent(project.id || "project");
  const loopProjectUrl = encodeURIComponent(`https://loop.eu/p/${projectSlug}`);
  const url = encodeURIComponent(project.officialUrl);

  if (network === "WhatsApp") {
    return `https://wa.me/?text=${text}%20${loopProjectUrl}`;
  }
  if (network === "X") {
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  }
  if (network === "Facebook") {
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }
  return project.officialUrl;
}

function getMockAssistantReply(project, stance, userText, assistantTurn) {
  const topic = (project.topics[0] || "public impact").toLowerCase();
  const direction = stance === "agree" ? "support" : "concerns about";
  const stancePhrase =
    stance === "agree"
      ? "I support the proposal, but I want stronger guarantees"
      : "I have concerns about the proposal and I want concrete safeguards";
  const sequence = [
    `Great starting point. I can already see your intention clearly. Let's transform your idea into a civic comment that is persuasive, respectful, and specific. Since this project focuses on ${topic}, we should highlight real local impact, explain why this matters now, and ask for concrete commitments that institutions can act on.`,
    `Here is a first draft you can improve:\n\n"${stancePhrase}. This project directly affects people in my area, especially in relation to ${topic}. I ask the institution to publish a clear implementation timeline, share progress reports in plain language, and define measurable indicators so residents can verify whether the policy is working."\n\nTell me what sounds too strong, too weak, or too generic, and I will refine it with your tone.`,
    "Strong direction. To make your submission more convincing, add one short lived example from your city or neighborhood and one expected outcome. Decision-makers respond better when feedback includes context plus a practical request. We can now make the text feel both personal and actionable.",
    `Here is version 2 with stronger structure:\n\n"${stancePhrase}. In my community, this issue already affects daily life through delays, uncertainty, and unequal access. I ask for three concrete improvements: (1) a public timeline with milestones, (2) transparent progress updates every quarter, and (3) citizen-facing summaries in plain language so non-experts can follow implementation."\n\nIf you want, I can make this shorter, more formal, or more community-centered.`,
    "Final polish suggestion: keep your final draft concise, constructive, and specific. End with one direct sentence on what success looks like in 6-12 months. That closing line helps officials evaluate your recommendation and increases the chance of meaningful follow-up.",
  ];

  if (!userText) {
    return `Tell me your position in one or two sentences and I will improve it step by step. I can adapt it to a friendly, formal, or policy-focused tone depending on who you want to influence.`;
  }

  return sequence[Math.min(assistantTurn, sequence.length - 1)];
}

function renderDetail() {
  const previousModal = document.getElementById("ideation-modal");
  if (previousModal && previousModal.parentElement === document.body) {
    previousModal.remove();
  }

  const project = state.matches.find((item) => item.id === state.activeProjectId);
  if (!project) {
    projectDetail.innerHTML = '<p class="text-sm text-slate-600">Select a project to read the details.</p>';
    return;
  }

  projectDetail.innerHTML = `
    <span class="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">${project.institution}</span>
    <h3 class="text-xl font-semibold">${project.plainTitle}</h3>
    <p class="mt-1 text-sm text-slate-600">${project.realTitle}</p>
    <div class="mt-2 flex flex-wrap gap-2">
      <a class="font-semibold text-civic-700 underline decoration-2 underline-offset-2" href="${project.officialUrl}" target="_blank" rel="noopener noreferrer">Open official project page</a>
    </div>
    <p class="mt-2 text-sm text-slate-600"><span class="font-semibold text-slate-700">${project.opinionCount.toLocaleString("en-US")}</span> opinions already submitted</p>
    <div class="mt-3 flex flex-wrap gap-1">
      ${project.topics
        .map(
          (topic) =>
            `<span class="inline-block rounded-full bg-civic-100 px-2.5 py-0.5 text-xs font-medium text-civic-700">${topicMeta[topic].icon} ${topic}</span>`
        )
        .join("")}
    </div>
    <p class="mt-3 text-sm font-semibold text-civic-700">${project.deadline}</p>

    <h4 class="mt-4 text-base font-semibold">What is this about?</h4>
    <p class="mt-1 text-sm text-slate-700">${project.summary}</p>

    <h4 class="mt-4 text-base font-semibold">Key points</h4>
    <ul class="mt-1 list-disc pl-5 text-sm text-slate-700">
      ${project.keyPoints.map((item) => `<li>${item}</li>`).join("")}
    </ul>

    <h4 class="mt-4 text-base font-semibold">What others are saying</h4>
    <div class="mt-2 grid gap-2">
      ${project.communityOpinions
        .map(
          (opinion) =>
            `<p class="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-700">${opinion}</p>`
        )
        .join("")}
    </div>

    <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <h4 class="text-base font-semibold">Create your opinion</h4>
      <p class="mt-1 text-sm text-slate-600">Choose your position, then open the ideation studio to refine your opinion with the assistant.</p>
      <div class="mt-2 flex gap-2">
        <button type="button" class="stance-button rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium" data-stance="agree">Agree</button>
        <button type="button" class="stance-button rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium" data-stance="disagree">Disagree</button>
      </div>

      <div class="mt-3 rounded-lg border border-civic-200 bg-gradient-to-r from-civic-50 via-white to-amber-50 p-3">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm text-slate-700"><span class="font-semibold">Ideation Studio:</span> immersive chat space for improving your final draft.</p>
          <button type="button" class="rounded-xl bg-loop-blue px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(31,95,168,0.28)] transition hover:bg-[#184f8d] disabled:cursor-not-allowed disabled:opacity-50" id="open-ideation-modal" disabled>Open chat</button>
        </div>
        <p id="ideation-status" class="mt-2 text-xs text-slate-600">Select Agree or Disagree to start.</p>
      </div>

      <div id="manual-submit-prompt" class="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900" hidden>
        Great. Now submit manually on the official platform: create your account, verify your identity, paste your final opinion, and send it.
      </div>
      <p id="send-feedback" class="mt-2 text-sm text-slate-600" hidden></p>
    </div>

    <div id="ideation-modal" class="fixed inset-0 z-50 hidden" aria-hidden="true">
      <div id="ideation-backdrop" class="absolute inset-0 bg-slate-900/60 opacity-0 transition-opacity duration-300"></div>
      <div class="relative z-10 flex min-h-full items-center justify-center p-4">
      <div id="ideation-panel" class="relative w-full max-w-2xl translate-y-4 scale-95 rounded-2xl border border-civic-200 bg-gradient-to-br from-civic-50 via-white to-amber-50 p-4 opacity-0 shadow-[0_30px_80px_rgba(15,23,42,0.45)] transition-all duration-300 max-h-[90vh] overflow-y-auto">
        <div class="mb-2 flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-bold uppercase tracking-wide text-civic-700">Ideation Studio</p>
            <p class="text-sm text-slate-600">Chat with the assistant and iteratively improve your submission.</p>
          </div>
          <button type="button" id="close-ideation-modal" class="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700">Close</button>
        </div>

        <div id="chat-thread" class="max-h-[45vh] space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 text-sm"></div>
        <textarea id="opinion-input" class="mt-3 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none ring-amber-300 placeholder:text-slate-400 focus:ring-4" placeholder="Type your view and press Send to chat..."></textarea>
        <div class="mt-2 flex flex-wrap justify-end gap-2">
          <button type="button" class="rounded-xl bg-loop-blue [background-image:none] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#184f8d]" id="send-chat">Send to chat</button>
        </div>
        <div id="send-decision" class="mt-3 hidden flex-wrap gap-2">
          <button type="button" id="decision-send" class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Send my opinion to the official platform</button>
        </div>
        <div id="modal-send-steps" class="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900" hidden>
          <p class="font-semibold">Great, your draft is ready. Final submission steps:</p>
          <ol class="mt-2 list-decimal space-y-1 pl-5 text-emerald-950">
            <li>Open the official project page in a new tab.</li>
            <li>Create your account on that platform.</li>
            <li>Complete identity verification if requested.</li>
            <li>Paste your final opinion from this chat.</li>
            <li>Review and submit your contribution.</li>
          </ol>
          <button type="button" id="modal-close-after-steps" class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Close ideation studio</button>
        </div>
      </div>
      </div>
    </div>
  `;

  const thread = document.getElementById("chat-thread");
  const stanceButtons = document.querySelectorAll(".stance-button");
  const openIdeationModalButton = document.getElementById("open-ideation-modal");
  const closeIdeationModalButton = document.getElementById("close-ideation-modal");
  const ideationStatus = document.getElementById("ideation-status");
  const ideationModal = document.getElementById("ideation-modal");
  const ideationBackdrop = document.getElementById("ideation-backdrop");
  const ideationPanel = document.getElementById("ideation-panel");
  const opinionInput = document.getElementById("opinion-input");
  const sendChatButton = document.getElementById("send-chat");
  const sendDecision = document.getElementById("send-decision");
  const decisionSend = document.getElementById("decision-send");
  const modalSendSteps = document.getElementById("modal-send-steps");
  const modalCloseAfterSteps = document.getElementById("modal-close-after-steps");
  const manualSubmitPrompt = document.getElementById("manual-submit-prompt");
  const sendFeedback = document.getElementById("send-feedback");

  if (ideationModal.parentElement !== document.body) {
    document.body.appendChild(ideationModal);
  }

  let selectedStance = null;
  let assistantTurn = 0;
  let askedDecision = false;
  let userInteractionCount = 0;
  let draftFinalized = false;
  let latestUserMessage = "";

  function buildFinalDraft(projectItem, stance, userMessage) {
    const stanceLine =
      stance === "agree"
        ? "I support this project, and I want its implementation to be transparent and accountable."
        : "I have concerns about this project, and I want stronger safeguards before implementation.";
    const topic = (projectItem.topics[0] || "public impact").toLowerCase();
    const userContext = userMessage
      ? `From my perspective: ${userMessage}`
      : "From my perspective, this decision has a direct impact on my local community.";

    return [
      stanceLine,
      userContext,
      `This proposal affects ${topic}, so I request clear milestones, plain-language progress updates, and public reporting that residents can verify.`,
      "Please publish a timeline with measurable outcomes and explain how citizen feedback will be incorporated into the final decision.",
    ].join("\n\n");
  }

  function openIdeationModal() {
    ideationModal.classList.remove("hidden");
    ideationModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    if (userInteractionCount < 2 || draftFinalized) {
      sendDecision.classList.add("hidden");
      sendDecision.classList.remove("flex");
    }
    ideationModal.scrollTop = 0;
    ideationPanel.scrollTop = 0;
    window.requestAnimationFrame(() => {
      ideationBackdrop.classList.remove("opacity-0");
      ideationPanel.classList.remove("opacity-0", "scale-95", "translate-y-4");
    });
  }

  function closeIdeationModal() {
    ideationBackdrop.classList.add("opacity-0");
    ideationPanel.classList.add("opacity-0", "scale-95", "translate-y-4");
    window.setTimeout(() => {
      ideationModal.classList.add("hidden");
      ideationModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("overflow-hidden");
    }, 300);
  }

  function pushChat(role, text) {
    const row = document.createElement("div");
    row.className = role === "assistant" ? "flex justify-start" : "flex justify-end";
    const bubble = document.createElement("p");
    bubble.className =
      role === "assistant"
        ? "max-w-[90%] rounded-lg bg-civic-50 p-2 text-slate-700"
        : "max-w-[90%] rounded-lg bg-slate-100 p-2 text-slate-800";
    bubble.innerHTML = `<span class="font-semibold">${role === "assistant" ? "Assistant" : "You"}:</span> ${text}`;
    row.appendChild(bubble);
    thread.appendChild(row);
    thread.scrollTop = thread.scrollHeight;
  }

  stanceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedStance = button.dataset.stance;
      stanceButtons.forEach((item) => {
        item.classList.remove("bg-civic-100", "border-civic-600", "text-civic-700");
      });
      button.classList.add("bg-civic-100", "border-civic-600", "text-civic-700");
      thread.innerHTML = "";
      assistantTurn = 0;
      askedDecision = false;
      userInteractionCount = 0;
      draftFinalized = false;
      sendDecision.classList.add("hidden");
      sendDecision.classList.remove("flex");
      modalSendSteps.hidden = true;
      opinionInput.disabled = false;
      opinionInput.hidden = false;
      sendChatButton.disabled = false;
      sendChatButton.hidden = false;
      manualSubmitPrompt.hidden = true;
      latestUserMessage = "";
      openIdeationModalButton.disabled = false;
      ideationStatus.textContent = `Position selected: ${selectedStance === "agree" ? "Agree" : "Disagree"}. Open chat to start ideation.`;
      pushChat("assistant", getMockAssistantReply(project, selectedStance, "", assistantTurn));
      assistantTurn += 1;
    });
  });

  openIdeationModalButton.addEventListener("click", () => {
    if (!selectedStance) {
      sendFeedback.textContent = "Choose Agree or Disagree first so the assistant can guide your draft.";
      sendFeedback.hidden = false;
      return;
    }
    openIdeationModal();
  });

  closeIdeationModalButton.addEventListener("click", closeIdeationModal);
  ideationBackdrop.addEventListener("click", closeIdeationModal);

  sendChatButton.addEventListener("click", () => {
    const text = opinionInput.value.trim();
    if (!selectedStance) {
      sendFeedback.textContent = "Choose Agree or Disagree first so the assistant can guide your draft.";
      sendFeedback.hidden = false;
      return;
    }

    if (!text) {
      sendFeedback.textContent = "Write a message before sending to chat.";
      sendFeedback.hidden = false;
      return;
    }

    pushChat("you", text);
    latestUserMessage = text;
    userInteractionCount += 1;
    pushChat("assistant", getMockAssistantReply(project, selectedStance, text, assistantTurn));
    assistantTurn += 1;
    opinionInput.value = "";
    sendFeedback.hidden = true;

    if (!askedDecision && userInteractionCount >= 2) {
      pushChat("assistant", "You now have a strong draft. If you are ready, you can send your opinion to the official platform.");
      sendDecision.classList.remove("hidden");
      sendDecision.classList.add("flex");
      askedDecision = true;
    }
  });

  decisionSend.addEventListener("click", () => {
    const submissionId = `user-${Date.now()}`;
    const finalOpinionText = buildFinalDraft(project, selectedStance || "agree", latestUserMessage);
    state.userSubmissions.unshift({
      id: submissionId,
      projectId: project.id,
      projectTitle: project.plainTitle,
      stance: selectedStance || "agree",
      submittedAt: "Just now",
      status: "Draft finalized",
      update: "Status: Draft finalized with assistant. Manual platform submission pending.",
      submittedOpinion: finalOpinionText,
      opinionsFromOthers: project.communityOpinions,
    });

    modalSendSteps.hidden = false;
    draftFinalized = true;
    state.funnelStep = 1;
    state.selectedSubmissionId = submissionId;
    state.pendingBadgeCelebration = true;
    opinionInput.value = "";
    opinionInput.disabled = true;
    opinionInput.hidden = true;
    sendChatButton.disabled = true;
    sendChatButton.hidden = true;
    sendDecision.classList.add("hidden");
    sendDecision.classList.remove("flex");
    sendFeedback.textContent =
      "Follow the easy steps in the ideation studio to submit your opinion manually.";
    sendFeedback.hidden = false;
    ideationStatus.textContent = "Draft finalized. Ready for manual platform submission.";
    renderBadges();
    renderCompletionFunnel();
    renderPastSubmissions();
    renderSubmissionDetail();
  });

  modalCloseAfterSteps.addEventListener("click", () => {
    manualSubmitPrompt.hidden = false;
    closeIdeationModal();
    window.setTimeout(() => {
      if (!completionFunnel) {
        return;
      }
      completionFunnel.hidden = false;
      const stickyOffset = 84;
      const targetTop = completionFunnel.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }, 320);
  });
}

function renderPastSubmissions() {
  pastSubmissionsList.innerHTML = "";
  const allSubmissions = getAllSubmissions();
  if (!allSubmissions.length) {
    pastSubmissionsPanel.hidden = true;
    submissionDetailView.hidden = true;
    return;
  }

  pastSubmissionsPanel.hidden = false;
  submissionDetailView.hidden = state.selectedSubmissionId ? false : true;

  for (const item of allSubmissions) {
    const statusClass = getStatusBadgeClass(item.status);
    const card = document.createElement("article");
    card.className =
      "cursor-pointer rounded-lg border border-civic-200 bg-white p-3 shadow-[0_8px_20px_rgba(14,116,144,0.12)] transition hover:-translate-y-0.5 hover:border-civic-400";
    card.innerHTML = `
      <p class="text-sm font-semibold">${item.projectTitle}</p>
      <p class="mt-1 text-xs text-slate-600">You voted ${item.stance === "agree" ? "Agree" : "Disagree"} - ${item.submittedAt}</p>
      <p class="mt-1"><span class="inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusClass}">${item.status || "Pending"}</span></p>
      <p class="mt-1 text-xs text-civic-700">${item.update}</p>
    `;
    card.addEventListener("click", () => {
      state.selectedSubmissionId = item.id;
      renderSubmissionDetail();
      submissionDetailView.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    pastSubmissionsList.appendChild(card);
  }
}

renderCities();
renderLocationSuggestions();
renderTopics();
renderTopicHint();
renderResultIntro();
renderPastSubmissions();
buildWheelBackground();
initializeStepPanels();
setStep(parseStepFromLocation(), { historyMode: "replace" });
