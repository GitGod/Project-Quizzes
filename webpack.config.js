const path = require("path");
const webpack = require("webpack");

const entryPath = "src";

module.exports = {
    mode: "none",
    entry: `./${entryPath}/js/app.js`,
    devtool: "inline-source-map",
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `${entryPath}/build`),
        clean: true,
    },
    devServer: {
        open: true,
        hot: true,
        liveReload: false,
        static: [
            {
                directory: path.join(__dirname, entryPath),
                publicPath: "/",
                serveIndex: true,
            },
        ],
        devMiddleware: {
            writeToDisk: true,
        },
        compress: true,
        port: 3001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(css)$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
