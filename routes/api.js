var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/* GET users listing. */


// 1.获取所有的note: GET:  /api/notes   req: {}  res: {stauts: 0, data: [{note1},{note2},{note3}]}     {status: 1, errMsg: '失败的原因'}
// 2.创建一个note: POST:  /api/note/add   req: {note: 'hello tyy'}   res: {status :0}   {status: 1, errMsg: '失败的原因'}
// 3.修改一个note: POST:  /api/note/edit    req: {note: 'new note', id: 101}
// 4.删除一个note: post:  /api/note/delete   req: {id: 101}
router.get('/notes', function(req, res, next) {
  var query = {raw: true}
  if(req.session.user){
    query.where = {
      uid : req.session.user.id
    }
  }
  Note.findAll(query).then(function(notes){
    
      res.send({status: 0,data:notes})
  })
});

router.post('/notes/add', function(req, res, next){
  if(!req.session.user){
    return res.send({atatus:1, errorMsg: '请先登录'})
  }

  var uid = req.session.user.id
  

  var note = req.body.note;
  Note.create({
    uid: uid,
    
    text: note
  }).then(function(){
    res.send({status: 0})
  }).catch(function(){
    res.send({status: 1,errorMsg:'数据库出错'
    })
  })
})

router.post('/notes/edit', function(req, res, next){
  if(!req.session.user){
    return res.send({atatus:1, errorMsg: '请先登录'})
  }
  Note.update({text: req.body.note},{where:{id:req.body.id}}).then(function(){
    res.send({status: 0})
  })
})

router.post('/notes/delete', function(req, res, next){
  if(!req.session.user){
    return res.send({atatus:1, errorMsg: '请先登录'})
  }
  Note.destroy({where:{id:req.body.id}}).then(function(){
    res.send({status: 0})
  })
})

module.exports = router;
