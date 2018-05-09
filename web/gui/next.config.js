const isProd = process.env.NODE_ENV === 'production'
const chainlinkPort = process.env.PORT || 6688

module.exports = {
  assetPrefix: isProd ? '/gui' : '',
  exportPathMap: function(defaultPathMap) {
    const overrides = {
      '/': { page: '/index', query: { port: chainlinkPort } }
    }

    return Object.assign({}, defaultPathMap, overrides)
  }
}
