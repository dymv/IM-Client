window.namespace=function(a,c,e){if("string"!==typeof a)throw"chain should be a string";a=a.trim();if(""===a)throw"chain can't be empty";a=a.split(".");for(var d=window,b=0,f=a.length-1;b<=f;b++){if("object"!==typeof d[a[b]]||null===d[a[b]])d[a[b]]={};b!==f&&(d=d[a[b]])}if("function"===typeof c){b=d[a[f]];d[a[f]]=!0===e?c:new c;for(var g in b)d[a[f]][g]=b[g]}};var CONSTANTS={CHAT_ID:"chatBody",FORM_ID:"clientIM",NAME_FIELD:"user_name",MESSAGE_FIELD:"new_message",SEND_BUTTON:"send_message",FIELD_ERROR_CLASS:"field_error",OWN_USER_CLASS:"own_user",OTHER_USER_CLASS:"other_user",USER_IN_TEXT_CLASS:"user_in_text",SMILES:[{symbol:":)",className:"smile1"},{symbol:":(",className:"smile2"},{symbol:":D",className:"smile3"},{symbol:";)",className:"smile4"},{symbol:":p",className:"smile5"},{symbol:":*",className:"smile6"}]};namespace("imchat.constants");
imchat.constants=CONSTANTS;function Utils(){}Utils.prototype.isMsgObj=function(a){return"object"===typeof a&&null!==a&&"string"===typeof a.message&&""!==a.message.trim()&&"string"===typeof a.author&&""!==a.author.trim()&&"number"===typeof a.time&&0<a.time};Utils.prototype.isMsgEvent=function(a){return a instanceof MessageEvent&&"message"===a.type&&a.origin===window.location.origin&&"object"===typeof a.data&&null!==a.data};
Utils.prototype.isMsgEventData=function(a){return"object"===typeof a&&null!==a&&this.isMsgObj(a.message)&&a.users instanceof Array};Utils.prototype.regExpEscape=function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};namespace("imchat.utils",Utils);function History(){}History.prototype.save=function(a){if(!imchat.utils.isMsgObj(a))throw"incorrect new message";if(sessionStorage){var c=this.load();c.push(a);sessionStorage.setItem("messages",JSON.stringify(c))}};History.prototype.load=function(){var a=[];if(sessionStorage&&null!==sessionStorage.getItem("messages"))try{a=JSON.parse(sessionStorage.messages)}catch(c){}return a};namespace("imchat.history",History);function Cover(){this.users=[]}Cover.prototype.init=function(){if(0===window.frames.length)throw"no frames";window.addEventListener("message",this._incomingMessage.bind(this),!1)};
Cover.prototype._incomingMessage=function(a){if(!imchat.utils.isMsgEvent(a))throw"incorrect new message";if(!imchat.utils.isMsgObj(a.data))throw"incorrect message data";imchat.history.save(a.data);this._addNick(a.data.author);for(var c={message:a.data,users:this.users},e=window.frames.length;0<=--e;)window.frames[e]!==a.source&&window.frames[e].postMessage(c,window.location.origin)};
Cover.prototype._addNick=function(a){if("string"!==typeof a)throw"nickname is incorrect";null===this.users&&(this.users=[]);-1===this.users.indexOf(a)&&this.users.push(a)};namespace("imchat.cover",Cover);