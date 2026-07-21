import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findPassage } from "@/data/scriptures";

export default defineTool({
  name: "get_passage",
  title: "Get scripture passage",
  description: "Get the full text of a Hindu scripture passage by id (e.g. `gita-2-47`, `isha-1`). Returns Sanskrit, transliteration, translation, and commentary when available. Use `list_scriptures` first to discover valid ids.",
  inputSchema: { id: z.string().describe("Passage id, for example `gita-2-47`.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const passage = findPassage(id);
    if (!passage) {
      return { content: [{ type: "text", text: `No passage found for id \`${id}\`.` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(passage, null, 2) }],
      structuredContent: { passage },
    };
  },
});
