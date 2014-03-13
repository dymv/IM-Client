function Cover() {
  this.users = [];
}

Cover.prototype.init = function() {
  if (window.frames.length === 0) throw 'no frames';
  imchat.utils.ieFixOrigin();
  window.addEventListener('message', this._incomingMessage.bind(this), false);
};

Cover.prototype._incomingMessage = function(messageData) {
  if (!imchat.utils.isMsgEvent(messageData)) throw 'incorrect new message';
  if (!imchat.utils.isMsgObj(messageData.data)) throw 'incorrect message data';
  
  imchat.history.save(messageData.data);
  this._addNick(messageData.data.author);
  
  var sendData = {
    message: messageData.data,
    users: this.users
  };
  var len = window.frames.length;
  while (--len >= 0) {
    if (window.frames[len] !== messageData.source) {
      window.frames[len].postMessage(sendData, window.location.origin);
    }
  }
};

Cover.prototype._addNick = function(nickName) {
  if (typeof nickName !== 'string') throw 'nickname is incorrect';
  if (this.users === null) this.users = [];
  
  if (this.users.indexOf(nickName) === -1) {
    this.users.push(nickName);
  }
};

namespace('imchat.cover', Cover);