module.exports = {
    devServer: {
        open: true,
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
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
    },
    transpileDependencies: ['resize-detector', 'element-ui']
}