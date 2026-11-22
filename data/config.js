// Home Base Quest config. Every number the app uses lives here (CONTRACTS section 3).
// Sources: SCOPE_v1.md sections 3 to 6 and SCOPE_v2_ADDENDUM.md (addendum wins).
// Parent editors change these through config.set events; this file is the default.

export const CONFIG = Object.freeze({
  version: "hbq-v1",

  // Backend. The real URL is entered on each device during setup and never committed.
  backend: {
    url: "https://backend.invalid/exec", // placeholder only, lint allows no other host
    pullEverySec: 60,
    photoMaxBytes: 400 * 1024,
  },

  kids: ["e", "m"],

  // Step order. Land first, then the kid picks hw-first or mission-first.
  steps: ["land", "hw", "read", "zone", "reset"],
  orders: ["hw-first", "mission-first"],

  // Points (OVERHAUL v1, matches the printed points.html). Required steps other than the two missions pay 0.
  tokens: {
    land: 0,
    hw: 0,
    read: 0,
    zone: 20,
    reset: 20,
    kitchenClosed: 10, // per kid per day, parent button
    toteDump: 50, // Friday team bonus, each kid, once per week
    toteTimer: 15, // Friday team bonus, each kid, once per week
    lidsClose: 25, // Friday team bonus, each kid, once per week
    doorStreak: 50, // five Door Test passes in a row, doorTest.kids only
  },
  dailyMax: 40,

  // Fresh start: events dated before this day stay in the Sheet but do not count.
  scoringStart: "2026-11-23",

  // Weekly levels by points earned Mon..Sun (points reset every week).
  levels: [
    { at: 200, name: "Pick a treat" },
    { at: 250, name: "Movie night" },
    { at: 295, name: "Game night" },
    { at: 340, name: "Family outing or Saturday screen day" },
  ],

  // Daily screen break: both missions (40 pts) and homework done = 30 minutes, else 0.
  screenBreak: { minPoints: 40, minutes: 30 },

  // Nightly Door Test (Before Bed reset). Parent marks pass; streak passes in a row pay doorStreak.
  doorTest: { kids: ["m"], streak: 5 },

  // E pays on Self (with photo where required), M pays on Verified (addendum answer 7).
  payOn: { e: "self", m: "verified" },
  // Only these steps wait for Verified under a "verified" payOn; the rest pay on Self (golden S4).
  checkSteps: ["zone", "reset"],

  // Photo Proof (addendum). These steps need one photo to reach Self.
  photoSteps: ["zone", "reset", "hw"],
  photo: {
    longSide: 1024,
    targetBytes: 150 * 1024,
    maxBytes: 400 * 1024,
    jpegQuality: 0.8,
    keepDays: 14,
  },

  // Times, device local, 24 hour "HH:MM" (addendum answer 5).
  times: {
    start: "15:45",
    dinnerCutoff: "18:00",
    nudgeAfterMin: 30,
    quietFrom: "20:00", // nudge() sleeps from here ...
    quietTo: "06:00", // ... to here, script time zone
    digest: "19:00",
    sundaySummary: "18:00",
  },

  // Timers in minutes.
  timers: {
    reading: 20,
    brainTime: 15,
    missionCap: { e: 20, m: 15 },
  },

  homeworkSubjects: ["math", "reading-log", "spelling", "science", "other"],

  // School days: 1 = Monday ... 5 = Friday (JS getDay numbering, Sunday 0).
  schoolDays: [1, 2, 3, 4, 5],

  // Power Streak and Base upgrades (SCOPE 4).
  streak: {
    shieldEvery: 10,
    unlockAt: [3, 5, 10, 20, 40],
    lifetimeUnlockAt: [100, 250, 500, 1000],
  },

  // Friday Crate (SCOPE 4).
  crate: {
    minFullRuns: 4,
    tokensMin: 5,
    tokensMax: 15,
    unlockChance: 0.3,
    day: 5,
  },

  // Family Jar (SCOPE 4).
  jar: { goal: 1000 },

  // Repeated fail flag (SCOPE 3): same item failing this many weeks in a row.
  flagFailWeeks: 3,

  // Reward Shop retired in OVERHAUL v1 (rewards are the weekly levels). Empty shelf: any buy is refused.
  shop: [],

  // Pushes (SCOPE 6, addendum answers 2 and 4). Each can be switched off.
  pushes: {
    started: true,
    needsCheck: true,
    request: true,
    runComplete: true,
    notStarted: true,
    digest: true,
    sunday: true,
    emailSubjectPrefix: "[HBQ]",
  },

  // UI.
  ui: {
    minTouchPx: 56,
    narrowestPx: 360,
  },
});

export default CONFIG;
