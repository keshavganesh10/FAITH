import { defineTool } from "@lovable.dev/mcp-js";
import { OBSERVANCES, PANCHANG } from "../../../data/practice";

export default defineTool({
  name: "list_upcoming_observances",
  title: "List upcoming observances",
  description: "List upcoming Hindu festivals and vratas (observances) with dates and descriptions, plus today's Panchang (tithi, nakshatra).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ panchang: PANCHANG, observances: OBSERVANCES }, null, 2) }],
    structuredContent: { panchang: PANCHANG, observances: OBSERVANCES },
  }),
});
