module('History ====');
test('save', function(){
  var tmpSave = sessionStorage.messages;
  
  throws(
    function() { imchat.history.save(); }, "without params"
  );
  
  throws(
    function() { imchat.history.save(123); }, "number"
  );
  
  throws(
    function() { imchat.history.save({some:123, an: 'asd'}); }, "incorrect obj"
  );
  
  throws(
    function() {
      imchat.history.save({message: 12, author: 'some', time: 123});
    }, "error in message object"
  );
  
  var obj = {message: 'some', author: 'some', time: 123};
  
  // mock ...
  
  sessionStorage.removeItem('messages');
  imchat.history.save(obj);
  strictEqual(sessionStorage.getItem('messages'), JSON.stringify([obj]),
            'one correct object');
  
  sessionStorage.removeItem('messages');
  imchat.history.save(obj);
  imchat.history.save(obj);
  strictEqual(sessionStorage.getItem('messages'), JSON.stringify([obj, obj]),
            'two correct object');
  
  sessionStorage.messages = tmpSave;
});

test('load', function(){
  var tmpSaveBag = sessionStorage.messages;
  
  sessionStorage.removeItem('messages');
  deepEqual(imchat.history.load(), [], 'no messages');
  
  sessionStorage.messages = 'asdad';
  deepEqual(imchat.history.load(), [], 'incorrect value in messages');
  
  sessionStorage.messages = JSON.stringify([1, 2]);
  deepEqual(imchat.history.load(), [1, 2], 'some messages');
  
  sessionStorage.messages = tmpSaveBag
});