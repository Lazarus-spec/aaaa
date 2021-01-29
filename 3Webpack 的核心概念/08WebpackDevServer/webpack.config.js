const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
    devServer:{
	  contentBase:'./dist',
        open:true,
        port:8888,
        /*proxy:{
	      '/api':'http://localhost:8888'
        }*/
    },
	entry: {
		main: './src/index.js'
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), new CleanWebpackPlugin(['dist'])],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};
