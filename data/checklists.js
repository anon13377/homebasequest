// OVERHAUL v1: tick only checklists, 0 points, no photo, never block the screen break.
// Wording copied from HomeBaseHQ/cards.html, EVERY DAY card. {rack.am} / {rack.pm} are filled from DAYS dish.

export const CHECKLISTS = {
  "before-school": {
    title: "Before School",
    when: "morning",
    items: [
      { id: "bs-1", text: "Make your bed. Blanket flat, pillows up, stuffies on top" },
      { id: "bs-2", text: "Unload your half of the dishwasher if it is clean ({rack.am})" },
      { id: "bs-3", text: "Clothes off your floor into the hamper" },
      { id: "bs-4", text: "Backpack and coat on the hook" },
    ],
    notes: ["Then your two missions. Timer on. M 15 min, E 20 min"],
  },
  "kitchen": {
    title: "After Dinner: Kitchen Shutdown",
    when: "evening",
    items: [
      { id: "ks-1", text: "1. Clear the table. Both of you. Nothing starts till it is empty" },
      { id: "ks-2", text: "2. DRAIN CATCHER IN before any water. [M] No catcher, no water" },
      { id: "ks-3", text: "3. Scrape the chunks into the trash. [M] Not down the sink" },
      { id: "ks-4", text: "4. JET off what is stuck. [M] Dish held low, spray straight down. Stop when nothing is stuck. Do not make it shiny, the soap needs food to grab onto" },
      { id: "ks-5", text: "5. Load your rack. [E] Bottom: dirty side faces the middle. Big things to the sides. Nothing touching" },
      { id: "ks-6", text: "6. Load your rack. [M] Top: cups upside down and tilted. Plastic on top only" },
      { id: "ks-7", text: "7. Silverware. [E] Handles up, mix them up, no two spoons stacked" },
      { id: "ks-8", text: "8. SPIN THE SPRAY ARMS with your hand. [E] If one bumps, move the thing" },
      { id: "ks-9", text: "9. Detergent in, door shut, start. [E] Only if it is full" },
      { id: "ks-10", text: "10. Empty the drain catcher into the trash. [M] Then wipe the counters, then the table. Table last" },
    ],
    notes: [
      "Tonight you load the {rack.pm}.",
      "Mom and Dad put the food away. Kids do not touch leftovers, containers, or the fridge.",
      "GLASS, the whole time: never clang two glasses together, even lightly. Never rinse a glass dish over another glass. One glass thing at a time. Glass never under a pile of plates. A chipped glass goes to a grown-up, never in the dishwasher.",
      "THREE HARD STOPS: never fill the sink, never put a hand in water you cannot see the bottom of. If a glass breaks, hands out, water off, get a grown-up, pick up nothing. If you see a knife in the sink, do not reach for it, tell a grown-up.",
      "Warm water, never all the way hot. The dishwasher does the sanitising.",
      "KITCHEN CLOSED, +10 EACH. If it all gets done and nobody had to remind you. The job is not worth points. Starting it yourselves is.",
    ],
  },
  "before-bed": {
    title: "Before Bed: 5 Min Reset",
    when: "evening",
    items: [
      { id: "bb-1", text: "Bedroom floor to its spots" },
      { id: "bb-2", text: "Your stuff out of the living room" },
      { id: "bb-3", text: "Plates and cups to the kitchen counter" },
      { id: "bb-4", text: "Homework back in the backpack, backpack on its hook" },
      { id: "bb-5", text: "Tomorrow's clothes set out" },
      { id: "bb-6", text: "The Door Test" },
    ],
    notes: ["Door Test: stand in the doorway, left shoulder to the side where the handle is, do not walk in. Count what is out of place. 0 to 2 = pass. A parent marks the pass for the streak."],
  },
};

export default CHECKLISTS;
