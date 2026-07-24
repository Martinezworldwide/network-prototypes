// Client helpers for the public prototype page. No private CRM data is loaded here.
const brief = {
  "conceptName": "Self-Hosted QA & Security Dashboard",
  "positioning": "Open-source dashboard combining self-hosted QA tooling with automated security scanning for teams wanting full data control",
  "companyName": "Unknown (recruitment agency client)",
  "productName": "Unknown (client role)",
  "coreFeatures": [
    "Aggregates self-hosted QA tools (test runners, CI/CD, reporting) via awesome-selfhosted",
    "Integrates Go-based security scanners from awesome-go for SAST/DAST/dependency checks",
    "Exposes MCP server endpoints for AI-driven test orchestration and vulnerability triage"
  ],
  "mvpBuildPlan": [
    "Deploy awesome-selfhosted stack (Gitea, Drone, Grafana) on local k3s",
    "Wire Go security scanners (gosec, nuclei, trivy) into CI pipelines",
    "Implement MCP server wrapper for test triggering and result querying"
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
