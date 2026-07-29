// Client workplace helpers. No private CRM data is loaded here.
// Storage: load workplace.json from the public repo; appends write back into that same GitHub JSON file.
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
  ],
  "slug": "competitive-installed-base-mapping-platform-unkn-c4a4b0"
};

const WORKPLACE_API = "https://linkedin-messages-responses.vercel.app/api/workplace";
const status = document.querySelector("#copy-status");
let workplace = {
  slug: brief.slug,
  conceptName: brief.conceptName,
  updatedAt: new Date().toISOString(),
  comments: [],
  resources: [],
  tools: []
};
let saving = false;

function setStatus(message) {
  if (status) status.textContent = message;
}

function safeHttps(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function escapeText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function honeypotFilled(form) {
  return Boolean(String(form.website?.value || "").trim());
}

async function loadRemoteWorkplace() {
  const response = await fetch(`./workplace.json?ts=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`workplace.json unavailable (${response.status})`);
  return response.json();
}

async function persistAppend(patch) {
  if (saving) {
    setStatus("Another save is already in progress.");
    return false;
  }
  saving = true;
  setStatus("Saving to GitHub workplace.json...");
  try {
    const response = await fetch(WORKPLACE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: brief.slug,
        conceptName: brief.conceptName,
        ...patch
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Save failed (${response.status})`);
    workplace = data.workplace || await loadRemoteWorkplace();
    renderAll();
    setStatus("Saved to GitHub workplace.json.");
    return true;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Could not save to GitHub workplace.json.");
    return false;
  } finally {
    saving = false;
  }
}

function renderTools() {
  const root = document.querySelector("#tools-list");
  if (!root) return;
  const tools = workplace.tools || [];
  if (!tools.length) {
    root.innerHTML = "<p class=\"muted\">No industry tools yet. Add SaaS, platforms, or software used in this vertical.</p>";
    return;
  }
  root.innerHTML = tools.map((tool) => `
    <article class="work-card">
      <h3>${tool.url ? `<a href="${escapeText(tool.url)}" target="_blank" rel="noreferrer">${escapeText(tool.name)}</a>` : escapeText(tool.name)}</h3>
      <p>${escapeText(tool.whyRelevant || "Industry-relevant tool for this workplace.")}</p>
      <p class="chip">${escapeText(tool.kind || "software")} · ${escapeText(tool.category || "general")} · ${escapeText(tool.source || "shared")}</p>
    </article>
  `).join("");
}

function renderResources() {
  const root = document.querySelector("#resources-list");
  if (!root) return;
  const resources = workplace.resources || [];
  if (!resources.length) {
    root.innerHTML = "<p class=\"muted\">No shared resources yet. Add docs, decks, demos, or notes the team should keep.</p>";
    return;
  }
  root.innerHTML = resources.map((resource) => `
    <article class="work-card">
      <h3>${resource.url ? `<a href="${escapeText(resource.url)}" target="_blank" rel="noreferrer">${escapeText(resource.title)}</a>` : escapeText(resource.title)}</h3>
      <p>${escapeText(resource.note || "")}</p>
      <p class="chip">${escapeText(resource.kind || "link")}</p>
    </article>
  `).join("");
}

function renderComments() {
  const root = document.querySelector("#comments-list");
  if (!root) return;
  const comments = [...(workplace.comments || [])].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  if (!comments.length) {
    root.innerHTML = "<p class=\"muted\">No comments yet. Start the async thread for this workplace.</p>";
    return;
  }
  root.innerHTML = comments.map((comment) => `
    <article class="comment-card">
      <h3>${escapeText(comment.author || "Collaborator")}</h3>
      <p>${escapeText(comment.body)}</p>
      <p class="comment-meta">${escapeText(comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "")}</p>
    </article>
  `).join("");
}

function renderAll() {
  renderTools();
  renderResources();
  renderComments();
}

async function boot() {
  try {
    workplace = await loadRemoteWorkplace();
    renderAll();
    setStatus("Loaded workplace.json from GitHub.");
  } catch (error) {
    renderAll();
    setStatus(error instanceof Error ? error.message : "Could not load workplace.json.");
  }
}

document.querySelector("#copy-brief")?.addEventListener("click", async () => {
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
    setStatus("Partnership brief copied.");
  } catch {
    setStatus("Could not copy automatically. Select and copy from the page.");
  }
});

document.querySelector("#export-workplace")?.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(workplace, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "workplace.json";
  link.click();
  URL.revokeObjectURL(url);
  setStatus("Downloaded workplace.json.");
});

document.querySelector("#reload-workplace")?.addEventListener("click", async () => {
  try {
    workplace = await loadRemoteWorkplace();
    renderAll();
    setStatus("Reloaded workplace.json from GitHub.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Could not reload workplace.json.");
  }
});

document.querySelector("#comment-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (honeypotFilled(form)) return;
  const author = String(form.author.value || "").trim().slice(0, 80);
  const body = String(form.body.value || "").trim().slice(0, 2000);
  if (!author || !body) return;
  const ok = await persistAppend({
    appendComment: {
      id: `comment-${Date.now()}`,
      author,
      body,
      createdAt: new Date().toISOString()
    }
  });
  if (ok) form.reset();
});

document.querySelector("#resource-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (honeypotFilled(form)) return;
  const title = String(form.title.value || "").trim().slice(0, 160);
  const url = safeHttps(form.url.value);
  const note = String(form.note.value || "").trim().slice(0, 400);
  const kind = String(form.kind.value || "link");
  if (!title) return;
  if (form.url.value && !url) {
    setStatus("Resource URL must be https.");
    return;
  }
  const ok = await persistAppend({
    appendResource: {
      id: `resource-${Date.now()}`,
      title,
      url,
      note,
      kind,
      addedAt: new Date().toISOString()
    }
  });
  if (ok) form.reset();
});

document.querySelector("#tool-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (honeypotFilled(form)) return;
  const name = String(form.name.value || "").trim().slice(0, 120);
  const url = safeHttps(form.url.value);
  if (!name) return;
  if (form.url.value && !url) {
    setStatus("Tool URL must be https.");
    return;
  }
  const ok = await persistAppend({
    appendTool: {
      id: `tool-${Date.now()}`,
      name,
      category: String(form.category.value || "general").trim().slice(0, 80) || "general",
      kind: String(form.kind.value || "software"),
      url,
      whyRelevant: String(form.whyRelevant.value || "").trim().slice(0, 280),
      source: "shared"
    }
  });
  if (ok) form.reset();
});

boot();
