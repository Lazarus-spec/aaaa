const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [
		    {
                test: /\.(jpg|png|gif)$/,
                use:{
                    loader: 'url-loader',
                    options:{
                        name:'[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 20480
                    }
                }
		    },
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            moudles:true,
                            importLoaders:2
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use:{
                    loader: 'file-loader'
                }
            }
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}
