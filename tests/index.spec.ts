import test from "ava";
import { rollup } from "rollup";
import type { InputOption, ModuleFormat } from "rollup";

import { oxcTransform } from "../src/index";

const generateMacro = test.macro<
  [{ input: InputOption; format: ModuleFormat }]
>({
  async exec(t, { input, format }) {
    const bundle = await rollup({
      input,
      plugins: [oxcTransform()],
    });

    const result = await bundle.generate({ format });

    t.is(result.output.length, 1);
    const [output] = result.output;
    t.snapshot(output.code);
  },
  title(providedTitle, { format }) {
    return `Generate bundle "${providedTitle}" with output set to "${format}"`;
  },
});

test("JS - basic", generateMacro, {
  input: "tests/fixtures/basic/export-default.js",
  format: "esm",
});
test("JS - basic", generateMacro, {
  input: "tests/fixtures/basic/export-default.js",
  format: "cjs",
});

test("TS - basic", generateMacro, {
  input: "tests/fixtures/typescript/index.ts",
  format: "esm",
});
test("TS - basic", generateMacro, {
  input: "tests/fixtures/typescript/index.ts",
  format: "cjs",
});
