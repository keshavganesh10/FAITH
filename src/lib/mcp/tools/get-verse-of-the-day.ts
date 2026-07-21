import { defineTool } from "@lovable.dev/mcp-js";
import { VERSE_OF_DAY } from "../../../data/scriptures";

export default defineTool({
  name: "get_verse_of_the_day",
  title: "Get verse of the day",
  description: "Get today's featured Hindu scripture verse from the FAITH app, including Sanskrit, transliteration, English translation, and commentary.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(VERSE_OF_DAY, null, 2) }],
    structuredContent: { verse: VERSE_OF_DAY },
  }),
});
