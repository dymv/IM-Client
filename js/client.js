function Client() {
  this.chatBlock = null;
  this.ownNicks = null;
  //this.otherNicks = null;
  this.allNicks = null;
}

Client.prototype.init = function() {
  var chat = document.getElementById[imchat.constants.CHAT_ID];
  if (!chat) throw 'block not exist';
  
  this.chatBlock = chat;
  
  imchat.client.form.init();
  window.addEventListener('message', this._incomingMessage.bind(this), false);
};

Client.prototype.send = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect new message';
  
  window.parent.postMessage(message, window.location.origin);
  //this._addOwnNick(message.author);
};

Client.prototype._incomingMessage = function(messageData) {
  if (!imchat.utils.isMsgEvent(messageData)) throw 'incorrect new message';
  if (!imchat.utils.isMsgEventData(messageData.date)) throw 'incorrect message data';
  
  //this._updNicks(messageData.date.users);
  this.allNicks = messageData.date.users;
  this._addMessageToChat(messageData.date.message);
};

Client.prototype._addMessageToChat = function(message) {
  // text message -> parse and add to div
  // message = this._parseMessage(message)
};

Client.prototype._parseMessage = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect message';
  
  // message.message = this._highLightNames(message.message);
  // message.message = this._addSmiles(message.message);
  // message.message = this._joinMessage(message);
  
  return message.message;
};

Client.prototype._highLightNames = function(messageText) {
  if (typeof messageText !== 'string') throw 'message has to be text';
  
  if (this.allNicks !== null && this.allNicks.length > 0) {
    var len = this.allNicks.length;
    while(--len >= 0) {
      // not good for perfomance...
      if (messageText.indexOf(this.allNicks[len]) !== -1) {
        var regExp = new RegExp('(\\b' +  imchat.utils.regExpEscape(this.allNicks[len]) + '\\b)', 'g');
        messageText = messageText.replace(
          regExp,
          '<span class="' + imchat.constants.USER_IN_TEXT_CLASS + '">$1</span>'
        );
      }
    }
  }
  
  return messageText;
};

Client.prototype._addSmiles = function(messageText) {
  if (typeof messageText !== 'string') throw 'message has to be text';
  
  var len = imchat.constants.SMILES.length;
  while(--len >= 0) {
    if (messageText.indexOf(imchat.constants.SMILES[len].symbol) !== -1) {
      var regExp = new RegExp(imchat.utils.regExpEscape(imchat.constants.SMILES[len].symbol), 'g');
      messageText = messageText.replace(
        regExp,
        '<span class="' + imchat.constants.SMILES[len].className + '"></span>'
      );
    }
  }
  
  return messageText;
};

Client.prototype._joinMessage = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect message';
  
  return '<span class="' +
          imchat.constants[(
            this._isOwnUser(message.author) ?
            'OWN_USER_CLASS' :
            'OTHER_USER_CLASS'
          )] + '">' + message.author + ':</span> ' + message.message;
};

Client.prototype._isOwnUser = function(userName) {
  if (typeof userName !== 'string') throw 'user name is incorrect';
  
  return (this.ownNicks !== null && this.ownNicks.indexOf(userName) !== -1);
};

Client.prototype._addOwnNick = function(nickName) {
  // add new nick if not in list
};

// Client.prototype._updNicks = function(nickNames) {
//   // just check all names and add not exists
// };

namespace('imchat.client', Client);