// 2026-11-26 Parent screen "Messages": pick a kid, read the thread, send a msg { text } (kid = thread).

import { h, gate, shell, act, kidIds, kidLabel } from "./common.js";
import { thread } from "../ui/messages.js";
import { MSG_MAX } from "../rules.js";

let picked = null, draft = "";

export async function mount(root, ctx) {
  if (!(await gate(root, ctx))) return;
  return draw(root, ctx);
}

export function draw(root, ctx) {
  const body = shell(root, ctx, "parent-messages", "Messages");
  renderMessages(body, ctx, () => draw(root, ctx));
  return body;
}

export function renderMessages(body, ctx, rerender) {
  const ids = kidIds(ctx);
  if (!ids.includes(picked)) picked = ids[0];
  const sel = h("select", { class: "kid-sel", "data-msg-kid": "", "aria-label": "Which kid", onchange: () => { picked = sel.value; rerender(); } });
  for (const k of ids) {
    const m = ctx.state.kids[k].msgs || [];
    const waiting = m.length && m[m.length - 1].from === "kid";
    sel.append(h("option", { value: k, selected: k === picked ? "" : null }, kidLabel(ctx, k) + (waiting ? " (new)" : "")));
  }
  sel.value = picked;
  const msgs = (ctx.state.kids[picked] && ctx.state.kids[picked].msgs) || [];
  const box = h("textarea", { class: "msg-in", maxlength: String(MSG_MAX), rows: "3", "data-msg-text": "", "aria-label": "Message", placeholder: "Write to " + kidLabel(ctx, picked) });
  box.value = draft;
  box.addEventListener("input", () => { draft = box.value; });
  body.append(h("section", { class: "card", "data-msg-board": picked }, sel,
    h("div", { class: "msg-list" }, thread(msgs, "Dad", kidLabel(ctx, picked))),
    box,
    h("button", { type: "button", class: "btn-primary", "data-msg-send": "", onclick: () => {
      const t = String(box.value || "").trim();
      if (!t) { body.say("Write something first."); return; }
      if (t.length > MSG_MAX) { body.say("Too long, " + MSG_MAX + " characters max."); return; }
      draft = "";
      return act(body, ctx, rerender, picked, "msg", { text: t }, "Sent to " + kidLabel(ctx, picked) + ".");
    } }, "Send")));
}
