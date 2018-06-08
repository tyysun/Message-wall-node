var Sequelize = require('sequelize');
var path = require('path')
var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname,'../database/database.sqlite')
});

var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
  
});

// Note.drop();
//Note.sync({force: true})   //重置数据库


/* 用于判断是否连接数据库 运行 node note.js
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  */

/* 数据库的操作
Note.sync().then(function(){
  Note.create({text: 'hello tyy'});
}).then(function(){
  Note.findAll({raw: true}).then(function(notes){
    console.log(notes)
})})

Note.findAll({raw: true,where:{id:2}}).then(function(notes){
  console.log(notes)
})
*/
module.exports.Note = Note;