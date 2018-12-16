const typescript = require('rollup-plugin-typescript');
const vue = require('rollup-plugin-vue').default;
const { uglify } = require('rollup-plugin-uglify');

module.exports = exports = [
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.esm.js',
            format: 'esm',
        },
        plugins: [
            typescript(),
            vue(),
        ],
    },
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.cjs.js',
            format: 'cjs',
        },
        plugins: [
            typescript(),
            vue(),
        ],
    },
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.js',
            name: 'Uploader',
            format: 'umd',
        },
        plugins: [
            typescript(),
            vue(),
        ],
    },
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.min.js',
            name: 'Uploader',
            format: 'umd',
        },
        plugins: [
            typescript(),
            vue(),
            uglify(),
        ],
    },
];