const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleguidePlugin = require('./.blat-scripts/plugins/styleguidePlugin');

const HtmlWebpackPluginHelper = require('./.blat-scripts/templates/webpackHtmlTemplateHelper');
const cssLoaders = require('./.blat-scripts/loaders/cssLoadersHelper');

const htmlWebpackPlugins = HtmlWebpackPluginHelper().files.map(file => {
    return new HtmlWebpackPlugin(file)
})

const styleguidePlugin = new StyleguidePlugin({
    source: 'src/css',
    destination: 'dist/docs',
    template: 'node_modules/bkss/dist/template',
    title: "Living Styleguide"
})

const banner = `@package ${pkg.name}
@version ${pkg.version}
@build ${new Date().toUTCString()}`

module.exports = {
    entry: [
        require.resolve('./.blat-scripts/polyfills.js'),
        './src/js/index',
        './src/css/index.scss',
        ...HtmlWebpackPluginHelper().files.map(f => f.entry)
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: '/'
    },

    plugins: [
        ...htmlWebpackPlugins,
        new ExtractTextPlugin('css/main.css'),
        styleguidePlugin,
        new webpack.BannerPlugin(banner),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],

    module: {
        
        rules: [

            {
                test: /\.js$/,
                enforce: 'pre',
                include: [ path.resolve(__dirname, 'src') ],
                loader: 'eslint-loader',
                options: {
                    useEslintrc: false,
                    configFile: path.join(__dirname, '.blat-scripts/eslint/eslintrc')
                }
            },

            {
                test: /\.html$/,
                include: [ path.resolve(__dirname, 'src') ],
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            },

            {
                test: /\.scss$/,
                use: cssLoaders(ExtractTextPlugin, process.env.NODE_ENV)
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    cacheDirectory: true,
                    presets: [
                        ['env', {useBuiltIns: false}],
                        ['stage-3']
                    ],
                }
            },

            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.scss$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.svg$/,
                ],
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },

            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },

        ]

    }
}
