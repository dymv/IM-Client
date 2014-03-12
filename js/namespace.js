window.namespace = function(classChain, newClass, opt_isExmp){
  if (typeof classChain !== 'string') throw 'chain should be a string';
  classChain = classChain.trim();
  if (classChain === '')  throw 'chain can\'t be empty';
  
  var chain = classChain.split('.');
  var curLevel = window;
  for (var pos = 0, len = chain.length - 1; pos <= len; pos++) {
    if (typeof curLevel[chain[pos]] !== 'object' ||
        curLevel[chain[pos]] === null) {
      curLevel[chain[pos]] = {};
    }
    if (pos !== len) {
      curLevel = curLevel[chain[pos]];
    }
  }
  
  if (typeof newClass === 'function') {
    var oldObjs = curLevel[chain[len]];
    curLevel[chain[len]] = (opt_isExmp === true ? newClass : new newClass());
    for (var objName in oldObjs) {
      curLevel[chain[len]][objName] = oldObjs[objName];
    }
  }
};