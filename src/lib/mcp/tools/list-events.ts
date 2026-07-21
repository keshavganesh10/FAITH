import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { EVENTS, EVENT_TYPES, type EventType } from "@/data/community";

export default defineTool({
  name: "list_community_events",
  title: "List community events",
  description: "List UK Hindu community events in the FAITH app (mandir aartis, NHSF socials, festivals, seva, study circles). Optionally filter by city substring or event type.",
  inputSchema: {
    city: z.string().optional().describe("Optional city substring filter."),
    type: z.enum(EVENT_TYPES as [EventType, ...EventType[]]).optional().describe("Optional event type filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ city, type }) => {
    const q = city?.trim().toLowerCase();
    const results = EVENTS.filter((e) => (q ? e.city.toLowerCase().includes(q) : true) && (type ? e.type === type : true));
    const trimmed = results.map((e) => ({
      id: e.id, title: e.title, type: e.type, host: e.host, city: e.city,
      date: e.date, distanceKm: e.distanceKm, description: e.description,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(trimmed, null, 2) }],
      structuredContent: { events: trimmed },
    };
  },
});
