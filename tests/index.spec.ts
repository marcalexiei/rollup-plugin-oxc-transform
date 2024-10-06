import test from "ava";
import { rollup } from "rollup";

import { oxcTransform } from "../src/index";

test.serial("ESM output for default export", async (t) => {
  const bundle = await rollup({
    input: "tests/fixtures/basic/export-default.js",
    plugins: [oxcTransform()],
  });

  const result = await bundle.generate({ format: "esm" });

  t.is(result.output.length, 1);
  const [output] = result.output;
  t.snapshot(output.code);
});

test.serial("CJS output for default export", async (t) => {
  const bundle = await rollup({
    input: "tests/fixtures/basic/export-default.js",
    plugins: [oxcTransform()],
  });

  const result = await bundle.generate({ format: "cjs" });

  t.is(result.output.length, 1);
  const [output] = result.output;
  t.snapshot(output.code);
});
