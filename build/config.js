const typescript = require('rollup-plugin-typescript');
const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');

module.exports = exports = [
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.esm.js',
            format: 'esm',
        },
        plugins: [
            typescript(),
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
            uglify(),
        ],
    },
];