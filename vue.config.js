module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './adminMana/' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8001,
        proxy: {
            "/api": {
                target: process.env.BASE_URL,
                changeOrigin: true, // 是否改变域名
                ws: true,
                pathRewrite: {
                  // 路径重写
                  "^/api": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
                }
            }
        },
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
    }
}