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
