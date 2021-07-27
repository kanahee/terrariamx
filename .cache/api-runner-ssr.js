var plugins = [{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"pure":false},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-prefetch-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":[{"family":"Open Sans","variants":["400","600"]}]},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Gatsby multiple language","short_name":"Gatsby multiple language","start_url":"/","background_color":"#16202c","theme_color":"#16202c","display":"minimal-ui","icon":"src/images/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"08969cdc4875b8d39ef1d34f0951a7bd"},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('Z:/DEVELOPMENT/TERRARIAMX/webtrmx/gatsby-multilanguage-site/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
