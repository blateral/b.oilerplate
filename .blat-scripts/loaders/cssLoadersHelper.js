const postcssConfig = require('./postcss.config')

module.exports = (extractTextPlugin, env) => {
    return env === 'production'
        ? extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                { 
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    } 
                },
                { 
                    loader: 'postcss-loader',
                    options: postcssConfig
                },
                { loader: 'sass-loader' },
            ]
        })

        : [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { 
                loader: 'postcss-loader',
                options: postcssConfig
            },
            { loader: 'sass-loader' },
        ]
}
