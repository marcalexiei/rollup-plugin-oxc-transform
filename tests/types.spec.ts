import type { RollupOptions } from "rollup";

import { oxcTransform } from "../src/index";

const config: RollupOptions = {
  input: "main.js",
  output: {
    file: "bundle.js",
    format: "iife",
  },
  plugins: [oxcTransform({})],
};

export default config;
