import counter from './counter'
import number from './number'

counter();
number();

// 如果当前项目开启了HMR
if(module.hot) {
    // 如果number文件发生了变化，执行后面的函数
    module.hot.accept('./number', () => {
        // 获取原来的number，删除，之后新增执行的number()
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}

