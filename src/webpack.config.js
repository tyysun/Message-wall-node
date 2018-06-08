var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public"),
        filename: "js/index.js"
     },
     mode: 'development',
     resolve: {
        alias: {
            jq: path.join(__dirname, "js/lib/jq"),
            mod: path.join(__dirname, "js/mod"),
            less: path.join(__dirname, "less")
        }
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ["style-loader","css-loader", "less-loader",]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images',  //指定图片路径
                        //useRelativePath: true
                    }
                }
            ]
        },
        {test: /\.svg/, loader: 'svg-url-loader'}


    
    ]
    }


};

