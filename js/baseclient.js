window.namespace=function(a,b,e){if("string"!==typeof a)throw"chain should be a string";a=a.trim();if(""===a)throw"chain can't be empty";a=a.split(".");for(var d=window,c=0,f=a.length-1;c<=f;c++){if("object"!==typeof d[a[c]]||null===d[a[c]])d[a[c]]={};c!==f&&(d=d[a[c]])}if("function"===typeof b){c=d[a[f]];d[a[f]]=!0===e?b:new b;for(var g in c)d[a[f]][g]=c[g]}};var CONSTANTS={CHAT_ID:"chatBody",FORM_ID:"clientIM",NAME_FIELD:"user_name",MESSAGE_FIELD:"new_message",SEND_BUTTON:"send_message",FIELD_ERROR_CLASS:"field_error",OWN_USER_CLASS:"own_user",OTHER_USER_CLASS:"other_user",USER_IN_TEXT_CLASS:"user_in_text",SMILES:[{symbol:":)",className:"smile1"},{symbol:":(",className:"smile2"},{symbol:":D",className:"smile3"},{symbol:";)",className:"smile4"},{symbol:":p",className:"smile5"},{symbol:":*",className:"smile6"}]};namespace("imchat.constants");
imchat.constants=CONSTANTS;function Utils(){}Utils.prototype.isMsgObj=function(a){return"object"===typeof a&&null!==a&&"string"===typeof a.message&&""!==a.message.trim()&&"string"===typeof a.author&&""!==a.author.trim()&&"number"===typeof a.time&&0<a.time};Utils.prototype.isMsgEvent=function(a){return a instanceof MessageEvent&&"message"===a.type&&a.origin===window.location.origin&&"object"===typeof a.data&&null!==a.data};
Utils.prototype.isMsgEventData=function(a){return"object"===typeof a&&null!==a&&this.isMsgObj(a.message)&&a.users instanceof Array};Utils.prototype.regExpEscape=function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};namespace("imchat.utils",Utils);function FormHelper(){this.send=this.message=this.name=null}FormHelper.prototype.init=function(){var a=document.forms[imchat.constants.FORM_ID];if(!a)throw"form not found";this.name=a.elements.namedItem(imchat.constants.NAME_FIELD);this.message=a.elements.namedItem(imchat.constants.MESSAGE_FIELD);(this.send=a.elements.namedItem(imchat.constants.SEND_BUTTON))&&this.send.addEventListener("ontouchstart"in document?"touchstart":"click",this._sendMessage.bind(this),!1)};
FormHelper.prototype.getNickname=function(){if(!this.name)throw"name field is not initialized";return this.name.value.trim()};FormHelper.prototype.getMessage=function(){if(!this.message)throw"message field is not initialized";return this.message.value.trim()};
FormHelper.prototype._checkField=function(a){if("name"!==a&&"message"!==a)throw"incorrect field";var b;b="name"===a?null!==this.getNickname().match(/^[-a-zA-Z0-9_]+$/):""!==this.getMessage();this[a].classList[b?"remove":"add"](imchat.constants.FIELD_ERROR_CLASS);return b};
FormHelper.prototype._sendMessage=function(a){if(!(a instanceof MouseEvent||a instanceof TouchEvent))throw"unexpected call function";a.preventDefault();if(this._checkField("name")&&this._checkField("message"))imchat.client.send({message:this.getMessage(),author:this.getNickname(),time:(new Date).getTime()}),this.message.value="";else return!1};namespace("imchat.client.form",FormHelper);function Client(){this.allNicks=this.ownNicks=this.chatBlock=null}Client.prototype.init=function(){var a=document.getElementById(imchat.constants.CHAT_ID);if(!a)throw"block not exist";this.chatBlock=a;imchat.client.form.init();window.addEventListener("message",this._incomingMessage.bind(this),!1)};Client.prototype.send=function(a){if(!imchat.utils.isMsgObj(a))throw"incorrect new message";window.parent.postMessage(a,window.location.origin);this._addOwnNick(a.author);this._addMessageToChat(a)};
Client.prototype._incomingMessage=function(a){if(!imchat.utils.isMsgEvent(a))throw"incorrect new message";if(!imchat.utils.isMsgEventData(a.data))throw"incorrect message data";this.allNicks=a.data.users;this._addMessageToChat(a.data.message)};
Client.prototype._addMessageToChat=function(a){if(!imchat.utils.isMsgObj(a))throw"incorrect message";if(null===this.chatBlock)throw"block doesn't initialized";a=this._parseMessage(a);var b=document.createElement("p");b.innerHTML=a;this.chatBlock.appendChild(b);this._scrollBottom()};Client.prototype._parseMessage=function(a){if(!imchat.utils.isMsgObj(a))throw"incorrect message";a.message=this._highLightNames(a.message);a.message=this._addSmiles(a.message);a.message=this._joinMessage(a);return a.message};
Client.prototype._highLightNames=function(a){if("string"!==typeof a)throw"message has to be text";if(null!==this.allNicks&&0<this.allNicks.length)for(var b=this.allNicks.length;0<=--b;)if(-1!==a.indexOf(this.allNicks[b])){var e="(\\b"+imchat.utils.regExpEscape(this.allNicks[b])+"\\b)";a=a.replace(RegExp(e,"g"),'<span class="'+imchat.constants.USER_IN_TEXT_CLASS+'">$1</span>')}return a};
Client.prototype._addSmiles=function(a){if("string"!==typeof a)throw"message has to be text";for(var b=imchat.constants.SMILES.length;0<=--b;)if(-1!==a.indexOf(imchat.constants.SMILES[b].symbol)){var e=imchat.utils.regExpEscape(imchat.constants.SMILES[b].symbol);a=a.replace(RegExp(e,"g"),'<span class="smiles '+imchat.constants.SMILES[b].className+'"></span>')}return a};
Client.prototype._joinMessage=function(a){if(!imchat.utils.isMsgObj(a))throw"incorrect message";return'<span class="'+imchat.constants[this._isOwnUser(a.author)?"OWN_USER_CLASS":"OTHER_USER_CLASS"]+'">'+a.author+":</span> "+a.message};Client.prototype._isOwnUser=function(a){if("string"!==typeof a)throw"user name is incorrect";return null!==this.ownNicks&&-1!==this.ownNicks.indexOf(a)};
Client.prototype._addOwnNick=function(a){if("string"!==typeof a)throw"nickname is incorrect";null===this.ownNicks&&(this.ownNicks=[]);-1===this.ownNicks.indexOf(a)&&this.ownNicks.push(a)};Client.prototype._scrollBottom=function(){this.chatBlock&&(this.chatBlock.scrollTop=this.chatBlock.scrollHeight-this.chatBlock.offsetHeight)};namespace("imchat.client",Client);