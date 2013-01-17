Games = new Meteor.Collection("games");

(function($) {
  $.fn.outerHTML = function() {
    return $(this).clone().wrap('<div></div>').parent().html();
  }
})(jQuery);

Template.game_item.rendered = function() {
  var self = this;
  if (! self.handle) {
    self.handle = Meteor.autorun(function() {
      var q = Games.find({id : 0});
      q.forEach(function(g) {
        chess.load(g['game']);
      });
      chess.render();
    });
  }
}

Template.chess.games = function() {
  return Games.find({});
}

Template.hello.greeting = function () {
  return "Welcome to chessBoard.";
};

Template.hello.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});
