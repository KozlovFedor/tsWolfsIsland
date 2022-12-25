import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type Options = {
  mode: 'production' | 'development'
}

export default (options: Options) => {
  const prod = options.mode === 'production';
  return {
    mode: options.mode,
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
              ],
              // plugins: [
              //   '@babel/plugin-transform-runtime',
              // ],
            },
          },
        },
        {
          test: /\.(sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ]
    },
    resolve: {
      modules: [
        path.resolve(__dirname, './src'),
        'node_modules',
      ],
      extensions: [
        '.ts', '.tsx', '.js', '.jsx',
        '.png', '.gif', 'jpg', 'jpeg', 'svg',
        '.scss', '.css',
        '.json',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './public'),
        publicPath: '/public',
      },
      port: 3000,
      // publicPath: "http://localhost:3000/",
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin(),
      // new webpack.HotModuleReplacementPlugin()
    ],
    devtool: prod ? undefined : 'source-map',
  };
};