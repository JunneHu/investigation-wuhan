import {join, resolve} from 'path';
import fs from 'fs';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SpritesmithPlugin from 'webpack-spritesmith';
import SvgSpritePlugin from 'svg-sprite-loader/plugin';
import autoprefixer from 'autoprefixer';

import configs, {dir, dll, directory, general, compiler, theme} from './.vd/project.json';


const DEBUG = process.env.NODE_ENV !== 'production';

if (dir === '__dirname') {
  // return {
  //   ...configs,
  //   dir: __dirname
  // };
  configs.dir = __dirname;
};

// 开发模式下，hash 部署方式下，fix 处理
if (DEBUG && general.publicPath === '.') {
  configs.general.publicPath = '';
};

// 读取改文件前，请先确保执行了 dll 命令
const assets = JSON.parse( fs.readFileSync(join(dir, directory.build.envName, 'webpack-assets.json'), 'utf8') );

// less & image 目录
const styleDirs = [
  join(__dirname, 'node_modules'),
  join(dir, directory.build.envName),
  join(dir, directory.development.envName),
];

// svg 目录
const svgDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''),
  join(dir, directory.development.envName),
];

export default {
  output: {
    path: join(dir, directory.production.envName),
    publicPath: general.publicPath + '/',
    filename: directory.production.resource + '/' + directory.production.javascript + '/' + '[name]-[hash:10].js',
    chunkFilename: directory.production.resource + '/' + directory.production.javascript + '/' + '[name]-[chunkhash:10].js',
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
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: compiler.css.less.minimize,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                autoprefixer(compiler.css.postcss.autoprefixer),
              ],
            }
          },
        ],
        include: styleDirs,
      },
      {
        test: /\.less$/,
        use: DEBUG ? [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: !compiler.css.less.minimize,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                autoprefixer(compiler.css.postcss.autoprefixer),
              ],
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
            }
          },
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: compiler.css.less.minimize,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  autoprefixer(compiler.css.postcss.autoprefixer),
                ],
              }
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: theme,
              }
            },
          ]
        }),
        include: styleDirs,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:10].[ext]',
              limit: compiler.asset.image.optimizer.limit,
              outputPath: directory.production.resource + '/' + directory.production.asset + '/',
              // publicPath: '/',
              // useRelativePath: !DEBUG,
            }
          },
          'image-webpack-loader',
        ],
        include: styleDirs,
      },
      {
        test: /\.svg$/,
        use: [{
            loader: 'svg-sprite-loader',
            options: {
              extract: compiler.asset.svg.sprite.extract,
              spriteFilename: directory.production.resource + '/' + directory.production.asset + '/' + 'sprite.svg',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [{
                    cleanupAttrs: true
                  }, // 清理属性换行和重复的空格
                  {
                    cleanupEnableBackground: true
                  }, // 移除或清理 enable-background 属性
                  {
                    cleanupIDs: true
                  }, // 清理未使用的 和 压缩使用的 ID
                  {
                    removeRasterImages: true
                  }, // 移除栅格图标，默认值 false √
                  {
                    removeDimensions: true
                  }, // 移除 width/height 属性，默认值 false √
                  {
                    removeStyleElement: true
                  }, // 移除 <style> 元素，默认值 false √
                ]
              }
            }
          },
        ],
        include: svgDirs,
      }
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: join(dir, directory.development.envName, 'index.ejs'),
      inject: true, // true: 'body', 'head'; false
      // filename: 'index.html',  // index.html
      title: compiler.html.title,
      description: compiler.html.description,
      keywords: compiler.html.keywords,
      favicon: join(dir, directory.development.envName, 'favicon.ico'),
      bundle: general.publicPath + '/' + assets.main.js,
      minify: DEBUG ? {} : {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        trimCustomFragments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyPlugin([
      {
        context: dir,
        from: join(dir, directory.development.envName, directory.development.config, 'configs.js'),
        to: join(dir, directory.production.envName, directory.production.resource, directory.production.javascript),
      },
      {
        context: dir,
        from: join(dir, directory.development.envName, directory.development.config, 'xlsx', 'jszip.js'),
        to: join(dir, directory.production.envName, directory.production.resource, directory.production.javascript),
      },
      {
        context: dir,
        from: join(dir, directory.development.envName, directory.development.config, 'xlsx', 'shim.js'),
        to: join(dir, directory.production.envName, directory.production.resource, directory.production.javascript),
      },
      {
        context: dir,
        from: join(dir, directory.development.envName, directory.development.config, 'xlsx', 'xlsx.js'),
        to: join(dir, directory.production.envName, directory.production.resource, directory.production.javascript),
      },
      {
        context: dir,
        from: join(dir, directory.development.envName, directory.development.config, 'xlsx', 'xlsxworker.js'),
        to: join(dir, directory.production.envName, directory.production.resource, directory.production.javascript),
      }
    ]),
    new webpack.DllReferencePlugin({
      context: dir,
      manifest: require(join(dir, directory.build.envName, 'manifest.json')),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    ...DEBUG ? [] : [
      new ExtractTextPlugin({
        filename: directory.production.resource + '/' + directory.production.style + '/' + '[name]-[hash:10].css',
        allChunks: true,
      }),
    ],
    ...compiler.asset.svg.sprite.extract === true ? [new SvgSpritePlugin()] : [],
    new SpritesmithPlugin({
      src: {
        cwd: join(dir, directory.development.envName, directory.development.sprite),
        glob: '*.png',
      },
      target: {
        image: join(dir, directory.build.envName, 'sprite.png'),
        css: join(dir, directory.build.envName, 'sprite.less'),
      },
      apiOptions: {
        cssImageRef: 'sprite.png',
      },
    }),
  ],
  devtool: DEBUG ? 'cheap-module-eval-source-map' : '',
  resolve: {
    alias: general.resolve.alias,
    // Ant Design Mobile（Web）：".web.js"
    extensions: general.resolve.extensions,
    // 普通版：main
    // ES2015+ Version：jsnext:main
    mainFields: general.resolve.mainFields,
    modules: [
      join(dir, directory.build.envName),
      join(__dirname, 'node_modules'),
    ],
  },
  externals: general.externals,
  performance: {
    hints: DEBUG ? false : 'warning',
    maxAssetSize: general.performance.maxAssetSize,
    maxEntrypointSize: general.performance.maxEntrypointSize,
  },
};
