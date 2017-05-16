const kss = require('kss');

function StyleguideWebpackPlugin (options) {
  if (!options) {
    throw 'kss webpack plugin: options is not defined. should be an object with at least "source"';
  }
  if (!options.source) {
    throw 'kss webpack plugin: source is not defined';
  }
  this.options = options;
  this.webpackCss = [];
  this.webpackJs = [];
}

StyleguideWebpackPlugin.prototype.apply = function (compiler) {
  const self = this;

  compiler.plugin('after-emit', function (compilation, callback) {
    // Reset the asset arrays.
    self.webpackCss = [];
    self.webpackJs = [];

    for (const filename in compilation.assets) {
      const assetPath = '../' + filename;
      // TODO find best way to determine order of assets from webpack.

      if (/\.js$/.test(filename)) {
        // JS file.
        if (!self.webpackJs.includes(assetPath)) {
          if (/hot-update\.js/.test(filename)) {
            // Place hot-update last.
            self.webpackJs.push(assetPath);
          } else {
            self.webpackJs.unshift(assetPath);
          }
        }
      } else if (/\.css$/.test(filename)) {
        // CSS file.
        if (!self.webpackCss.includes(assetPath)) {
          self.webpackCss.unshift(assetPath);
        }
      }
    }

    callback();
  });

  compiler.plugin('done', function () {
    self.options.css = self.options.css || [];
    self.options.js = self.options.js || [];
    // Add the webpack assets.
    const kssOptions = Object.assign({}, self.options, {
      css: self.options.css.concat(self.webpackCss),
      js: self.options.js.concat(self.webpackJs)
    });

    kss(kssOptions, function() {});
  });
};

module.exports = StyleguideWebpackPlugin;
