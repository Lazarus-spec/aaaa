

function getComponent() {
    // 异步加载lodash文件
    // ({default:_}) 考虑commonJS做的兼容
    return import(/*webpackChunkName:"lodash"*/'lodash').then(({default: _ })=>{
        var ele = document.createElement('div');
        ele.innerHTML = _.join(['q','dd','d'],'***');
        return ele;
    })
}

// 返回的import是promise
getComponent().then(ele=>{
    document.body.appendChild(ele);
});



//上述代码，打包的时候可能因为语法问题报错，所以需要安装插件@babel/plugin-syntax-dynamic-import ，并配置babelrc进行转译



// import _ from 'lodash'
//
// var ele = document.createElement('div');
// ele.innerHTML = _.join(['q','dd','d'],'***');
// document.body.appendChild(ele);





