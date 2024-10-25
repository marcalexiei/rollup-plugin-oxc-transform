import path from "node:path";

import type { Plugin } from "rollup";
import { createFilter } from "@rollup/pluginutils";
import type { TransformOptions } from "oxc-transform";
import { transform } from "oxc-transform";
import { ResolverFactory } from "oxc-resolver";

import type { Options } from "./options";

const INCLUDE_DEFAULT = /\.[mc]?[jt]sx?$/;
const EXCLUDE_DEFAULT = /node_modules/;
const EXTENSIONS_DEFAULT = [".ts", ".tsx", ".mjs", ".js", ".cjs", ".jsx"];

export function oxcTransform(options: Options = {}): Plugin {
  const {
    include = INCLUDE_DEFAULT,
    exclude = EXCLUDE_DEFAULT,
    resolveOptions,
    transformOptions,
  } = options;
  const filter = createFilter(include, exclude);

  const resolver = new ResolverFactory({
    conditionNames: ["node", "import"],
    extensions: EXTENSIONS_DEFAULT,
    ...resolveOptions,
  });

  const defaults: TransformOptions = {};

  return {
    name: "rollup-plugin-oxc-transform",

    async resolveId(source, importer) {
      if (importer) {
        const resolverResult = await resolver.async(
          path.dirname(importer),
          source
        );

        if (resolverResult.error) {
          return this.error(resolverResult.error);
        }

        return resolverResult.path;
      }
    },

    transform(code, id) {
      if (!filter(id)) return null;

      const transformResult = transform(id, code, {
        ...transformOptions,
        sourcemap: true,
      });

      return transformResult;
    },
  };
}
