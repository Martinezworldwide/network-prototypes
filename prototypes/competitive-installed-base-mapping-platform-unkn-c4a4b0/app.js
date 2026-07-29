// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "Competitive Installed-Base Mapping Platform",
  "positioning": "Displacement-focused sales intelligence for manufacturing teams that reveals competitor contract details and refresh timing at the account level.",
  "companyName": "Unknown",
  "productName": "Competitive Installed-Base Mapping Platform",
  "coreFeatures": [
    "Account-level competitor installed-base mapping with verified contacts",
    "Contract detail tracking including renewal dates and terms",
    "Priority scoring to rank displacement opportunities"
  ],
  "mvpBuildPlan": [
    "Define target manufacturing verticals and competitor set",
    "Build data pipeline for contract and refresh date aggregation",
    "Develop priority scoring algorithm and sales UI"
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
