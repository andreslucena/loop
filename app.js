const state = {
  step: 1,
  cityId: null,
  topics: new Set(),
  matches: [],
  activeConsultationId: null,
};

const cities = [
  {
    id: "barcelona",
    name: "Barcelona",
    levels: ["Catalonia", "Spain", "European Union"],
  },
  {
    id: "brussels",
    name: "Brussels",
    levels: ["Brussels-Capital Region", "Belgium", "European Union"],
  },
  {
    id: "paris",
    name: "Paris",
    levels: ["Ile-de-France", "France", "European Union"],
  },
  {
    id: "thessaloniki",
    name: "Thessaloniki",
    levels: ["Macedonia", "Greece", "European Union"],
  },
];

const allTopics = [
  "Housing",
  "Transport",
  "Health",
  "Education",
  "Safety",
  "Environment",
  "Culture",
  "Sports",
  "Urban Planning",
  "Democracy",
  "Equality",
  "Justice",
  "Immigration",
  "Technology",
  "Energy",
  "Economy",
];

const consultations = [
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
      "The European Commission is considering whether old product liability rules should be updated for AI systems used in public services, work, and healthcare.",
    keyPoints: [
      "High-risk AI decisions may need human-readable explanations.",
      "People harmed by AI errors could gain stronger compensation rights.",
      "Companies may face transparency duties for training and testing data.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "barcelona-superblocks",
    scope: ["Barcelona"],
    topics: ["Transport", "Environment", "Urban Planning"],
    institution: "Barcelona City Council",
    opinionCount: 963,
    deadline: "Open until Sep 2, 2026",
    realTitle:
      "Initial approval of the 2026-2030 Superblocks and low-emission mobility plan",
    plainTitle: "Help decide traffic-free streets and cleaner air in your district",
    summary:
      "Barcelona is updating the superblocks model to reduce traffic, expand shade, and prioritize walking and public transport.",
    keyPoints: [
      "Eight districts would add new traffic-calmed areas.",
      "Bus lane changes may reduce private car access in central corridors.",
      "Tree canopy targets are linked to heat-risk neighborhoods.",
    ],
    officialUrl:
      "https://ajuntament.barcelona.cat/transparencia/ca/informacio-de-rellevancia-juridica-i-documental",
  },
  {
    id: "catalonia-rent-index",
    scope: ["Catalonia"],
    topics: ["Housing", "Economy", "Equality"],
    institution: "Government of Catalonia",
    opinionCount: 1411,
    deadline: "Open until Aug 10, 2026",
    realTitle:
      "Draft decree regulating the updated reference rent index in stressed areas",
    plainTitle: "Should rent limits be strengthened in high-pressure neighborhoods?",
    summary:
      "Catalonia proposes new rent reference indicators for high-demand zones and possible penalties for repeated overpricing.",
    keyPoints: [
      "Index updates would include local income and housing quality criteria.",
      "New reporting obligations may apply to large landlords.",
      "Young tenants and vulnerable households would get priority safeguards.",
    ],
    officialUrl:
      "https://web.gencat.cat/es/generalitat/govern-obert/transparencia/publicitat-activa/normativa-i-informacio-interes-juridic/normativa-en-tramit",
  },
  {
    id: "spain-digital-education",
    scope: ["Spain"],
    topics: ["Education", "Technology", "Equality"],
    institution: "Government of Spain",
    opinionCount: 1206,
    deadline: "Open until Jul 30, 2026",
    realTitle:
      "Consultation on the National Framework for Digital Skills in Primary and Secondary Education",
    plainTitle: "How should schools teach digital skills fairly across Spain?",
    summary:
      "Spain is collecting public input on minimum digital education standards, teacher training, and access gaps between regions.",
    keyPoints: [
      "Schools may adopt common AI and media literacy modules.",
      "Teacher support budgets would be linked to deprivation indexes.",
      "Annual progress reporting could become mandatory for regions.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/brpapi/searchInitiatives?page=0&size=10&language=EN",
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
    plainTitle: "Should homes and local communities be paid for flexible clean energy use?",
    summary:
      "The EU seeks feedback on policies that reward households, cooperatives, and businesses for shifting energy use away from peak hours.",
    keyPoints: [
      "Member states may need local flexibility markets.",
      "Battery and demand-response aggregators could get easier grid access.",
      "Consumer protections for dynamic pricing are under review.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "brussels-night-safety",
    scope: ["Brussels", "Brussels-Capital Region"],
    topics: ["Safety", "Transport", "Equality"],
    institution: "City of Brussels",
    opinionCount: 539,
    deadline: "Open until Jul 25, 2026",
    realTitle:
      "Consultation on safe night mobility and harassment prevention in public transport",
    plainTitle: "What should Brussels change so people feel safer at night?",
    summary:
      "Brussels is evaluating bus stop design, lighting, reporting channels, and late-night route planning with a gender and youth safety lens.",
    keyPoints: [
      "Pilot flexible stop policies may expand on selected lines.",
      "Station redesign priorities include visibility and emergency access.",
      "Public campaign guidelines are open for comment.",
    ],
    officialUrl:
      "https://ajuntament.barcelona.cat/transparencia/ca/informacio-de-rellevancia-juridica-i-documental",
  },
  {
    id: "france-urban-cooling",
    scope: ["Paris", "Ile-de-France", "France"],
    topics: ["Environment", "Health", "Urban Planning"],
    institution: "Metropole du Grand Paris",
    opinionCount: 744,
    deadline: "Open until Sep 12, 2026",
    realTitle:
      "Projet de plan metropolitain d'adaptation aux ilots de chaleur urbains",
    plainTitle: "How should Paris cool neighborhoods during extreme heat?",
    summary:
      "Regional planners propose new tree corridors, cooler schoolyards, and heat emergency protocols for vulnerable residents.",
    keyPoints: [
      "Cooling infrastructure would prioritize dense, low-income areas.",
      "Health services request stronger neighborhood alert channels.",
      "Public space design standards could change for all new permits.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "spain-open-data-justice",
    scope: ["Spain"],
    topics: ["Justice", "Democracy", "Technology"],
    institution: "Government of Spain",
    opinionCount: 688,
    deadline: "Open until Oct 1, 2026",
    realTitle:
      "Anteproyecto de ley sobre datos judiciales anonimizados y reutilizacion publica",
    plainTitle: "Should anonymous court data be opened to improve transparency?",
    summary:
      "Spain is consulting on opening anonymized judicial datasets for civic oversight, research, and accountability while protecting privacy.",
    keyPoints: [
      "New anonymization standards would be set nationally.",
      "Public dashboards may become mandatory for key indicators.",
      "Independent audits are proposed for data release quality.",
    ],
    officialUrl:
      "https://web.gencat.cat/es/generalitat/govern-obert/transparencia/publicitat-activa/normativa-i-informacio-interes-juridic/normativa-en-tramit",
  },
  {
    id: "catalonia-community-sports",
    scope: ["Catalonia"],
    topics: ["Sports", "Health", "Culture"],
    institution: "Government of Catalonia",
    opinionCount: 412,
    deadline: "Open until Jul 28, 2026",
    realTitle:
      "Consultation on the 2026 Community Sports and Active Health Promotion Program",
    plainTitle: "What local sports programs should receive public funding first?",
    summary:
      "Catalonia requests feedback on grassroots sports access, inclusive participation, and joint programs with schools and civic centers.",
    keyPoints: [
      "Funding criteria would include low-income participation rates.",
      "Municipal grant calls may include disability inclusion benchmarks.",
      "Shared-use school facility models are being considered.",
    ],
    officialUrl:
      "https://web.gencat.cat/es/generalitat/govern-obert/transparencia/publicitat-activa/normativa-i-informacio-interes-juridic/normativa-en-tramit",
  },
  {
    id: "eu-migrant-services",
    scope: ["European Union", "Spain", "France"],
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
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "thessaloniki-coastal-transit",
    scope: ["Thessaloniki"],
    topics: ["Transport", "Environment", "Urban Planning"],
    institution: "Municipality of Thessaloniki",
    opinionCount: 476,
    deadline: "Open until Sep 18, 2026",
    realTitle:
      "Public consultation on the Thessaloniki coastal mobility corridor and bus priority redesign",
    plainTitle: "How should Thessaloniki improve coastal transport and reduce congestion?",
    summary:
      "The municipality is consulting on new bus-priority lanes, safer walking routes, and cycling links along the coastal corridor.",
    keyPoints: [
      "Peak-hour bus lanes may be extended across central bottlenecks.",
      "Street redesign options include wider sidewalks and protected bike lanes.",
      "Air-quality targets are tied to annual traffic reduction milestones.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "macedonia-flood-resilience",
    scope: ["Macedonia"],
    topics: ["Environment", "Safety", "Energy"],
    institution: "Region of Central Macedonia",
    opinionCount: 351,
    deadline: "Open until Oct 7, 2026",
    realTitle:
      "Draft regional framework for flood resilience, critical infrastructure protection, and emergency energy backup",
    plainTitle: "What should Macedonia prioritize to prevent flood damage and outages?",
    summary:
      "Regional authorities are collecting feedback on drainage upgrades, flood-risk mapping, and backup energy for hospitals and schools.",
    keyPoints: [
      "Neighborhood-level risk maps would guide local investment priorities.",
      "Critical facilities may require minimum backup power standards.",
      "Residents can comment on early-warning and evacuation communication plans.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives_en",
  },
  {
    id: "greece-digital-civic-services",
    scope: ["Greece"],
    topics: ["Technology", "Democracy", "Justice"],
    institution: "Government of Greece",
    opinionCount: 907,
    deadline: "Open until Aug 26, 2026",
    realTitle:
      "National consultation on standards for digital civic services, identity verification, and transparent appeals",
    plainTitle: "How should Greece make online public services simpler and fairer?",
    summary:
      "Greece proposes common service standards for online applications, identity checks, and appeal tracking across ministries.",
    keyPoints: [
      "Unified response-time commitments may apply to all digital submissions.",
      "Appeal status tracking could be visible to citizens in one portal.",
      "Accessibility requirements are proposed for multilingual and disability-friendly access.",
    ],
    officialUrl:
      "https://ec.europa.eu/info/law/better-regulation/brpapi/searchInitiatives?page=0&size=10&language=EN",
  },
];

const cityGrid = document.getElementById("city-grid");
const citySearchInput = document.getElementById("city-search");
const citySearchEmpty = document.getElementById("city-search-empty");
const topicGrid = document.getElementById("topic-grid");
const resultIntro = document.getElementById("result-intro");
const consultationList = document.getElementById("consultation-list");
const consultationDetail = document.getElementById("consultation-detail");
const emptyState = document.getElementById("empty-state");
const selectionHint = document.getElementById("selection-hint");

const step1Error = document.getElementById("step-1-error");
const step2Error = document.getElementById("step-2-error");

document.getElementById("to-step-2").addEventListener("click", () => {
  if (!state.cityId) {
    step1Error.hidden = false;
    return;
  }
  step1Error.hidden = true;
  setStep(2);
});

document.getElementById("back-to-1").addEventListener("click", () => setStep(1));

document.getElementById("to-step-3").addEventListener("click", () => {
  if (!state.topics.size) {
    step2Error.hidden = false;
    return;
  }
  step2Error.hidden = true;
  applyFilters();
  setStep(3);
});

document.getElementById("back-to-2").addEventListener("click", () => setStep(2));

citySearchInput.addEventListener("input", () => {
  renderCities(citySearchInput.value);
});

function setStep(step) {
  state.step = step;
  for (const panel of document.querySelectorAll("[data-step]")) {
    panel.hidden = Number(panel.dataset.step) !== step;
  }
  for (const marker of document.querySelectorAll("[data-step-marker]")) {
    const isActive = Number(marker.dataset.stepMarker) === step;
    const dot = marker.querySelector("[data-step-dot]");

    marker.classList.toggle("border-civic-600", isActive);
    marker.classList.toggle("bg-civic-100", isActive);

    if (dot) {
      dot.classList.toggle("bg-civic-600", isActive);
      dot.classList.toggle("text-white", isActive);
      dot.classList.toggle("border-civic-600", isActive);
    }
  }
}

function renderCities(query = "") {
  cityGrid.innerHTML = "";
  const normalized = query.trim().toLowerCase();
  const filteredCities = cities.filter((city) => {
    if (!normalized) {
      return true;
    }
    return (
      city.name.toLowerCase().includes(normalized) ||
      city.levels.some((level) => level.toLowerCase().includes(normalized))
    );
  });

  citySearchEmpty.hidden = filteredCities.length > 0;

  for (const city of filteredCities) {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "w-full rounded-xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_6px_16px_rgba(10,55,79,0.1)]";
    button.setAttribute("role", "radio");
    const selected = state.cityId === city.id;
    button.setAttribute("aria-checked", String(selected));
    button.classList.toggle("border-civic-600", selected);
    button.classList.toggle("ring-2", selected);
    button.classList.toggle("ring-civic-600/30", selected);
    if (!selected) {
      button.classList.add("border-slate-200");
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

function renderTopics() {
  topicGrid.innerHTML = "";
  for (const topic of allTopics) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className =
      "rounded-full border border-slate-300 bg-white px-3 py-2 text-left text-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_6px_16px_rgba(10,55,79,0.1)]";
    chip.textContent = topic;
    const active = state.topics.has(topic);
    chip.classList.toggle("border-civic-600", active);
    chip.classList.toggle("bg-civic-100", active);
    chip.classList.toggle("font-semibold", active);
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
  state.matches = consultations.filter((consultation) => {
    const matchesScope = consultation.scope.some((s) => allowedScopes.has(s));
    const matchesTopic = consultation.topics.some((topic) => state.topics.has(topic));
    return matchesScope && matchesTopic;
  });

  state.activeConsultationId = state.matches[0]?.id || null;
  renderResults();
}

function getConsultationLevel(consultation, city) {
  if (!city) {
    return consultation.scope[0] || "Unknown";
  }

  const orderedScopes = [city.name, ...city.levels];
  const matchedScope = orderedScopes.find((scope) => consultation.scope.includes(scope));
  return matchedScope || consultation.scope[0] || "Unknown";
}

function getOpinionCount(consultation) {
  return consultation.opinionCount ?? 0;
}

function renderResultIntro() {
  const city = getSelectedCity();
  const topics = [...state.topics];

  if (!city) {
    resultIntro.textContent = "Choose your location and topics to view consultations.";
    return;
  }

  if (!topics.length) {
    resultIntro.textContent = `Covering governments from ${city.name} to ${city.levels[city.levels.length - 1]}.`;
    return;
  }

  resultIntro.textContent = `Based on your interests in ${topics.join(", ")} - covering governments from ${city.name} to ${city.levels[city.levels.length - 1]}.`;
}

function renderResults() {
  consultationList.innerHTML = "";
  renderResultIntro();
  const city = getSelectedCity();

  if (!state.matches.length) {
    emptyState.hidden = false;
    consultationDetail.innerHTML =
      '<p class="text-sm text-slate-600">No consultation selected yet. Update filters to see matching results.</p>';
    return;
  }

  emptyState.hidden = true;

  for (const consultation of state.matches) {
    const levelLabel = getConsultationLevel(consultation, city);
    const opinionCount = getOpinionCount(consultation);
    const card = document.createElement("button");
    card.type = "button";
    card.className =
      "mb-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_6px_16px_rgba(10,55,79,0.1)]";
    const isActive = consultation.id === state.activeConsultationId;
    card.classList.toggle("border-civic-600", isActive);
    card.classList.toggle("ring-2", isActive);
    card.classList.toggle("ring-civic-600/20", isActive);
    card.innerHTML = `
      <p class="m-0 font-semibold">${consultation.plainTitle}</p>
      <p class="my-1 text-sm text-slate-600">${consultation.institution}</p>
      <p class="mb-1 text-xs text-slate-500">${opinionCount.toLocaleString("en-US")} opinions submitted</p>
      <div class="mb-2 flex flex-wrap gap-1">
        ${consultation.topics
          .slice(0, 3)
          .map(
            (topic) =>
              `<span class="inline-block rounded-full bg-civic-100 px-2 py-0.5 text-xs font-medium text-civic-700">${topic}</span>`
          )
          .join("")}
      </div>
      <p class="m-0 text-xs font-semibold text-civic-700">${consultation.deadline}</p>
    `;
    card.addEventListener("click", () => {
      state.activeConsultationId = consultation.id;
      renderResults();
    });
    consultationList.appendChild(card);
  }

  renderDetail();
}

function createShareLink(network, consultation) {
  const text = encodeURIComponent(
    `I found this open public consultation: ${consultation.plainTitle}`
  );
  const url = encodeURIComponent(consultation.officialUrl);

  if (network === "WhatsApp") {
    return `https://wa.me/?text=${text}%20${url}`;
  }
  if (network === "X") {
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  }
  if (network === "Facebook") {
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }
  return consultation.officialUrl;
}

function renderDetail() {
  const consultation = state.matches.find((item) => item.id === state.activeConsultationId);
  if (!consultation) {
    consultationDetail.innerHTML =
      '<p class="text-sm text-slate-600">Select a consultation to read the details.</p>';
    return;
  }

  consultationDetail.innerHTML = `
    <span class="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">${consultation.institution}</span>
    <h3 class="text-xl font-semibold">${consultation.plainTitle}</h3>
    <p class="mt-1 text-sm text-slate-600">${consultation.realTitle}</p>
    <p class="mt-2 text-sm text-slate-600"><span class="font-semibold text-slate-700">${getOpinionCount(consultation).toLocaleString("en-US")}</span> opinions already submitted</p>
    <div class="mt-3 flex flex-wrap gap-1">
      ${consultation.topics
        .map(
          (topic) =>
            `<span class="inline-block rounded-full bg-civic-100 px-2.5 py-0.5 text-xs font-medium text-civic-700">${topic}</span>`
        )
        .join("")}
    </div>
    <p class="mt-3 text-sm font-semibold text-civic-700">${consultation.deadline}</p>

    <h4 class="mt-4 text-base font-semibold">What is this about?</h4>
    <p class="mt-1 text-sm text-slate-700">${consultation.summary}</p>

    <h4 class="mt-4 text-base font-semibold">Key points</h4>
    <ul class="mt-1 list-disc pl-5 text-sm text-slate-700">
      ${consultation.keyPoints.map((item) => `<li>${item}</li>`).join("")}
    </ul>

    <div class="mt-3 flex flex-wrap gap-2">
      <a class="font-semibold text-civic-700 underline decoration-2 underline-offset-2" href="${consultation.officialUrl}" target="_blank" rel="noopener noreferrer">Read full public consultation</a>
    </div>

    <div class="mt-4">
      <h4 class="text-base font-semibold">Add your opinion</h4>
      <textarea class="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none ring-amber-300 placeholder:text-slate-400 focus:ring-4" id="opinion-input" placeholder="Write your perspective in clear language. What should change and why?"></textarea>
      <div class="mt-2 flex flex-wrap gap-2">
        <button type="button" class="rounded-xl bg-gradient-to-r from-civic-700 to-civic-600 px-4 py-2 text-sm font-semibold text-white" id="send-opinion">Send to official platform</button>
      </div>
      <p id="send-feedback" class="mt-2 text-sm text-slate-600" hidden></p>
    </div>

    <h4 class="mt-4 text-base font-semibold">Share with friends and family</h4>
    <p class="mt-1 text-sm text-slate-600">The more people participate, the stronger the signal to decision-makers.</p>
    <div class="mt-2 flex flex-wrap gap-2">
      ${["WhatsApp", "X", "Facebook", "Instagram"]
        .map(
          (network) =>
            `<a class="inline-block rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 transition hover:border-civic-600" href="${createShareLink(network, consultation)}" target="_blank" rel="noopener noreferrer">${network}</a>`
        )
        .join("")}
    </div>
  `;

  const sendButton = document.getElementById("send-opinion");
  const opinionInput = document.getElementById("opinion-input");
  const sendFeedback = document.getElementById("send-feedback");

  sendButton.addEventListener("click", () => {
    const text = opinionInput.value.trim();
    if (!text) {
      sendFeedback.textContent = "Please write your opinion before sending.";
      sendFeedback.hidden = false;
      return;
    }

    sendFeedback.textContent =
      "Thanks. Your opinion has been prepared and is ready to send to the official platform.";
    sendFeedback.hidden = false;
    opinionInput.value = "";
  });
}

renderCities();
renderTopics();
renderTopicHint();
renderResultIntro();
setStep(1);
