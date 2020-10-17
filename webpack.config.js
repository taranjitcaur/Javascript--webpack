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
                    // Attribute name
                    attribute: 'src',
                    // Type of processing, can be `src` or `scrset`
                    type: 'src',
                    // Allow to filter some attributes (optional)
                    filter: (tag, attribute, attributes, resourcePath) => {
                      // The `tag` argument contains a name of the HTML tag.
                      // The `attribute` argument contains a name of the HTML attribute.
                      // The `attributes` argument contains all attributes of the tag.
                      // The `resourcePath` argument contains a path to the loaded HTML file.
    
                      // choose all HTML tags except img tag
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