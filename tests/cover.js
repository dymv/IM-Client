module('Cover ====');
var addFrames = function() {
  var frag = document.createDocumentFragment();
  for (var i = 0; i < 3; i++) {
    frag.appendChild(document.createElement('iframe'));
  }
      
  document.body.appendChild(frag);
};

var removeFrame = function() {
  var frames = document.getElementsByTagName('iframe');
  if (frames.length > 0) {
    var len = frames.length;
    while(--len >= 0) {
      frames[len].remove();
    }
  }
};

test('constructor', function(){
  var cover = new Cover();
  
  deepEqual(cover.users, [], 'default users');
});

test('init', function(){
  removeFrame();
  
  throws(
    function() { imchat.cover.init(); }, "no frames"
  );
  
  //need mock 
});

test('proccessng incomming message', function(){
  throws(
    function() { imchat.cover._incomingMessage(); }, "without params"
  );
  
  throws(
    function() { imchat.cover._incomingMessage(123); }, "number"
  );
  
  throws(
    function() { imchat.cover._incomingMessage({}); }, "incorrect obj"
  );
  
  throws(
    function() {
      imchat.cover._incomingMessage((new MessageEvent('some')));
    }, "incorrect Message Event"
  );
  
  // incorrect create MessageEvent by this way
  var msgEvent = new MessageEvent('message');
  throws(
    function() { imchat.cover._incomingMessage(msgEvent); }, "empty event"
  );
  
  // need correct MessageEvent and mock after
});

test('add own nick', function(){
  throws(
    function() { imchat.cover._addNick(); }, "without params"
  );
  
  throws(
    function() { imchat.cover._addNick(123); }, "number"
  );
  
  throws(
    function() { imchat.cover._addNick({}); }, "object"
  );
  
  var tmpUsers = imchat.cover.users;
  
  imchat.cover.users = null;
  imchat.cover._addNick('own');
  deepEqual(imchat.cover.users, ['own'], 'own null');
  
  imchat.cover.users = [];
  imchat.cover._addNick('own');
  deepEqual(imchat.cover.users, ['own'], 'own empty array');
  
  imchat.cover.users = ['am'];
  imchat.cover._addNick('own');
  deepEqual(imchat.cover.users, ['am','own'], 'own have items');
              
  imchat.cover.users = ['am','own'];
  imchat.cover._addNick('own');
  deepEqual(imchat.cover.users, ['am','own'], 'own already have user');
  
  imchat.cover.users = tmpUsers;
});