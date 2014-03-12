function Utils() {
}

Utils.prototype.isMsgObj = function(obj) {
  return (typeof obj === 'object' && obj !== null &&
          typeof obj.message === 'string' && obj.message.trim() !== '' &&
          typeof obj.author === 'string' && obj.author.trim() !== '' &&
          typeof obj.time === 'number' && obj.time > 0);
};

namespace('imchat.utils', Utils);