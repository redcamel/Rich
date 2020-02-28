import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const config ={
    input: 'src/Rich.js',
    output: [
        {
            file: 'dist/Rich.min.mjs',
            format: 'es',
            name : 'Rich'
        },
        {
            file: 'dist/Rich.min.js',
            format: 'umd',
            name : 'Rich'
        }
    ],
    plugins: [
        resolve(),
        babel({
            plugins: ["@babel/plugin-proposal-class-properties"],
            exclude: 'node_modules/**' // only transpile our source code
        }),
        terser({
            // module: true,
            // toplevel:true,
            // keep_classnames:true,
            keep_fnames :true
        })
    ]
};

export default config