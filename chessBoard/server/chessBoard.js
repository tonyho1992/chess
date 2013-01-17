Games = new Meteor.Collection("games");

if (Meteor.isServer) {
  Meteor.startup(function () {
    Games.remove({});
    Games.insert({id:0, game: chess.fen()})
  });
}
