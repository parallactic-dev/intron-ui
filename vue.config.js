module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/mixins";`
      },
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-url-loader')
      .loader('svg-url-loader')
  }
}
