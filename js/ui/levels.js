// OVERHAUL v1. Kid screen "levels": replaces the Reward Shop. Weekly levels by points earned Mon..Sun.

import { h, clear, nav, dayKeyOf, kidState } from "./today.js";
import { weekPoints, levelFor } from "../rules.js";

export function mount(root, ctx) {
  const pts = weekPoints(kidState(ctx), dayKeyOf(ctx));
  const lv = levelFor(pts, ctx.config);
  clear(root);
  const wrap = h("div", { class: "run levels kid-" + ctx.kid, "data-kid": ctx.kid });
  wrap.append(h("header", { class: "run-head" }, h("h1", { class: "run-title" }, "This week's levels"),
    h("p", { class: "coin-chip", "data-week-points": String(pts) }, pts + " points this week")));
  wrap.append(h("p", { class: "muted", "data-next": "" }, lv.next
    ? (lv.next.at - pts) + " more points to " + lv.next.name + "."
    : "Top level reached. Great week!"));
  const ul = h("ul", { class: "steps" });
  for (const l of (ctx.config.levels || []).slice().sort((a, b) => a.at - b.at)) {
    const got = pts >= l.at;
    const pct = Math.min(100, Math.round((pts / l.at) * 100));
    ul.append(h("li", { class: "step", "data-level": String(l.at), "data-reached": got ? "yes" : "no" },
      h("span", { class: "dot", "aria-hidden": "true" }, got ? "✓" : ""),
      h("span", { class: "step-text" }, h("span", { class: "step-name" }, l.at + ": " + l.name),
        h("span", { class: "step-status" }, got ? "Reached" : pct + "% of the way"))));
  }
  wrap.append(ul);
  wrap.append(h("p", { class: "muted" }, "Points reset every week. The board clears Sunday."));
  wrap.append(h("button", { type: "button", class: "btn-primary", onclick: () => nav(root, ctx, "today") }, "Back to my run"));
  root.append(wrap);
}
