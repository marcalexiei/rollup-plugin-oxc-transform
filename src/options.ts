import type { FilterPattern } from "@rollup/pluginutils";
import type { TransformOptions } from "oxc-transform";

export interface Options {
  transformOptions?: TransformOptions;

  include?: FilterPattern;

  exclude?: FilterPattern;
}
