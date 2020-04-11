// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        polyfills: [
          'es6.promise',
          'es6.symbol',
          // promise polyfill alone doesn't work in IE,
          // needs this as well. see: #1642
          'es6.array.iterator',
          // this is required for webpack code splitting, vuex etc.
          'es6.promise',
          // #2012 es6.promise replaces native Promise in FF and causes missing finally
          'es7.promise.finally',
        ]
      }
    ]
  ],
};