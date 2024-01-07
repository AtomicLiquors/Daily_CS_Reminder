import {build} from 'esbuild';

build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outfile: './dist/index.mjs',
  platform: 'node',
  format: 'esm',
});
