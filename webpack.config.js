const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      loader: 'babel-polyfill',
      app: './src/js/index.js',
    },
    output: {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader', //3. Inject styles into DOM
            'css-loader', //2. Turn css into commonjs
            'sass-loader' //1. Turn sass into css
          ]         
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader",
            options: {
              attributes: {
                list: [                 
                  {
                    tag: 'use',
                    attribute: 'href',
                    type: 'src',
                  },
                  {
                    attribute: 'src',
                    type: 'src',         
                    filter: (tag, attribute, attributes, resourcePath) => {      
                      return tag.toLowerCase() == 'img';
                    },
                  },
                ],
              },
            },
          }
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "img"
          }
          }
        }

      ]
    }
  };