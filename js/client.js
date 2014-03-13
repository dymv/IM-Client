function Client() {
  this.chatBlock = null;
  this.ownNicks = null;
  //this.otherNicks = null;
  this.allNicks = null;
}

Client.prototype.init = function() {
  var chat = document.getElementById(imchat.constants.CHAT_ID);
  if (!chat) throw 'block not exist';
  
  this.chatBlock = chat;
  
  imchat.client.form.init();
  window.addEventListener('message', this._incomingMessage.bind(this), false);
};

Client.prototype.send = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect new message';
  
  window.parent.postMessage(message, window.location.origin);
  this._addOwnNick(message.author);
  this._addMessageToChat(message);
};

Client.prototype._incomingMessage = function(messageData) {
  if (!imchat.utils.isMsgEvent(messageData)) throw 'incorrect new message';
  if (!imchat.utils.isMsgEventData(messageData.data))
      throw 'incorrect message data';
  
  //this._updNicks(messageData.date.users);
  this.allNicks = messageData.data.users;
  this._addMessageToChat(messageData.data.message);
};

Client.prototype._addMessageToChat = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect message';
  if (this.chatBlock === null) throw 'block doesn\'t initialized'
  
  var parsedMessage = this._parseMessage(message);
  var pElem = document.createElement('p');
      pElem.innerHTML = parsedMessage;
      
  this.chatBlock.appendChild(pElem);
};

Client.prototype._parseMessage = function(message) {
  if (!imchat.utils.isMsgObj(message)) throw 'incorrect message';
  
  message.message = this._highLightNames(message.message);
  message.message = this._addSmiles(message.message);
  message.message = this._joinMessage(message);
  
  return message.message;
};

Client.prototype._highLightNames = function(messageText) {
  if (typeof messageText !== 'string') throw 'message has to be text';
  
  if (this.allNicks !== null && this.allNicks.length > 0) {
    var len = this.allNicks.length;
    while(--len >= 0) {
      // not good for perfomance...
      if (messageText.indexOf(this.allNicks[len]) !== -1) {
        var reg = '(\\b' +
                  imchat.utils.regExpEscape(this.allNicks[len]) +
                  '\\b)';
        var regExp = new RegExp(reg, 'g');
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
      var reg = imchat.utils.regExpEscape(imchat.constants.SMILES[len].symbol);
      var regExp = new RegExp(reg, 'g');
      messageText = messageText.replace(
        regExp,
        '<span class="smiles ' +
          imchat.constants.SMILES[len].className +
        '"></span>'
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
  if (typeof nickName !== 'string') throw 'nickname is incorrect';
  if (this.ownNicks === null) this.ownNicks = [];
  
  if (this.ownNicks.indexOf(nickName) === -1) {
    this.ownNicks.push(nickName);
  }
};

// Client.prototype._updNicks = function(nickNames) {
//   // just check all names and add not exists
// };

namespace('imchat.client', Client);