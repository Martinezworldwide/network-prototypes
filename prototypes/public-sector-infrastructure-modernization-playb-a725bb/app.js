// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "Public Sector Infrastructure Modernization Playbook",
  "positioning": "A practical, vendor-neutral guide and community for government technology leaders to plan and execute secure, scalable AI-ready infrastructure upgrades, complementing event-based forums like the Infrastructure & Modernization Forum.",
  "companyName": "Not specified in conversation",
  "productName": "Infrastructure & Modernization Forum (event, August 27, Reston, VA)",
  "coreFeatures": [
    "Curated open-source tooling and reference architectures for gov AI workloads",
    "Checklists and maturity models for infrastructure assessment and migration",
    "Peer-contributed case studies and lessons learned from public sector modernization"
  ],
  "mvpBuildPlan": [
    "Launch a public GitHub repo 'awesome-gov-infrastructure-modernization' with categorized resources",
    "Publish a markdown-based maturity model and migration checklist for AI-ready infrastructure",
    "Recruit 5-10 public sector practitioners to contribute case studies and validate content"
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
