module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/mixins";`
      },
    }
  },
  chainWebpack: config => {
    // disable css minification
    config.plugins.delete('optimize-css');

    // base64 embed icons
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .use('svg-url-loader')
      .loader('svg-url-loader');
  }
}
