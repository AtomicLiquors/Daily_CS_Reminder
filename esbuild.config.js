import {build} from 'esbuild';

build({
  entryPoints: ['./src/index.js'],
  outfile: './dist/index.js',
  platform: "node",
  format: 'esm', 
  external: ['path'],
});
