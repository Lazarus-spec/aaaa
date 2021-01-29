const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	externals: 'lodash',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		library: 'root',   // 全局变量library，标签化引入
		libraryTarget: 'umd'  // 挂载方式 常用模块化引入
		// libraryTarget: 'window'  // 挂载方式
		// libraryTarget: 'this'  // 挂载方式
		// libraryTarget: 'global'  // 挂载方式 node 中
	}
}
