import {join} from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import configs, {dir, dll, directory} from './.vd/project.json';


const DEBUG = process.env.NODE_ENV !== 'production';

if (dir === '__dirname') {
  // return {
  //   ...configs,
  //   dir: __dirname
  // };
  configs.dir = __dirname;
};

export default {
  entry: dll.content,
  output: {
    path: join(dir, directory.production.envName, directory.production.resource, directory.production.dll),
    publicPath: directory.production.resource + '/' + directory.production.dll + '/',
    filename: dll.name + '-[hash:10].js',
    library: dll.name,
    libraryTarget: dll.target,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                extends: join(__dirname, '.babelrc'),
                cacheDirectory: true,
            }
        },
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanPlugin([
        join(dir, directory.production.envName, directory.production.resource, directory.production.dll, '*.*'),
        join(dir, directory.build.envName, '*.*'),
    ]),
    new webpack.DllPlugin({
        path: join(dir, directory.build.envName, 'manifest.json'),
        name: dll.name,
    }),
    ...DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // [删除]所有的注释
            comments: false,
            compress: {
                // 在 UglifyJs 删除没有用到的代码时不输出警告
                warnings: false,
                // [删除]所有的 'console' 语句
                // 还可以兼容 IE 浏览器
                drop_console: true,
                drop_debugger: true,
                // [内嵌]定义了但是只用到一次的变量
                collapse_vars: true,
                // [提取]出现多次但是没有定义或变量去引用的静态值
                reduce_vars: true,
            }
        }),
    ],
    new AssetsPlugin({
        path: join(dir, directory.build.envName),
        // filename: 'webpack-assets.json'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
