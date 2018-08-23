# 墨痕留言墙

一个在线留言墙
![](https://upload-images.jianshu.io/upload_images/3429455-918f418e5f18dcd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 安装方法
```
git bash

# 克隆仓库
git clone 

# cd 到仓库目录后安装依赖
npm i

# 启动本地服务器，打开 http://localhost:3000
node ./bin/www

```

## 涉及的知识点
- Less 样式预处理器来写css  
- webpack（自动化构建工具，实现LESS,CSS,JS编译和压缩代码）  
- express (基于 Node.js 平台的 web 开发框架)  
- html  
- css  
- Node.js  
- jQuery  
- sequelize(Node的ORM框架Sequelize操作数据库)  
- passport(实现第三方登录)  


## 具体功能
- 留言模块的增加，删除，改动
- 留言模块的瀑布流布局
- 留言模块的拖动
- 第三方GitHub的验证登录

# 路由约定
```
/* GET users listing. */


 1.获取所有的note: GET:  /api/notes   req: {}  res: {stauts: 0, data: [{note1},{note2},{note3}]}     {status: 1, errMsg: '失败的原因'}
 2.创建一个note: POST:  /api/note/add   req: {note: 'hello tyy'}   res: {status :0}   {status: 1, errMsg: '失败的原因'}
 3.修改一个note: POST:  /api/note/edit    req: {note: 'new note', id: 101}
 4.删除一个note: post:  /api/note/delete   req: {id: 101}
```
