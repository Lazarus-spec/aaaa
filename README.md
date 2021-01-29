# webpack的基础学习
## 2初探
### 2.1 基础简介
#### 面向过程编程：原生JS逐一插入DOM

缺点：
1. 引入js文件，有先后顺序的限制，index.js只能最后引入
2. 在index.html中，引入了过多的js文件，导致性能较差

解决：

模块化编程

#### webpack的概念

使用ES6模块化解决，并用webpack处理ES6模块
1. 安装webpack（4.0），安装webpack-cli（3.0）
2. 编译index.js ： npx webpack index.js
3. 浏览器中打开index.html

### 2.2 模块打包工具
webpack核心定义：是一个模块打包工具，可以把多个模块打包到一起，生成一个最终的js。
注意：webpack并不能识别ES其他高级语法。

最开始webpack只是JS打包工具，现在webpack也可打包css，png，jpg等很多模块。

[webpack官网对模块化的介绍](https://webpack.js.org/concepts/modules/)

### 2.3 webpack安装

npm init 形成的 package.json
```$xslt
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,   私人项目，不会上传到npm。不必暴露main.js
  "scripts": {},
  "author": "lanziwen",
  "license": "ISC"
}
```
两种安装方式：
- 全局安装webpack
    - 无法进行多版本webpack项目的兼容开发
- 项目内安装webpack
    - 安装好之后webpack的依赖，会在node_moudles中
    - node提供的命令npx：通过npx运行node_moudles中的webpack

### 2.4 使用webpack配置文件
webpack需要通过配置文件，进行辅助打包。根据工程需求，配置webpack配置文件。
- 打包文件
    
    默认配置文件名称：webpack.dev.js
    
    打包命令：npx webpack
    
    按照自定义的配置文件打包：npx webpack --config 自定义配置文件.js

    ```asp
    const path = require('path')
    module.exports = {
        entry:'./index.js',
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'mybundle')
        }
    }
    ```

- webpack.config.js简单配置
    - index.js放入src目录
    - index.html放入打包后的文件夹
    ```asp
    const path = require('path');
    
    module.exports = {
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'mybundle')
        }
    };
    ```

- 三种运行webpack的方式：
    - webpack index.js全局安装下
    - npx webpack index.js通过命令打包
    - npm run bundle通过配置package.json文件进行打包 

- webpack-cli的作用：可以在命令行里面运行webpack命令。

## 3 核心概念
### 3.1 loader简介
loader为webpack提供了打包方案。
- webpack原生不支持打包非js后缀的文件；txt，png等文件需要打包，所以引入了loader。

- file-loader的打包过程：
     - 把要打包的文件，打包到dist目录下
     - 把文件地址返回给require()的变量

```asp
module: {
    rules: [{
        test:/\.jpg/,
        use:{
            loader: 'file-loader'
        }
    }]
}
```
     
- vue-loader：可以让webpack识别.vue结尾的文件，进行打包。
### 3.2 loader打包静态资源（图片）
[file-loader的placeholder](https://v4.webpack.js.org/loaders/file-loader/#placeholders)

url-loader：这样配置，所有的图片都会被打包成base64的形式，存入bundle.js文件
 - 缺点：当图片很大，js加载很慢，出现白屏
```asp
module: {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        use:{
            loader: 'url-loader',
            options:{
                //placeholder,文件名，hash，文件的扩展名
                name:'[name]_[hash].[ext]' 
            }
        }
    }]
}
```
- 优化：
```asp
module: {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        use:{
            loader: 'url-loader', //对图片类型文件打包
            options:{
                name:'[name]_[hash].[ext]', 
                outputPath: 'images/',  //打包到的文件夹名称和路径
                limit: 20480 //小于20k文件，按照url-loader进行打包，大于20k的图片，使用file-loader打包，所以也要npm i file-loader
            }
        }
    }]
}
```
### 3.3 loader打包静态资源（style css scss 在postcss）
- use打包两个静态资源，需要是数组的形式
```asp
{
    test:/\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader'  //从右向左
    ]
}
```
- sass-loader 识别sass语法，node-sass 如果要使用sass-loader要安装这俩包
- postcss-loader 适配各个浏览器的前缀，需要额外配置postcss.config.js
- autoprefixer 在postcss.config.js引入，简化配置
### 3.4 loader打包静态资源（css-loader配置，字体打包）

1. 样式分模块打包

- 注意：要兼顾css-loader打包顺序
```asp
{
    test:/\.scss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                moudles:true,  // css分模块打包
                importLoaders:2 // 规定css-loder前面，要运行几个loader
            }
        },
        'sass-loader',
        'postcss-loader'
    ]
}
```

2. 对字体文件进行打包(使用file-loader，以iconfont举例)

```asp
{
    test: /\.(eot|ttf|svg)$/,
    use:{
        loader: 'file-loader'
    }
}
```
### 3.5 plugins: clean-webpack-plugin html-webpack-plugin

1. clean-webpack-plugin（非官方推荐）

    - [clean-webpack-plugin](https://www.cnblogs.com/xiaozhumaopao/p/10792168.html)

    - 为生产环境编译文件的时候，先把 build或dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的
    
2. html-webpack-plugin

- 会在打包结束后，生成一个html文件，并把打包生成的js文件引入其中

```asp
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'  // 要打包的html文件
    }),
    new CleanWebpackPlugin(['dist']) // 打包到的文件夹
],
output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
}
```
### 3.6 Entry 与 Output 的基础配置

- 打包生成多个js文件，需要在entry和output中进行配置

```asp
entry: {
    main: './src/index.js',
    main2: './src/index.js'
},
output: {
    // publicPath可以额外配置cdn，这样打包后的js文件，前缀就会加上cdn地址 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
}
```
### 3.7 SourceMap 的配置 
本质上是一种映射关系，把打包前后的js进行映射。打包代码出错的时候，这样可以辅助在控制台，迅速定位错误。
1. 带source-map，打包后会生成map.js文件
2. 带inline，打包后的map.js文件，会被base64合并到目标文件
3. 带cheap，只提示多少行，不提示多少列出错；只对业务代码进行错误提示，打包过程中的错误，不做处理。
4. 带module，除了业务代码外，打包过程中loader出错也会进行提示和处理。
5. 带eval，通过eval方式，把对应的业务代码和source-map一起执行，速度快

- inline-source-map
    - 精确到具体某个位置出错了
    - 生成的map.js文件，以base64的形式，放在了打包后main.js的底部
- cheap-inline-source-map
    - 只需要告诉哪一行出错了，打包的性能得到了提高
- eval
    - 打包快，但是提示出来的错误不准确

mode:development线下开发devtool配置：
```asp
devtool：'cheap-module-eval-source-map'
```
mode:production线上环境devtool配置：
```asp
devtool：'cheap-module-source-map'
```

注意问题：source-map原理，查阅文档自己理解
### 3.8 WebpackDevServer
预期实现功能：改动src中源代码，dist自动打包

1.方法一：package.json添加--watch
```asp
  "scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "server": "node server.js"
  }
```

2.方法二：WebpackDevServer
 - 不但能监听文件的改变，还能自动刷新浏览器
 - WebpackDevServer还可以开启一个本地服务器，用于发起http请求（直接打开index.html使用的是ftp协议，无法向服务器发送请求）
```asp
  "scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server"
  }
```
- 注意：webpack dev server把编译的内容放在内存(提高打包速度)，而contentBase会作为硬盘上的文件的搜索路径，webpack dev server会首先去contentBase上搜索文件，没有再到内存查找
```asp
devServer:{
  contentBase:'./dist', //服务器根路径
    open:true   //加载完成直接打开浏览器
}
```
- WebpackDevServer，例如port，proxy等

3.方法三：node，express，webpackDevMiddleware手写一个server
```asp
 "scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "middleware": "node server.js"
  },
```

向导：
[Development]('https://v4.webpack.js.org/guides/development/#using-source-maps')

配置：
[Devtool]('https://v4.webpack.js.org/configuration/devtool/')
、[DevServer]('https://v4.webpack.js.org/configuration/dev-server/')

### 3.9 Hot Module Replacement 热模块更新HMR
目标：
1. 改动的HTML中数据生效，也不重新刷新
2. 改动css样式，也不重新刷新
3. 改动不同模块的代码，相互不影响
- 如果项目中css文件做了修改，不会重新加载页面，只对css进行改动，方便调试
```asp
devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true  //false：改动的HTML失效，重新刷新页面； true：不做处理；
}
```

```asp
const webpack = require('webpack');
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }), 
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()  //wp自带的插件，先引入wp，就可以使用了
]
```
### 3.10 Babel
1.babel和wp的结合
- [babel和wp的结合]('https://www.babeljs.cn/setup#installation')

2.介绍
- babel-loader是把babel和wp关联起来的
- @babel/preset-env 是把ES6转成ES5的（语法转换）
- @babel/polyfill函数和变量在低版本浏览器的补充

```asp
{
    test:/\.js$/,
    exclude:/node_modules/,
    loader:"babel-loader",
    options:{
        presets: [["@babel/preset-env",{
            useBuiltIns:"usage"   //ES6语法转换的懒加载，不会一次把ES6所有转换规则都加载到浏览器，而是按需加载
        }]]
    }
}
```
 Chrome67版本以上的不进行babel处理
```asp
options:{
    presets: [["@babel/preset-env",{
        targets:{chrome:"67",edge:"17"},
        useBuiltIns:"usage"
    }]]
}
```
3.在写库代码的时候需要配置
- polyfill污染全局环境
- 以闭包方式引入，不污染全局环境

## 4 高级概念
### 4.1Tree Shaking 概念

解决的问题:一个模块有很多内容，只打包引入的内容，不打包其他内容

- 只支持ES Module引入，不支持CommonJS底层是静态引入

配置：

1.wp.cfg.js配置
```asp
optimization: {
    usedExports: true
}
```
2.pk.json配置[sideEffects]('https://www.cnblogs.com/wzcsqaws/p/11571945.html')（不需要tree shaking的情况）

### 4.2Develoment 和 Production 模式的区分打包

目的：解决开发和线上环境配置修改不方便问题

生产环境：打包好文件，上传到服务器就可以了

- 在pk.json文件中对两种环境进行不同的配置
- 共有的文件可以放在webpack.common.js

安装第三方模块，对common.js和另外两个文件合成

有些框架，会把三个文件放在在build文件夹下，要对应修改pk.json命令
```asp
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.dev.js",
    "build": "webpack --config ./webpack.prod.js"
  },
```

- 附：端口占用解决
    - Error: listen EADDRINUSE 127.0.0.1:8080（8080端口被占用）

### 4.3Webpack 和 Code Splitting

目的：打包后的dist文件夹不在bundle中

配置：
```asp
new CleanWebpackPlugin(['dist'],{        //删除lesson中的dist 
    root:path.resolve(__dirname,'../')  //修改路径
})
```
```asp
output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
}
```

注意：遇到打包问题解决方法
1. 控制台找到问题
2. 问题搜索和提问
3. 文档配置说明，修改对应的配置文件

Code Splitting要解决的问题：
1. 业务逻辑会进行改变，每次打包时间很长
2. 浏览器运行程序，首先会下载第三方库，还会下载相关的业务代码，加载会很慢

解决：
- 自己配置lesson2
    - 用户同时加载两个文件，速度可能更快一些
```asp
entry: {
    lodash: './src/lodash.js',  //这里要把lodash放在前面
    main: './src/index.js'
},
```
- wp自带实现
法一：同步配置——wp自带配置项进行配置lesson3
```asp
    optimization: {
        splitChunks:{
            chunks:'all'
        }
    }
```
法二：异步配置——异步加载进行配置lesson4
1. 配置babelrc
2. pk.json安装 npm babel-plugin-dynamic-import-webpack --save-dev
```asp
{
  presets: [
    [
      "@babel/preset-env", {
      targets: {
        chrome: "67",
      },
      useBuiltIns: 'usage'
    }
    ],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"]
}
```


### 4.4SplitChunksPlugin 配置参数

- 异步
    - @babel/plugin-syntax-dynamic-import

### 4.5LazyLoading-Chunk
- 懒加载：
     - 通过封装import写成的懒加载函数，使click时才执行

- 代码分割
 ```asp
optimization: {
    splitChunks: {
     chunks: 'all'
    }
},
```

[代码分割介绍]('https://blog.csdn.net/yunchong_zhao/article/details/108217759')

### 4.6 打包分析
- [打包分析]('https://github.com/webpack/analyse')

```asp
添加打包描述文件：webpack --profile --json > stats.json
打包后会生成一个json描述文件

"scripts": {
    "dev-build": "webpack --config  webpack --profile --json > stats.json ./build/webpack.dev.js",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
 }

```

    - 一个可以分析打包的插件    webpack-bundle-analyzer
    
 - 代码使用率
    - [Chrome性能分析工具Coverage使用方法]('https://www.cnblogs.com/zhaoweikai/p/9664482.html')
    - [ webpackPrefetch和webpackPreload]('https://v4.webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules')
        - 代码覆盖率角度做前端性能优化
        - webpackPrefetch：业务代码加载完成之后，进行懒加载
        - webpackPreload：和业务代码同步加载

### 4.7 css代码分割

- mini-css-extract-plugin
     - 不支持热更新，一般生产环境使用

- optimize-css-assets-webpack-plugin
    - css代码压缩

### 4.8　浏览器缓存
在出口文件做更新
```asp
output: {
		filename: '[name].[contenthash].js',    打包文件有更新，只在客户浏览器重新下载变更文件。
		chunkFilename: '[name].[contenthash].js'
	}
```
新版本wp4可以在optimization中配置runtimeChunk，生成runtime.js文件关联各个库和业务代码（处理库和业务的关系）

### 4.9 Shimming
common.js配置ProvidePlugin
```asp
const webpack = require('webpack');
plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',   //目录中含有$就引入jq库
        _join: ['lodash', 'join']
    }),
],
```

```asp
rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}, {
				loader: 'imports-loader?this=>window'   //模块自己的this指向window
			}]
		}]
```

### 4.10-环境变量
根据不同环境进行打包的另一种方法
```asp
common.js
// 全局变量ENV来决定配置文件
module.exports = (env)=>{
    if (env && env.production){
        // 如果是生产环境
        return merge(commonConfig,prodConfig)
    }else {
        // 如果是开发环境
        return merge(commonConfig,devConfig)
    }
}
```
```asp
  "scripts": {
    "dev-build": "webpack --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",   //不用传全局变量
    "build": "webpack --env.production --config ./build/webpack.common.js"  //传递全局变量env.production
  },
```

# webpack实战
###　5-1打包库
对于自定义的库进行打包，给外部使用
 - 不同规范、不同方式去引入
 - wp配置
 
依赖库
  - lodash，配置externals
 
上传到npm
 
### 5-4wpdevserver实现请求转发
--> Config - devSServer.Proxy配置
 - 开发环境的前缀配置处理
 ```
proxy: {  //是基于http-proxy-middleware的
    '/react/api': {     // 请求代理
        target: 'http://www.dell-lee.com',  
        secure: false,   // 实现对https网址请求转发
        pathRewrite: {   //路径重写
            // 'header.json': 'demo.json'    //请求header.json的时候，改成请求demo.json
        },
        // bypass 做请求拦截
        changeOrigin: true, // 处理请求的服务器origin问题
        headers: {  // 变更请求头
            host: 'www.dell-lee.com',
            cookie:'content' //可以模拟cookie
        }
    }
}
 ```

注意：
- 如果相对根路径进行请求转发，需要在devServer下面配置index:''
- 代理失效（服务器对Origin进行了限制）：proxy中配置changeOrigin:true

### 5-5解决单页面路由问题

- 安装router插件，配置devServer
 ```
devServer: {
   historyApiFallback:true   //可以配置布尔类型值，也可以配置规则
  
}
 ```
true等价于访问任何路径都转到index.html，转换为对根路径的请求，一般不修改此项
 ```
 historyApiFallback: {
    rewrites: [
        {
            from:/\.*\/,   // 访问abc.html的时候，转为访问index.html
            to:'/index.html'
        }
    ]
},

 ```

### 5-6eslint在wp的配置(这里不学习，移步eslint专门学习)
1.是代码约束工具

2.怎么去做
  - 安装eslint
  - 初始化
    ```
    npx eslint --init
    ```
    
3.使用方式
 - 安装eslint
 - 安装eslint-loader
 - 配置devServer里面的overlay
 - 配置eslint-loader

### 5-8性能优化
1.跟进技术迭代：Node Npm Yarn
    - 在项目中使用比较新的版本
    
2.尽可能少的模块上使用loader
     - 具体情况具体分析

3.plugin尽可能精简，并确保可靠

4.resolve参数合理配置
    - extensions是从左到右匹配的，更多用来配置逻辑性文件（css js等），不用来配置资源类文件（img等）
    - mainFiles默认寻找文件次序
    - alias路径别名配置，不要配置过多的扩展名

5.DllPlugin提高webpack打包速度
    - 实现第三方模块只打包一次
        - 第三方模块打包一次
        - 引入三方模块要使用dll文件引入
    
6.控制包大小
    - splitChunksPlugin等
    
7.thread-loader,parallel-webpack,happy-webpack打包

8.合理使用sourceMap

9.结合stats分析打包结果

10.开打环境内存编译
    - 开发中编译生成的文件放在内存中
    
11.开发环境中，无用插件剔除
    
    
### 5-11多页面应用打包


























