module('Namespace ====');
test('Namespace function', function(){
  throws(
    function() {
      namespace();
    },
    "without params"
  );
  throws(
    function() {
      namespace(123);
    },
    "incorrect type of chain"
  );
  // throws(
  //   function() {
  //     namespace('as^asd');
  //   },
  //   "incorrect symbol in chain"
  // );
  throws(
    function() {
      namespace('  ');
    },
    "empty chain"
  );
  
  window['testtest'] = {level: 123};
  namespace('testtest');
  deepEqual(window['testtest'], {level: 123}, 'try create then already have');
  
  window['testtest'] = undefined;
  namespace('testtest');
  deepEqual(window['testtest'], {}, 'create chain with single level');
  
  window['testtest'] = undefined;
  namespace('testtest.nextLevel.endDeeper');
  deepEqual(window['testtest'], {nextLevel: {endDeeper: {}}},
            'create chain with multi level');
            
  window.testtest = {nextLevel: {endDeeper: {}}};
  namespace('testtest.nextLevel.endDeeper.another');
  deepEqual(window['testtest'], {nextLevel: {endDeeper: {another: {}}}},
            'add next level to chain');
            
  window.some = function() {this.aa = 55;};
  window['testtest'] = undefined;
  namespace('testtest.nextLevel.endDeeper', 'asd');
  deepEqual(window['testtest'], {nextLevel: {endDeeper: {}}},
            'chain and incorrect function param');
  
  window['testtest'] = undefined;          
  namespace('testtest.nextLevel.endDeeper', some, true);
  deepEqual(window['testtest'], {nextLevel: {endDeeper: some}},
            'chain and function, namespace not exist');
            
  window['testtest'] = {nextLevel: {endDeeper: {}}};
  namespace('testtest.nextLevel.endDeeper', some, true);
  deepEqual(window['testtest'], {nextLevel: {endDeeper: some}},
            'chain and function, namespace with empty obj on end');
            
  window['testtest'] = {nextLevel: {endDeeper: {here: 123,
                                                end: {one: 23, two: 33}}}};
  namespace('testtest.nextLevel.endDeeper', some, true);
  var someTwo = some;
  someTwo.here = 123;
  someTwo.end = {one: 23, two: 33};
  deepEqual(window['testtest'], {nextLevel: {endDeeper: someTwo}},
            'chain and function, namespace with obj with params on end');
            
  window['testtest'] = undefined;          
  namespace('testtest.nextLevel.endDeeper', some);
  deepEqual(window['testtest'], {nextLevel: {endDeeper: (new some())}},
            'chain and instance of class');
            
  window['testtest'] = {nextLevel: {endDeeper: {here: 123,
                                                end: {one: 23, two: 33}}}};
  
  namespace('testtest.nextLevel.endDeeper', some);
  someTwo = new some();
  someTwo.here = 123;
  someTwo.end = {one: 23, two: 33};
  deepEqual(window['testtest'], {nextLevel: {endDeeper: someTwo}},
          'chain and instance of class, namespace with obj with params on end');
            
  window['testtest'] = undefined;
});