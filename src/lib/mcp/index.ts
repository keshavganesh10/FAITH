import { defineMcp } from "@lovable.dev/mcp-js";
import getVerseOfTheDay from "./tools/get-verse-of-the-day";
import listScriptures from "./tools/list-scriptures";
import getPassage from "./tools/get-passage";
import listObservances from "./tools/list-observances";
import listMandirs from "./tools/list-mandirs";
import listEvents from "./tools/list-events";
import listProducts from "./tools/list-products";
import listAudio from "./tools/list-audio";

export default defineMcp({
  name: "faith-mcp",
  title: "FAITH — UK Hindu Hub",
  version: "0.1.0",
  instructions:
    "Tools for the FAITH app, a UK Hindu community hub. Use these tools to read the Verse of the Day, browse the scripture library (Bhagavad Gita, Upanishads, Vedas, Puranas, Yoga Sutras, etc.) and fetch full passages, discover upcoming Hindu observances and today's Panchang, find UK mandirs and NHSF community events, browse the Puja marketplace, and list devotional audio tracks. All data is public.",
  tools: [
    getVerseOfTheDay,
    listScriptures,
    getPassage,
    listObservances,
    listMandirs,
    listEvents,
    listProducts,
    listAudio,
  ],
});
