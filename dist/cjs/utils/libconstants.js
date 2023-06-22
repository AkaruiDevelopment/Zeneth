"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentAll = exports.userAgent = exports.DiscordApi = void 0;
const enums_js_1 = require("../typings/enums.js");
const DiscordApi = 'https://discord.com/api/v10';
exports.DiscordApi = DiscordApi;
const pack = {
    name: 'aoiluna',
    version: '0.0.1',
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
        lint: 'eslint . --ext .ts --fix --ext .js'
    },
    repository: {
        type: 'git',
        url: 'git+https://github.com/akaruidevelopment/aoiluna.git'
    },
    keywords: ['discord-api', 'discord', 'api', 'nodejs', 'deno', 'discordbot'],
    author: 'Akarui Development',
    license: 'Apache-2.0',
    bugs: { url: 'https://github.com/akaruidevelopment/aoiluna/issues' },
    homepage: 'https://github.com/akaruidevelopment/aoiluna#readme',
    devDependencies: {
        '@types/node': '^18.11.18',
        '@types/ws': '^8.5.4',
        typescript: '^4.9.4'
    },
    dependencies: {
        '@akarui/structures': '^2.0.1',
        'file-type': '^18.2.0',
        ws: '^8.12.0'
    },
    files: ['dist', 'README.md', 'LICENSE', 'package.json']
};
const userAgent = `DiscordBot (${pack.homepage}, ${pack.version})`;
exports.userAgent = userAgent;
const Intentslist = Object.values(enums_js_1.Intents).filter(x => typeof x === 'number');
const IntentAll = Intentslist.reduce((a, b) => a | b, 0);
exports.IntentAll = IntentAll;
//# sourceMappingURL=libconstants.js.map