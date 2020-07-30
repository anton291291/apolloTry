import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: babelLoaderExcludeNodeModulesExcept([]),
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader'
                    /*   'sass-loader', // compiles Sass to CSS, using Node Sass by default
                    'postcss-loader' */
                ],
                sideEffects: true
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|ttf|eot)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new CleanWebpackPlugin()
        /*   new Dotenv({
            path: (process.env.NODE_ENV = 'development'
                ? './.env.dev'
                : './.env.prod')
        }) */
    ]
};
