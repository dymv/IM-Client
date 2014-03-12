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
  strictEqual(imchat.utils.isMsgObj({message: 'some', author: 'some', time: 'some'}),
                                    false, 'time is incorrect');
  strictEqual(imchat.utils.isMsgObj({message: 'some', author: 'some', time: -123}),
                                    false, 'time is negative');
  strictEqual(imchat.utils.isMsgObj({message: 'some', author: 'some', time: 123}),
                                    true, 'correct object');
});