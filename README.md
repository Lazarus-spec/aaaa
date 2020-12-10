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
    
    默认配置文件名称：webpack.config.js
    
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
- 注意：webpack dev server把编译的内容放在内存，而contentBase会作为硬盘上的文件的搜索路径，webpack dev server会首先去contentBase上搜索文件，没有再到内存查找
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
