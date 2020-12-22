const path = require('path');
export default {
  hash: true,
  outputPath: 'qmjsh5',
  history: 'browser',
  publicPath: '/qmjsh5/',
  base: '/qmjsh5/',
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ]
      },
      hardSource: false,
      locale: {
        default: 'zh-CN', // default zh-CN, if baseSeparator set _，default zh_CN
        baseNavigator: true, // default true, when it is true, will use navigator.language overwrite default
        antd: true, // use antd, default is true
        baseSeparator: '-', // the separator between lang and language, default -
      },
    }]
  ],
  targets: {
    ie: 11,
  },
  urlLoaderExcludes: [/.svg$/],
  chainWebpack(config) {
    config.module.rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'))
  },
  alias: {
    assets: path.resolve(__dirname, 'src/assets'),
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    services: path.resolve(__dirname, 'src/services'),
    models: path.resolve(__dirname, 'src/models'),
    themes:path.resolve(__dirname,'src/styles'),
    images: path.resolve(__dirname, 'src/assets')
  }
}
