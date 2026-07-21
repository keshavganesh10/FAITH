import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { MANDIRS } from "@/data/hindu";

export default defineTool({
  name: "list_mandirs",
  title: "List UK mandirs",
  description: "List Hindu mandirs (temples) across the UK that are featured in the FAITH app. Optionally filter by a city substring (e.g. `London`, `Leicester`).",
  inputSchema: { city: z.string().optional().describe("Optional city substring to filter mandirs.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ city }) => {
    const q = city?.trim().toLowerCase();
    const results = q ? MANDIRS.filter((m) => m.city.toLowerCase().includes(q)) : MANDIRS;
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { mandirs: results },
    };
  },
});
