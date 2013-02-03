if (Meteor.isClient) {
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.hello.code = function () {
    var obj = PythonCode.findOne({game : 0});
    if (!obj) {
      return ''
    }
    return obj['code'].replace('\t', '  ');
  };

  Template.hello.rendered = function() {
    var self = this;
    if (! self.handle) {
      self.handle = Meteor.autorun(function() {
        $('#player').keydown(function(e) {
          var keyCode = e.which;

          if (keyCode == 9 || keyCode == 13) { 
            e.preventDefault();
          }
        });
        $('#player').keyup(function(e) { 
          var keyCode = e.which;
          if (keyCode == 9) {
            this.value = '\t'
          }
          else if (keyCode == 13) {
            this.value = '\n'
          }
          var obj = PythonCode.findOne({game : 0});
          var id = Meteor.user()._id;
          if (obj && obj['last_wrote'] != id) {
            var newStr = obj['code'] + this.value.charAt(0);
            PythonCode.update({game : 0}, {game : 0, code : newStr, last_wrote: id});
          }
          this.value='';
        });
      });
    }
  }
}

