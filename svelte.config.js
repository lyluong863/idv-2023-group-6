import { readFileSync } from "fs";
import adapterStatic from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const { subdirectory } = JSON.parse(readFileSync("package.json", "utf8"));
const dev = process.env.NODE_ENV !== "production";
const dir = subdirectory || "";
const prefix = dir.startsWith("/") ? "" : "/";

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [autoprefixer],
  },
});

const config = {
  preprocess,
  kit: {
    adapter: adapterStatic({ paths: { base: dev ? "" : "/idv-2023-group-6" } }),
    alias: {
      "components/*": "src/components/*",
      "data/*": "src/data/*",
      "routes/*": "src/routes/*",
      "layouts/*": "src/layouts/*",
      "pages/*": "src/pages/*",
      "styles/*": "src/styles/*",
      "svg-icons/*": "src/svg-icons/*",
      "utils/*": "src/utils/*",
    },
  },
};

export default config;
