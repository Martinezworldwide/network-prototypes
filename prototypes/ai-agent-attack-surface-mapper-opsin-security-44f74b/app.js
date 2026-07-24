// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "AI Agent Attack Surface Mapper",
  "positioning": "Continuous discovery and ownership mapping of autonomous AI agents and their MCP server connections, closing the visibility gap left by EDR/CSPM tools that focus on traditional workloads.",
  "companyName": "Opsin Security",
  "productName": "Opsin Security AI agent visibility platform",
  "coreFeatures": [
    "Agent inventory with ownership attribution across cloud, SaaS, and on-prem",
    "MCP server connection monitoring and risk scoring",
    "Drift detection between approved agent registry and running instances"
  ],
  "mvpBuildPlan": [
    "Deploy sensorless discovery via cloud APIs and identity providers",
    "Correlate agent identities with MCP server endpoints using OpenTelemetry",
    "Build dashboard showing unowned agents and unauthorized MCP connections"
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
