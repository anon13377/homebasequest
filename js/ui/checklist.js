// OVERHAUL v1. Kid screen "checklist": Before School, Kitchen Shutdown, Before Bed.
// Tick only, 0 points, no photo. Ticks live in localStorage (per kid and day) and every change also appends a
// kid event check.tick { list, ids: all ticked ids now } so the parent device sees them (latest event wins).

import { CHECKLISTS } from "../../data/checklists.js";
import { h, clear, nav, dayKeyOf, dishRack, emit } from "./today.js";

function tickKey(ctx, list) { return "hbq.tick." + ctx.kid + "." + dayKeyOf(ctx) + "." + list; }
function loadTicks(ctx, list) {
  let raw = null;
  try { raw = globalThis.localStorage.getItem(tickKey(ctx, list)); } catch (e) { raw = null; }
  if (raw !== null && raw !== undefined) { try { return JSON.parse(raw) || []; } catch (e) { return []; } }
  // Nothing on this device yet: start from the synced ticks, if any.
  const kid = ctx.state && ctx.state.kids && ctx.state.kids[ctx.kid];
  const day = kid && kid.ticks && kid.ticks[dayKeyOf(ctx)];
  return day && Array.isArray(day[list]) ? day[list].slice() : [];
}
function saveTicks(ctx, list, ids) {
  try { globalThis.localStorage.setItem(tickKey(ctx, list), JSON.stringify(ids)); } catch (e) { /* no storage: ticks stay on screen only */ }
}

/** Fill {rack.am} and {rack.pm} from the daily dishRack rotation. */
export function fillText(text, dayKey, kid) {
  const rack = (when) => dishRack(dayKey, kid, when) || "your rack";
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
      try { emit(ctx, "check.tick", { list: id, ids: [...ticks] }); } catch (e) { /* the tick stays on this device */ }
    });
    ul.append(h("li", null, h("label", { class: "step" }, box, " ", h("span", { class: "step-text" }, fillText(it.text, dayKey, ctx.kid)))));
  }
  wrap.append(ul);
  for (const n of list.notes || []) wrap.append(h("p", { class: "muted note" }, fillText(n, dayKey, ctx.kid)));
  wrap.append(h("button", { type: "button", class: "btn-primary", onclick: () => nav(root, ctx, "today") }, "Back to my run"));
  root.append(wrap);
}
