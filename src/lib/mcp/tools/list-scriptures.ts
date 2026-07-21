import { defineTool } from "@lovable.dev/mcp-js";
import { SCRIPTURES } from "@/data/scriptures";

export default defineTool({
  name: "list_scriptures",
  title: "List scriptures",
  description: "List all Hindu scripture books available in the FAITH library (Bhagavad Gita, Upanishads, Vedas, Puranas, Yoga Sutras, Hanuman Chalisa, etc.) with each book's passage titles and references.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = SCRIPTURES.map((b) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      passageCount: b.passages.length,
      passages: b.passages.map((p) => ({ id: p.id, title: p.title, reference: p.reference })),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { books: summary },
    };
  },
});
