module('Utils ====');
test('is message object', function(){
  strictEqual(imchat.utils.isMsgObj(), false, 'undefined');
  strictEqual(imchat.utils.isMsgObj(null), false, 'null');
  strictEqual(imchat.utils.isMsgObj(123), false, 'number');
  strictEqual(imchat.utils.isMsgObj('asd'), false, 'string');
  strictEqual(imchat.utils.isMsgObj([1,2,]), false, 'array');
  strictEqual(imchat.utils.isMsgObj({some: '', an: ''}), false,
                                    'incorrect object');
  strictEqual(imchat.utils.isMsgObj({message: 12, author: 'some', time: 123}),
                                    false, 'message is incorrect');
  strictEqual(imchat.utils.isMsgObj({message: '', author: 'some', time: 123}),
                                    false, 'message is empty');
  strictEqual(imchat.utils.isMsgObj({message: 'some', author: 12, time: 123}),
                                    false, 'author is incorrect');
  strictEqual(imchat.utils.isMsgObj({message: 'some', author: '', time: 123}),
                                    false, 'author is empty');
  strictEqual(imchat.utils.isMsgObj(
                {message: 'some', author: 'some', time: 'some'}
              ), false, 'time is incorrect');
  strictEqual(imchat.utils.isMsgObj(
                {message: 'some', author: 'some', time: -123}
              ), false, 'time is negative');
  strictEqual(imchat.utils.isMsgObj(
                {message: 'some', author: 'some', time: 123}
              ), true, 'correct object');
});

test('is message event', function(){
  strictEqual(imchat.utils.isMsgEvent(), false, 'undefined');
  strictEqual(imchat.utils.isMsgEvent(null), false, 'null');
  strictEqual(imchat.utils.isMsgEvent(123), false, 'number');
  strictEqual(imchat.utils.isMsgEvent('asd'), false, 'string');
  strictEqual(imchat.utils.isMsgEvent([1,2,]), false, 'array');
  strictEqual(imchat.utils.isMsgEvent((new MessageEvent('some'))), false,
              'incorrect event');
  
  var msgEvent = new MessageEvent('message');
  strictEqual(imchat.utils.isMsgEvent(msgEvent), false, 'empty');
  
  // incorrect create MessageEvent by this way
  // msgEvent.origin = window.location.origin;
  // strictEqual(imchat.utils.isMsgEvent(msgEvent), false, 'only origin');
  // msgEvent.data = '';
  // strictEqual(imchat.utils.isMsgEvent(msgEvent), false, 'incorrect data');
  
  // msgEvent.data = {}
  // console.log(msgEvent);
  // strictEqual(imchat.utils.isMsgEvent(msgEvent), true, 'correct');
  // msgEvent.origin = 'http://something.com';
  // strictEqual(imchat.utils.isMsgEvent(msgEvent), false, 'incorrect origin');
});

test('is message event data', function(){
  // need mock
});