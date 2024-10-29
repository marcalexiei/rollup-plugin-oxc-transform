import path from 'node:path';

import type { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import { transform } from 'oxc-transform';
import { ResolverFactory } from 'oxc-resolver';

import type { Options } from './options';

const INCLUDE_DEFAULT = /\.[mc]?[jt]sx?$/;
const EXCLUDE_DEFAULT = /node_modules/;
const EXTENSIONS_DEFAULT = ['.ts', '.tsx', '.mjs', '.js', '.cjs', '.jsx'];

const PLUGIN_ERROR_RESOLVE = 'ERR_RESOLVE';
const PLUGIN_ERROR_TRANSFORM = 'ERR_TRANSFORM';

export function oxcTransform(options: Options = {}): Plugin {
  const {
    include = INCLUDE_DEFAULT,
    exclude = EXCLUDE_DEFAULT,
    resolveOptions,
    transformOptions,
  } = options;
  const filter = createFilter(include, exclude);

  const resolver = new ResolverFactory({
    conditionNames: ['node', 'import'],
    extensions: EXTENSIONS_DEFAULT,
    ...resolveOptions,
  });

  return {
    name: 'rollup-plugin-oxc-transform',

    async resolveId(source, importer) {
      if (importer) {
        const resolverResult = await resolver.async(
          path.dirname(importer),
          source,
        );

        if (resolverResult.error) {
          return this.error({
            pluginCode: PLUGIN_ERROR_RESOLVE,
            // id is the file where the error is,
            // which in the following scenario is the importer
            id: importer,
            message: resolverResult.error,
          });
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

      if (transformResult.errors.length > 0) {
        return this.error({
          pluginCode: PLUGIN_ERROR_TRANSFORM,
          message: ['\ntransform errors:', ...transformResult.errors].join(
            '\n\n',
          ),
        });
      }

      return transformResult;
    },
  };
}
