var webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: './app/javascripts/index.js',
    output: {
      path: './dist/javascript/',
      filename: 'index.min.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
