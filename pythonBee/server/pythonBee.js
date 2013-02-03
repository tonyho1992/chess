if (Meteor.isServer) {
  Meteor.startup(function () {
    PythonCode.remove({});
    PythonCode.insert({game : 0, code : '', last_wrote: ""});
  });
}