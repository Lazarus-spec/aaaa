const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


const prdConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
};

module.exports = merge(commonConfig,prdConfig);  // 通过merge进行基础配置和生产配置的合并
