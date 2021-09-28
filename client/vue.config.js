const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");
const Timestamp = new Date().getTime();
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
        threshold: 10240, //文件大小大于这个值时启用压缩
        deleteOriginalAssets: false //压缩后保留原文件
      })
    ]
  },
  // publicPath:process.env.NODE_ENV === 'production' ? '/vue_workspac/aihuhuproject/' : '/',

  // 基本路径
  publicPath: '/', //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true, //open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    host: 'localhost', //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    port: 8080,
    hot: true, //hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    https: false,
    hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //目标接口域名
        secure: false, //false为http访问，true为https访问
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '' //重写接口
        }
      }
    }, // 设置代理
    before: app => {}
  },
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },
  // 第三方插件配置
  pluginOptions: {

  },
  chainWebpack: (config) => {
    config
      .module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          audio: 'src',
        }
        return options;
      });
    // 配置路径别名
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
      .set("views", resolve("./src/views"))
      .set("assets", resolve("./src/assets"))
      .set("common", resolve("./src/common"))
      .set("jquery", resolve("./node_modules/jquery"))
      .set("bootstrap", resolve("./node_modules/bootstrap"));

    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"],
      }),
      // new CompressionPlugin({
      //   algorithm: 'gzip', // 使用gzip压缩
      //   test: /\.js$|\.html$|\.css$/, // 匹配文件名
      //   filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
      //   minRatio: 1, // 压缩率小于1才会压缩
      //   threshold: 10240, // 对超过10k的数据压缩
      //   deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      // }),
    ]
  },
};