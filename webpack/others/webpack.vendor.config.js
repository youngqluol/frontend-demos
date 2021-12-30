const path = require('path');
const webpack = require('webpack');
const dllAssetPath = path.join(__dirname, 'dll');
const dllLibraryName = 'dllExample';

module.exports = {
    entry: ['vue', 'vuex', 'vue-router'],
    output: {
        filename: 'vendor.js',
        path: dllAssetPath,
        library: dllLibraryName
    },
    plugins: [
        new webpack.DllPlugin({
            name: dllLibraryName,
            path: path.join(dllAssetPath, 'manifest.json')
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    mode: 'production'
}