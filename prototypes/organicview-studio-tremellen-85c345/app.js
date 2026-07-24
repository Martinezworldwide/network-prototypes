// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "OrganicView Studio",
  "positioning": "A lightweight analytics and content-strategy toolkit that lets video production agencies prove and replicate organic growth outcomes for B2B clients without paid spend.",
  "companyName": "Tremellen",
  "productName": "Video production & content strategy",
  "coreFeatures": [
    "YouTube and social metrics ingestion that plots monthly view curves and highlights organic vs. paid contribution",
    "Reusable content-strategy templates (hooks, shot lists, briefs) that prospects can fork and adapt per client",
    "Video SEO audit script that scores existing client videos against top-performing formats and surfaces quick wins"
  ],
  "mvpBuildPlan": [
    "Build a minimal YouTube Data API ingestion script that stores monthly views per channel and renders a simple growth-curve chart",
    "Package 3-5 content-strategy templates (hook bank, shot list, brief doc) into a public repo prospects can clone",
    "Write a CLI video SEO audit that checks title, description, tags, and thumbnail against a heuristic rubric and outputs a score"
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
