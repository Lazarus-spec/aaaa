const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
    devtool: 'source-map',
	// development devtool: 'cheap-module-eval-source-map',
	// production devtool: 'cheap-module-source-map',
	// devtool: 'cheap-module-eval-source-map',
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
}
