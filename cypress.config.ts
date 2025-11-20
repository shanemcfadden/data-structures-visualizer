import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000/${process.env.NEXT_PUBLIC_BASE_PATH || ""}`,
  },
});
