// Load the published prototype catalog and render partnership cards.
const grid = document.querySelector("#catalog-grid");
const meta = document.querySelector("#catalog-meta");

function card(item) {
  const link = document.createElement("a");
  link.className = "card";
  link.href = `/prototypes/${encodeURIComponent(item.slug)}`;
  link.innerHTML = `
    <h3></h3>
    <p></p>
    <div class="meta"><span></span><span>Open prototype</span></div>
  `;
  link.querySelector("h3").textContent = item.conceptName || item.slug;
  link.querySelector("p").textContent = item.positioning || "Competitive prototype ready for partnership review.";
  const company = [item.companyName, item.productName].filter(Boolean).join(" · ") || "Partnership build";
  link.querySelector(".meta span").textContent = company;
  return link;
}

async function loadCatalog() {
  try {
    const response = await fetch("/catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalog unavailable (${response.status})`);
    const data = await response.json();
    const items = Array.isArray(data.prototypes) ? data.prototypes : [];
    meta.textContent = items.length
      ? `${items.length} published · updated ${data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "recently"}`
      : "No prototypes published yet.";
    grid.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Published prototypes will appear here after the first public release.";
      grid.append(empty);
      return;
    }
    for (const item of items) grid.append(card(item));
  } catch (error) {
    meta.textContent = "Could not load catalog.";
    grid.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = error instanceof Error ? error.message : "Catalog error.";
    grid.append(empty);
  }
}

loadCatalog();
