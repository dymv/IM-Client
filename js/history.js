function History() {
}

History.prototype.save = function(newMessage) {
  if (!imchat.utils.isMsgObj(newMessage)) throw 'incorrect new message';
  
  if (sessionStorage) {
    var messages = this.load();
    messages.push(newMessage);
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }
};

History.prototype.load = function() {
  var messages = [];
  
  if (sessionStorage && sessionStorage.getItem('messages') !== null) {
    try {
      messages = JSON.parse(sessionStorage.messages);
    } catch(error){}
  }
  
  return messages;
};

namespace('imchat.history', History);