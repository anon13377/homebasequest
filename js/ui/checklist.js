// OVERHAUL v1. Kid screen "checklist": Before School, Kitchen Shutdown, Before Bed.
// Tick only, 0 points, no photo, no events: ticks live on this device only (localStorage, per kid and day).

import { CHECKLISTS } from "../../data/checklists.js";
import { h, clear, nav, dayKeyOf, dayInfo } from "./today.js";

function tickKey(ctx, list) { return "hbq.tick." + ctx.kid + "." + dayKeyOf(ctx) + "." + list; }
function loadTicks(ctx, list) {
  try { return JSON.parse(globalThis.localStorage.getItem(tickKey(ctx, list)) || "[]"); } catch (e) { return []; }
}
function saveTicks(ctx, list, ids) {
  try { globalThis.localStorage.setItem(tickKey(ctx, list), JSON.stringify(ids)); } catch (e) { /* no storage: ticks stay on screen only */ }
}

/** Fill {rack.am} and {rack.pm} from DAYS dish for this kid and day. */
export function fillText(text, dayKey, kid) {
  const info = dayInfo(dayKey);
  const rack = (when) => (info && info.dish && info.dish[when] && info.dish[when][kid]) || "your rack";
  return String(text).replace("{rack.am}", "your " + rack("am")).replace("{rack.pm}", rack("pm"));
}

export function mount(root, ctx) {
  const id = ctx.list || (ctx.step && CHECKLISTS[ctx.step] ? ctx.step : "before-school");
  const list = CHECKLISTS[id] || CHECKLISTS["before-school"];
  const dayKey = dayKeyOf(ctx);
  clear(root);
  const ticks = new Set(loadTicks(ctx, id));
  const wrap = h("div", { class: "run checklist kid-" + ctx.kid, "data-kid": ctx.kid, "data-list": id });
  wrap.append(h("header", { class: "run-head" }, h("h1", { class: "run-title" }, list.title),
    h("p", { class: "muted" }, "Must do. 0 points. Tick each one.")));
  const ul = h("ul", { class: "steps checks" });
  for (const it of list.items) {
    const box = h("input", { type: "checkbox", "data-tick": it.id, checked: ticks.has(it.id) });
    box.addEventListener("change", () => {
      if (box.checked) ticks.add(it.id); else ticks.delete(it.id);
      saveTicks(ctx, id, [...ticks]);
    });
    ul.append(h("li", null, h("label", { class: "step" }, box, " ", h("span", { class: "step-text" }, fillText(it.text, dayKey, ctx.kid)))));
  }
  wrap.append(ul);
  for (const n of list.notes || []) wrap.append(h("p", { class: "muted note" }, fillText(n, dayKey, ctx.kid)));
  wrap.append(h("button", { type: "button", class: "btn-primary", onclick: () => nav(root, ctx, "today") }, "Back to my run"));
  root.append(wrap);
}
