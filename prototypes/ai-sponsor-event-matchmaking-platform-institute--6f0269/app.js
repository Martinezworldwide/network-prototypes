// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "AI Sponsor-Event Matchmaking Platform",
  "positioning": "Automated marketplace that matches B2B AI vendors with curated executive events (summits, dinners, workshops) based on target-account fit, budget, and calendar, replacing manual outreach with data-driven inventory allocation.",
  "companyName": "Institute for AI Transformation",
  "productName": "Leaders in AI Summit Series & Think Tank Dinners",
  "coreFeatures": [
    "Sponsor profile ingestion (ICP, budget, preferred conferences, speaking topics)",
    "Real-time event inventory sync (panel slots, dinner caps, workshop hosts) from organizer feeds",
    "Match scoring engine ranking events by attendee overlap with sponsor target accounts",
    "Automated proposal generator producing customized sponsorship packages with pricing tiers"
  ],
  "mvpBuildPlan": [
    "Ingest public summit schedules and known sponsor lists (Lenovo, NVIDIA, Intel, Dell) into a searchable catalog",
    "Build sponsor onboarding form capturing ICP, budget range, and conference calendar",
    "Prototype match algorithm using keyword overlap between sponsor topics and panel titles",
    "Generate one-page PDF proposal per match for pilot with 3-5 sponsors"
  ]
};

const button = document.querySelector("#copy-brief");
const status = document.querySelector("#copy-status");

button?.addEventListener("click", async () => {
  const text = [
    `Prototype: ${brief.conceptName}`,
    brief.companyName || brief.productName ? `Context: ${[brief.companyName, brief.productName].filter(Boolean).join(" / ")}` : "",
    brief.positioning ? `Positioning: ${brief.positioning}` : "",
    brief.coreFeatures?.length ? `Features: ${brief.coreFeatures.join("; ")}` : "",
    brief.mvpBuildPlan?.length ? `MVP: ${brief.mvpBuildPlan.join("; ")}` : "",
    "Please share a short video, demo link, deck, or written summary for async review."
  ].filter(Boolean).join("\n");
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = "Partnership brief copied.";
  } catch {
    status.textContent = "Could not copy automatically. Select and copy from the page.";
  }
});
