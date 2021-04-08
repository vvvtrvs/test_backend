module.exports = {
    devServer: {
        proxy: {
            '.*': {
                target: 'http://localhost:3000'
            }
        },
        disableHostCheck: true
    },
    lintOnSave: false,
    pluginOptions: {
        express: {
            shouldServeApp: true,
            serverDir: "./srv",
        },
    },
};
