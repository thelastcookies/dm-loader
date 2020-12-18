module.exports = {
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                //要访问的跨域的api的域名
                target: 'http://10.0.0.27:6073',
                ws: true,
                secure: false,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: './',
    lintOnSave: false,
};
