function FormHelper() {
  this.name = null;
  this.message = null;
  this.send = null;
}

FormHelper.prototype.init = function() {
  var form = document.forms[imchat.constants.FORM_ID];
  if (!form) throw 'form not found';
  
  this.name = form.elements.namedItem(imchat.constants.NAME_FIELD);
  this.message = form.elements.namedItem(imchat.constants.MESSAGE_FIELD);
  this.send = form.elements.namedItem(imchat.constants.SEND_BUTTON);
  
  if (this.send) {
    this.send.addEventListener(('ontouchstart' in document ?
                                'touchstart' : 'click'),
                               this._sendMessage.bind(this), false);
  }
};

FormHelper.prototype.getNickname = function() {
  if (!this.name) throw 'name field is not initialized';
  
  return this.name.value.trim();
};

FormHelper.prototype.getMessage = function() {
  if (!this.message) throw 'message field is not initialized';
  
  return this.message.value.trim();
};

FormHelper.prototype._checkField = function(fieldName) {
  // now hard code, but better check dinamic fields
  if (fieldName !== 'name' && fieldName !== 'message') throw 'incorrect field';
  
  var valid;
  if (fieldName === 'name') {
    valid = (this.getNickname().match(/^[-a-zA-Z0-9_]+$/) !== null);
  } else {
    valid = (this.getMessage() !== '');
  }
  
  this[fieldName].classList[(valid ? 'remove' : 'add')](imchat.constants.FIELD_ERROR_CLASS);
  
  return valid;
};

FormHelper.prototype._sendMessage = function(event) {
  if (!(event instanceof MouseEvent) && !(event instanceof TouchEvent))
    throw 'unexpected call function';
    
  event.preventDefault();
  
  if (this._checkField('name') && this._checkField('message')) {
    imchat.client.send({
      message: this.getNickname(),
      author: this.getMessage(),
      time: (new Date()).getTime()
    });
  } else {
    return false;
  }
};

namespace('imchat.client.form', FormHelper);