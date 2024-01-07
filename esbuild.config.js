import {build} from 'esbuild';

build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  format: 'esm',
  packages: 'external'
});
