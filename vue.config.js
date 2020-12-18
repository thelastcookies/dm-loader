module.exports = {
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://10.0.0.27:6073',
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
