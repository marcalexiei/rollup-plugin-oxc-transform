import type { FilterPattern } from '@rollup/pluginutils';
import type { NapiResolveOptions as ResolveOptions } from 'oxc-resolver';
import type { TransformOptions } from 'oxc-transform';

export interface Options {
  include?: FilterPattern;
  exclude?: FilterPattern;

  resolveOptions?: ResolveOptions;

  /**
   * Emit d.ts is not in scope with this plugin
   */
  transformOptions?: Omit<TransformOptions, 'typescript'>;
}
