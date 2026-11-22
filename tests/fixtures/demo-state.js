// Fixture state for ?demo=<screen> and for UI tests. Shape: CONTRACTS_v1 section 3 State.
// Kids are E and M only. No names, keys or backend links.

export const DEMO_NOW = new Date(2026, 10, 16, 16, 20, 0).getTime(); // Monday 16 Nov 2026, 4:20 pm local
export const DEMO_DAY = "2026-11-16";

function day(steps, extra) {
  return Object.assign({ started: true, order: "hw-first", steps, earned: 0, full: false, off: false }, extra || {});
}

export const DEMO_STATE = {
  kids: {
    e: {
      balance: 38, held: 30, lifetime: 68, streak: 2, shields: 0, unlocks: ["flag-star"],
      days: {
        "2026-11-16": day({ land: "self", hw: "self", read: "todo", zone: "todo", reset: "todo" }, { earned: 8 }),
      },
      ledger: [
        { seq: 1, day: "2026-11-13", tokens: 23, why: "run" },
        { seq: 2, day: "2026-11-16", tokens: 8, why: "steps" },
      ],
    },
    m: {
      balance: 21, held: 0, lifetime: 21, streak: 1, shields: 0, unlocks: [],
      days: {
        "2026-11-16": day({ land: "self", hw: "verified", read: "verified", zone: "self", reset: "fix" }, { order: "mission-first", earned: 8 }),
      },
      ledger: [{ seq: 3, day: "2026-11-16", tokens: 8, why: "steps" }],
    },
  },
  jar: { marbles: 89, goal: 1000 },
  tickets: {
    t1: { id: "t1", kid: "e", item: "snack", price: 30, team: false, status: "held" },
    t2: { id: "t2", kid: "m", item: "screen30", price: 40, team: false, status: "approved" },
  },
  flags: [],
};

export const DEMO_DEVICE = { role: "kid", kidIds: ["e"], names: { e: "E", m: "M" } };
export const DEMO_PARENT_DEVICE = { role: "parent", kidIds: ["e", "m"], names: { e: "E", m: "M" } };
