import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'keyboard.json'),
          to: path.resolve(__dirname, '.webpack/renderer', 'keyboard.json'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};

export { rendererConfig };