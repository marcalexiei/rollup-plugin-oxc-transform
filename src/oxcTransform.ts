import type { Plugin } from "rollup";
import { createFilter } from "@rollup/pluginutils";
import type { TransformOptions } from "oxc-transform";
import { transform } from "oxc-transform";

import type { Options } from "./options";

export function oxcTransform(options: Options = {}): Plugin {
  const { include, exclude, transformOptions } = options;
  const filter = createFilter(include, exclude);

  const defaults: TransformOptions = {};

  const oxcTransformOptions: TransformOptions = {
    ...defaults,
    ...transformOptions,
  };

  return {
    name: "rollup-plugin-oxc-transform",

    transform(code, id) {
      if (!filter(id)) return null;

      return transform(id, code, {
        ...oxcTransformOptions,
        sourcemap: true,
      });
    },
  };
}
