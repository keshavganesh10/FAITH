import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { TRACKS, AUDIO_CATEGORIES, type AudioCategory } from "../../../data/audio";

export default defineTool({
  name: "list_audio_tracks",
  title: "List audio tracks",
  description: "List ad-free devotional audio tracks (slokas, bhajans, meditation mantras, aartis) available in the FAITH Listen tab. Optionally filter by category.",
  inputSchema: {
    category: z.enum(AUDIO_CATEGORIES as [AudioCategory, ...AudioCategory[]]).optional().describe("Optional audio category."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const results = category ? TRACKS.filter((t) => t.category === category) : TRACKS;
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { tracks: results },
    };
  },
});
