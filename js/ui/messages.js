// 2026-11-26 Kid screen "messages": this kid's thread with Dad (event msg { text }, kid = thread), oldest first.
// Opening the screen marks Dad's messages seen on this device (unread dot on Today).

import { h, clear, kidState, emit, markMsgsSeen } from "./today.js";
import { header } from "./shop.js";
import { MSG_MAX } from "../rules.js";

let draft = ""; // survives a redraw when a pull brings new events

export function thread(msgs, dadName, kidName = "Me") {
  const ul = h("ul", { class: "msg-thread", "data-thread": "" });
  if (!msgs.length) ul.append(h("li", { class: "muted", "data-empty": "" }, "No messages yet."));
  for (const m of msgs) {
    ul.append(h("li", { class: "msg msg-" + m.from, "data-from": m.from },
      h("span", { class: "msg-who" }, (m.from === "parent" ? dadName : kidName) + " (" + m.day + "): "),
      h("span", { class: "msg-text" }, m.text)));
  }
  return ul;
}

export function mount(root, ctx) {
  clear(root);
  const msgs = kidState(ctx).msgs || [];
  markMsgsSeen(ctx.kid, msgs.filter((m) => m.from === "parent").length);
  const wrap = h("div", { class: "shop messages kid-" + ctx.kid, "data-kid": ctx.kid });
  wrap.append(header(root, ctx, "Messages"));
  wrap.append(h("section", { class: "card" }, thread(msgs, "Dad")));
  const say = h("p", { class: "muted", role: "status", "data-msg-status": "" });
  const box = h("textarea", { class: "msg-in", maxlength: String(MSG_MAX), rows: "3", "data-msg-text": "", "aria-label": "Message to Dad", placeholder: "Write to Dad" });
  box.value = draft;
  box.addEventListener("input", () => { draft = box.value; });
  wrap.append(h("section", { class: "card" }, box,
    h("button", { type: "button", class: "btn-primary", "data-msg-send": "", onclick: () => {
      const t = String(box.value || "").trim();
      if (!t) { say.textContent = "Write something first."; return; }
      if (t.length > MSG_MAX) { say.textContent = "That is too long (" + MSG_MAX + " letters max)."; return; }
      emit(ctx, "msg", { text: t });
      draft = "";
      mount(root, ctx);
    } }, "Send"), say));
  root.append(wrap);
}
