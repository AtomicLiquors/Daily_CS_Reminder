const {build} = require('esbuild');

build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outfile: './dist/index.js',
  platform: "node",
});
