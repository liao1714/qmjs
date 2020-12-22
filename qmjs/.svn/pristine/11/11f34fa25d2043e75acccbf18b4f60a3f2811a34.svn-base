### 推荐安装yarn
1. 确保 node 版本是 8.10 或以上
2. npm i yarn -g

### 快速开始
进入目录安装依赖
> yarn install

启动服务
> yarn start

编译
> yarn build

### 开发规范
1. 目录结构规范。pages里面的目录结构要尽量与页面的层级对应。
2. View和Model规范。View只负责页面的展示逻辑，尽量不要处理业务逻辑，Model应该尽可能的把业务逻辑都处理完了再设置进去。
3. components规范。component应该尽量避免`<Comp test='123'/>`这种方式的传值，而是应该在component内部把相关的变量connect进来，在内部实现相应的方法。组件在被复用时应该尽量干净，理想情况下组件复用只要这样就行了`<Comp />`不需要传太多参数。
4. API规范。前后端开发人员要先约定好API的结构，后端设计好表结构后，基本就要确定要接口。前端人员根据接口的格式自行mock数据。
5. 样式规范。className尽量用驼峰命名法，不要既有驼峰又有下划线。示例代码中的className是反面教材。
6. 路径规范。引用组件路径的时候，不要出现`../../components/aa/bb`，只要`components/aa/bb`即可。同理css里面的url也是一样的道理`assets/xx.png`即可。
7. 命名规范。现在service和effect的命名会经常重名，因此effect统一按照业务方式命名如initDataList，service统一按照接口方法命名如getDataList。
8. 其他规范持续完善中...

### 参考资料
1. [《React从入门到精通》](https://note.youdao.com/ynoteshare1/index.html?id=7404f928f955e73309447f9524e5c33c&type=note)
2. [umi + dva + ant-design-mobile快速搭建H5项目](https://www.jianshu.com/p/59099cb3e28d)
