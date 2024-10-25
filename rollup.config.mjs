import fs from 'node:fs/promises';

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/index.ts',

  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: 'dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    {
      name: 'clean-dist',
      async buildStart() {
        await fs.rm('./dist', { recursive: true, force: true });
      },
    },
    typescript({ tsconfig: 'tsconfig.build.json' }),
  ],
  external: async () => {
    const rootPackage = JSON.parse(await fs.readFile('package.json'));
    return [
      ...Object.keys(rootPackage.dependencies),
      ...Object.keys(rootPackage.peerDependencies),
    ];
  },
});
