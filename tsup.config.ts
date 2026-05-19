import { defineConfig } from "tsup";
import vue from "unplugin-vue/esbuild";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: false,
  clean: true,
  external: ["vue", "react", "react-dom", "flowchart-sequence-designer"],
  sourcemap: true,
  esbuildPlugins: [vue()],
});
