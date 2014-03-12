module('Client ====');
var addChat = function() {
  var chat = document.createElement('div');
      chat.id = imchat.constants.CHAT_ID;
      
  document.body.appendChild(chat);
  
  return chat;
};

var removeChat = function() {
  var chat = document.getElementById[imchat.constants.CHAT_ID];
  if (chat) {
    chat.remove();
  }
};

test('constructor', function(){
  var client = new Client();
  
  strictEqual(client.chatBlock, null, 'default block elem');
  strictEqual(client.ownNicks, null, 'default own nicks');
  //strictEqual(client.otherNicks, null, 'default other nicks');
  strictEqual(client.allNicks, null, 'default all nicks');
});

test('init', function(){
  removeChat();
  
  throws(
    function() { imchat.client.init(); }, "block not exist"
  );
  
  // // mock for other
  // var chat = addChat();
  // imchat.client.init();
  // deepEqual(imchat.client.chatBlock, chat, 'chat block');
  
  // removeChat();
});

test('send', function(){
  throws(
    function() { imchat.client.send(); }, "without params"
  );
  
  throws(
    function() { imchat.client.send(123); }, "number"
  );
  
  throws(
    function() { imchat.client.send({some:123, an: 'asd'}); }, "incorrect obj"
  );
  
  throws(
    function() {
      imchat.client.send({message: 12, author: 'some', time: 123});
    }, "error in message object"
  );
  
  // hmm need testing getting message
});

test('proccessng incomming message', function(){
  throws(
    function() { imchat.client._incomingMessage(); }, "without params"
  );
  
  throws(
    function() { imchat.client._incomingMessage(123); }, "number"
  );
  
  throws(
    function() { imchat.client._incomingMessage({}); }, "incorrect obj"
  );
  
  throws(
    function() {
      imchat.client._incomingMessage((new MessageEvent('some')));
    }, "incorrect Message Event"
  );
  
  // incorrect create MessageEvent by this way
  var msgEvent = new MessageEvent('message');
  throws(
    function() { imchat.client._incomingMessage(msgEvent); }, "empty event"
  );
  
  // need correct MessageEvent and mock after
});

test('parse message', function(){
  throws(
    function() { imchat.client._parseMessage(); }, "without params"
  );
  
  throws(
    function() { imchat.client._parseMessage(123); }, "number"
  );
  
  throws(
    function() {
      imchat.client._parseMessage({some:123, an: 'asd'});
    }, "incorrect obj"
  );
  
  throws(
    function() {
      imchat.client._parseMessage({message: 12, author: 'some', time: 123});
    }, "error in message object"
  );
  
  // need mock
});

test('highlight names', function(){
  throws(
    function() { imchat.client._highLightNames(); }, "without params"
  );
  
  throws(
    function() { imchat.client._highLightNames(123); }, "number"
  );
  
  throws(
    function() { imchat.client._highLightNames({}); }, "object"
  );
  
  strictEqual(imchat.client._highLightNames('   '), '   ', 'spaces string');
  strictEqual(imchat.client._highLightNames('some message'),
              'some message', 'some string');
              
  
  var tmpUsers = imchat.client.allNicks;
  var msg = 'some nam ok nam ';
  
  imchat.client.allNicks = null;
  strictEqual(imchat.client._highLightNames(msg), msg, 'string, no names');
  
  imchat.client.allNicks = [];
  strictEqual(imchat.client._highLightNames(msg), msg, 'string, no names');
  
  imchat.client.allNicks = ['nam'];
  var updMsg = 'some <span class="' + imchat.constants.USER_IN_TEXT_CLASS +
               '">nam</span> ok <span class="' +
               imchat.constants.USER_IN_TEXT_CLASS + '">nam</span> ';
  strictEqual(imchat.client._highLightNames(msg), updMsg,
              'string, 2 similar names');
  
  imchat.client.allNicks = ['nam', 'ok'];
  updMsg = 'some <span class="' + imchat.constants.USER_IN_TEXT_CLASS +
               '">nam</span> <span class="' +
               imchat.constants.USER_IN_TEXT_CLASS + '">ok</span> ' +
               '<span class="' + imchat.constants.USER_IN_TEXT_CLASS +
               '">nam</span> ';
  strictEqual(imchat.client._highLightNames(msg), updMsg,
              'string, different names');
  
  imchat.client.allNicks = tmpUsers;
});

test('smiles', function(){
  throws(
    function() { imchat.client._addSmiles(); }, "without params"
  );
  
  throws(
    function() { imchat.client._addSmiles(123); }, "number"
  );
  
  throws(
    function() { imchat.client._addSmiles({}); }, "object"
  );
  
  strictEqual(imchat.client._addSmiles('   '), '   ', 'spaces string');
  strictEqual(imchat.client._addSmiles('some message'),
              'some message', 'some string');
              
  
  var msg = 'some nam ok ';
  strictEqual(imchat.client._addSmiles(msg), msg, 'string, no smiles');
  
  msg = 'some nam ok ' + imchat.constants.SMILES[1].symbol + ' ';
  var updMsg = 'some nam ok <span class="' +
               imchat.constants.SMILES[1].className + '"></span> ';
  strictEqual(imchat.client._addSmiles(msg), updMsg,
              'string, one smile');
  
  msg = 'some nam ok ' + imchat.constants.SMILES[0].symbol + ' ' + 
        imchat.constants.SMILES[2].symbol;
  updMsg = 'some nam ok <span class="' + imchat.constants.SMILES[0].className  +
           '"></span> <span class="' + imchat.constants.SMILES[2].className  +
           '"></span>';
  strictEqual(imchat.client._addSmiles(msg), updMsg,
              'string, two smiles');
              
  msg = 'some nam ok ' + imchat.constants.SMILES[1].symbol +
        imchat.constants.SMILES[2].symbol;
  updMsg = 'some nam ok <span class="' +
               imchat.constants.SMILES[1].className + '"></span>' +
               '<span class="' +
               imchat.constants.SMILES[2].className + '"></span>';
  strictEqual(imchat.client._addSmiles(msg), updMsg,
              'string, one smile');
});