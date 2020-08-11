const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const extensions = [ '.ts', '.js' ];

module.exports = exports = [
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.esm.js',
            format: 'esm',
        },
        plugins: [
            resolve({
                extensions,
            }),
            commonjs(),
            babel({
                extensions,
            }),
        ],
    },
    {
        input: './src/index.ts',
        output: {
            file: './dist/uploader.cjs.js',
            format: 'cjs',
        },
        plugins: [
            resolve({
                extensions,
            }),
            commonjs(),
            babel({
                extensions,
            }),
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
            resolve({
                extensions,
            }),
            commonjs(),
            babel({
                extensions,
            }),
        ],
    },
];