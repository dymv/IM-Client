function Utils() {
}

Utils.prototype.isMsgObj = function(obj) {
  return (typeof obj === 'object' && obj !== null &&
          typeof obj.message === 'string' && obj.message.trim() !== '' &&
          typeof obj.author === 'string' && obj.author.trim() !== '' &&
          typeof obj.time === 'number' && obj.time > 0);
};

Utils.prototype.isMsgEvent = function(eventMessage) {
  return (eventMessage instanceof MessageEvent &&
          eventMessage.type === 'message' &&
          eventMessage.origin === window.location.origin &&
          typeof eventMessage.data === 'object' && eventMessage.data !== null);
};

Utils.prototype.isMsgEventData = function(data) {
  return (typeof data === 'object' && data !== null &&
          this.isMsgObj(data.message) &&
          data.users instanceof Array);
};

// link: (http://izhurnal.blogspot.ru/2010/10/regexpescape-javascript.html)
Utils.prototype.regExpEscape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// hotfix for ie
Utils.prototype.ieFixOrigin = function() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" +
          window.location.hostname +
          (window.location.port ? ':' + window.location.port: '');
    }
}

namespace('imchat.utils', Utils);