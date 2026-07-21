import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PRODUCTS, CATEGORIES, VENDORS, type Category } from "@/data/marketplace";

export default defineTool({
  name: "list_products",
  title: "List marketplace products",
  description: "List Puja and Hindu lifestyle products from UK vendors in the FAITH marketplace. Optionally filter by category (e.g. `Puja Thalis`, `Murtis`, `Incense & Oils`, `Sweets & Prasad`).",
  inputSchema: {
    category: z.enum(CATEGORIES as [Category, ...Category[]]).optional().describe("Optional product category."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const filtered = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
    const withVendor = filtered.map((p) => ({
      ...p,
      vendor: VENDORS.find((v) => v.id === p.vendorId)?.name,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(withVendor, null, 2) }],
      structuredContent: { products: withVendor },
    };
  },
});
