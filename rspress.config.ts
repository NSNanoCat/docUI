import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: "docs",
  title: "Demo",
  builderConfig: {
    plugins: [
      pluginSvgr({
        svgrOptions: {
          exportType: "default",
        },
      }),
    ],
  },
});
