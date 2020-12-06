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
