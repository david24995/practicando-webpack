const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader"
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: { minimize: true } 
            //     }
            // },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        }
                    }
                ]
            },{
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: true,
                      },
                      pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.handlebars',
            // filename:'index.html'
            // minify: {
            //     collapseWhitespace: true,
            //     removeComments: true,
            //     removeRedundantAttributes: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     useShortDoctype: true
            // }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentHash].css',
            ignoreOrder:false
        }),
        new CleanWebpackPlugin({})
    ]

}