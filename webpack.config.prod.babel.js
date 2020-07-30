import path from 'path';

import  merge  from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

const CommonConfig = require('./webpack.config.common.babel');


const BuildConfig = merge(CommonConfig, {
    mode: 'production',
    devtool: false,
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        namedChunks: true,
        mangleWasmImports: true,
        removeAvailableModules: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    }
});

module.exports = new Promise((resolve, reject) => {
    resolve(BuildConfig);
});
