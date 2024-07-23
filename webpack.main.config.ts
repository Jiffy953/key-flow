import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export const mainConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'keyboard.json'),
          to: path.resolve(__dirname, '.webpack/main', 'keyboard.json'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};