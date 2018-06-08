require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');

function Note(opts){
  this.initOpts(opts);
  this.createNote();
  this.setStyle();
  this.bindEvent();
}
Note.prototype = {
  colors: [
    ['#f9ed69','#f08a5d'], // headColor, containerColor
    ['#08d9d6','#fce38a'],
    ['#eaffd0','#95e1d3'],
    ['#ff2e63','#15b7b9'],
    ['#a8d8ea','#aa96da'],
    ['#364f6b','#3fc1c9'],
    ['#00b8a9','#f8f3d4'],
    ['#48466d','#3d84a8'],
    ['#6fe7dd','#3490de']
  ],


  

  defaultOpts: {
    id: '',   //Note的 id
    $ct: $('#content').length>0?$('#content'):$('body'),  //默认存放 Note 的容器
    context: 'input here' ,//Note 的内容
    
  },

  initOpts: function (opts) {
    this.opts = $.extend({}, this.defaultOpts, opts||{});
    if(this.opts.id){
       this.id = this.opts.id;
    }
    
  },

  createNote: function () {
    var tpl =
    '<div class="note">'
      + '<div class="note1"></div>'
      + '<div class="note2"></div>'
      + '<div class="note-head">'
        + '<svg class="icon" aria-hidden="true">'
            + '<use xlink:href="#icon-fix"></use>'
        + '</svg><span class="delete">&times;</span>'
      + '</div>'
      + '<div class="note-ct" contenteditable="true"></div>'
    + '</div>';
    this.$note = $(tpl);
    this.$note.find('.note-ct').html(this.opts.context);
    
    this.opts.$ct.append(this.$note);
    
    Event.fire('waterfall');
  },

  setStyle: function () {
    var color = this.colors[Math.floor(Math.random()*9)];
    this.$note.find('.note-head').css('background-color', color[0]);
    this.$note.find('.note-ct').css('background-color', color[1]);
    this.$note.find('.note1').css('background-color', color[1]);
    this.$note.find('.note2').css('background-color', color[1]);
    
    
  },

  setLayout: function(){
    var self = this;
    if(self.clk){
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function(){
      Event.fire('waterfall');
    },100);
  },

  bindEvent: function () {
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete');

    $delete.on('click', function(){
      self.delete();
    })

    //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
    $noteCt.on('focus', function() {
      if($noteCt.html()=='input here') $noteCt.html('');
      $noteCt.data('before', $noteCt.html());
    }).on('blur paste', function() {
      if( $noteCt.data('before') != $noteCt.html() ) {
        $noteCt.data('before',$noteCt.html());
        self.setLayout();
        if(self.id){
          self.edit($noteCt.html())
        }else{
          self.add($noteCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
    });
  },

  edit: function (msg) {
    var self = this;
    $.post('/api/notes/edit',{
        id: this.id,
        note: msg
      }).done(function(ret){
      if(ret.status === 0){
        Toast('update success');
      }else{
        Toast(ret.errorMsg);
      }
    })
  },

  add: function (msg){
    console.log('addd...');
    var self = this;
    $.post('/api/notes/add', {note: msg})
      .done(function(ret){
        if(ret.status === 0){
          Toast('add success');
        }else{
          self.$note.remove();
          Event.fire('waterfall')
          Toast(ret.errorMsg);
        }
      });
    //todo
  },

  delete: function(){
    var self = this;
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('delete success');
          self.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg);
        }
    });

  }

};

module.exports.Note = Note;