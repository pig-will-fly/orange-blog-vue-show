const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    publicPath: '/blog',
    productionSourceMap: false,
    devServer: {
        port: 9001,
        proxy: {
            '/orange': {
                target: 'http://218.244.158.146',
                secure: false,
                changOrigin: true,
                pathRewrite: {
                    '/orange': '/orange'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                },
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16,
                        unitPrecision: 5,
                        propList: ['*'],
                        selectorBlackList: ['html'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                        exclude: /node_modules/i
                    })
                ]
            }
        }
    },
    // 第三方插件配置
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/style/common.less')]
        },
    },
    configureWebpack: {
        plugins: [
            new CopyPlugin({
                patterns: [{
                    from: 'node_modules/mavon-editor/dist/highlightjs',
                    to: path.resolve(__dirname, './dist/highlight'),
                }],
            }),
            new CompressionPlugin({
                // 需要压缩的文件
                test: /\.(js|css|png|jpg)(\?.*)?$/i,
                // 文件大小大于阈值时启用压缩
                threshold: 10240,
                // 压缩后是否保留原文件
                deleteOriginalAssets: false
            })
        ]
    }
}
