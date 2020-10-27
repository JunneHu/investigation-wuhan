import {join, resolve} from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanPlugin from 'clean-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import commonConfig from './webpack.config.common';
import configs, {dir, directory, general, debug} from './.vd/project.json';


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

// 动态获取本机 IP 地址
function getIpAddress() {
    const interfaces = require('os').networkInterfaces(); // eslint-disable-line global-require
    for (const devName in interfaces) { // eslint-disable-line guard-for-in, no-restricted-syntax
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i += 1) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}
const $host = getIpAddress();


export default merge.smart(commonConfig, {
  devServer: {
      host: $host,
      port: debug.port,
      hot: true,
      inline: true,
      historyApiFallback: true,
      compress: true,
      open: debug.browsersync.open,
      contentBase: join(dir, directory.production.envName),
      publicPath: resolve(general.publicPath, '/'),
  },
  entry: {
    index: join(dir, directory.development.envName, 'index.js'),
  },
  plugins: [
    new CleanPlugin([
        join(dir, directory.production.envName, '*.html'),
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...debug.sync == false ? [] : [
        new BrowserSyncPlugin({
            host: $host,
            port:  debug.browsersync.port,
            proxy:  'http://' + $host + ':' + debug.port,
            open:  debug.browsersync.open,
        }),
    ],
    new webpack.ProvidePlugin({
        'Mock': 'mockjs',
        'MockAdapter': 'axios-mock-adapter',
    }),
    new webpack.DefinePlugin({
        '__DEV__': true,
    }),
  ],
});
