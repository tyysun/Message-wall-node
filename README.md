# note-express
## 接口
1.获取所有的note: GET:  /api/notes   req: {}  res: {stauts: 0, data: [{note1},{note2},{note3}]}     {status: 1, errMsg: '失败的原因'}
2.创建一个note: POST:  /api/notes/add   req: {note: 'hello tyy'}   res: {status :0}   {status: 1, errMsg: '失败的原因'}
3.修改一个note: POST:  /api/notes/edit    req: {note: 'new note', id: 101}
4.删除一个note: post:  /api/notes/delete   req: {id: 101}