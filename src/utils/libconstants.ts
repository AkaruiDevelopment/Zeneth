
import { Intents } from "../typings/enums.js";
const DiscordApi = 'https://discord.com/api/v10';
const pack = {
  name: 'zeneth',
  version: '1.0.0-dev',
  description: 'A library to interact with discord api easily ',
  main: './dist/cjs/index.js',
  exports: { import: './dist/esm/index.js', require: './dist/cjs/index.js' },
  scripts: {
    test: 'node tests',
    start: 'node index.js',
    build: 'npm run addpkg && npx tsc -p tsconfig.esm.json && npx tsc -p tsconfig.cjs.json && npm run createpack',
    createpack: 'node packers/pack.js',
    addpkg: 'node packers/addpkgjson.js',
    bundleTsFiles: 'node packers/bundle.js',
    lint: 'eslint . --ext .ts --fix --ext .js',
    docgen: 'node ./packers/updateTypeDocConfig.js && npx typedoc --plugin typedoc-plugin-mermaid --plugin typedoc-plugin-extras --footerLastModified && node ./packers/docgen.js'
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/akaruidevelopment/zeneth.git'
  },
  keywords: [ 'discord-api', 'discord', 'api', 'nodejs', 'deno', 'discordbot' ],
  author: 'Akarui Development',
  license: 'Apache-2.0',
  bugs: { url: 'https://github.com/akaruidevelopment/zeneth/issues' },
  homepage: 'https://github.com/akaruidevelopment/zeneth#readme',
  devDependencies: {
    '@types/csso': '^5.0.0',
    '@types/node': '^18.11.18',
    '@types/uglify-js': '^3.17.1',
    '@types/ws': '^8.5.4',
    csso: '^5.0.5',
    typedoc: '^0.24.8',
    'typedoc-github-wiki-theme': '^1.1.0',
    'typedoc-plugin-extras': '^2.3.3',
    'typedoc-plugin-markdown': '^3.15.3',
    'typedoc-plugin-mermaid': '^1.10.0',
    typescript: '^4.9.4',
    'uglify-js': '^3.17.4',
    unlighthouse: '^0.9.0'
  },
  dependencies: {
    '@akarui/structures': '^2.0.1',
    'file-type': '^18.2.0',
    ws: '^8.12.0'
  },
  files: [ 'dist', 'README.md', 'LICENSE', 'package.json' ]
} as const;

const userAgent =
  `DiscordBot (${pack.homepage}, ${pack.version})` as const;

const Intentslist = <number[]> Object.values( Intents ).filter( x => typeof x === 'number' );

const IntentAll = Intentslist.reduce( ( a, b ) => a | b, 0 );

export { DiscordApi, userAgent,IntentAll };
