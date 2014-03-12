module('Form Helper ====');

var addForm = function() {
  var form = document.createElement('form');
      form.id = imchat.constants.FORM_ID;
  
  var uname = document.createElement('input');
      uname.name = imchat.constants.NAME_FIELD;
      uname.type = 'text';
      uname.placeholder = 'Enter your nickname';
  form.appendChild(uname);
      
  var message = document.createElement('input');
      message.name = imchat.constants.MESSAGE_FIELD;
      message.type = 'text';
      message.placeholder = 'Enter message';
  form.appendChild(message);
      
  var but = document.createElement('button');
      but.name = imchat.constants.SEND_BUTTON;
      but.value = 'send';
      but.textContent = 'Send Message';
  form.appendChild(but);
  
  document.body.appendChild(form);
  return {
    form: form,
    name: uname,
    msg: message,
    but: but
  };
};

var removeForm = function() {
  var form = document.forms['clientIM'];
  if (form) {
    form.remove();
  }
};

test('constructor', function(){
  var form = new FormHelper();
  
  strictEqual(form.name, null, 'default name elem');
  strictEqual(form.message, null, 'default message elem');
  strictEqual(form.send, null, 'default send elem');
});

test('init', function(){
  removeForm();
  
  throws(
    function() { imchat.client.form.init(); }, "form not exist"
  );
  
  var newForm = addForm();
  
  imchat.client.form.init();
  
  deepEqual(imchat.client.form.name, newForm.name, 'new name elem');
  deepEqual(imchat.client.form.message, newForm.msg, 'new message elem');
  deepEqual(imchat.client.form.send, newForm.but, 'new send elem');
  
  removeForm();
});

test('get name', function(){
  var tmpName = imchat.client.form.name;
  imchat.client.form.name = null
  
  throws(
    function() { imchat.client.form.getNickname(); }, "form doesn't init"
  );
  
  var newForm = addForm();
  imchat.client.form.name = newForm.name;
  
  imchat.client.form.name.value = '';
  strictEqual(imchat.client.form.getNickname(), '', 'empty field');
  
  imchat.client.form.name.value = 'asd';
  strictEqual(imchat.client.form.getNickname(), 'asd', 'simple string');
  
  imchat.client.form.name.value = ' asd ';
  strictEqual(imchat.client.form.getNickname(), 'asd', 'string with spaces');
  
  imchat.client.form.name = tmpName;
});

test('get message', function(){
  var tmpMessage = imchat.client.form.message;
  imchat.client.form.message = null
  
  throws(
    function() { imchat.client.form.getMessage(); }, "form doesn't init"
  );
  
  var newForm = addForm();
  imchat.client.form.message = newForm.msg;
  
  imchat.client.form.message.value = '';
  strictEqual(imchat.client.form.getMessage(), '', 'empty field');
  
  imchat.client.form.message.value = 'asd';
  strictEqual(imchat.client.form.getMessage(), 'asd', 'simple string');
  
  imchat.client.form.message.value = ' asd ';
  strictEqual(imchat.client.form.getMessage(), 'asd', 'string with spaces');
  
  imchat.client.form.message = tmpMessage;
});

test('check field', function(){
  throws(
    function() { imchat.client.form._checkField(); }, "without param"
  );
  
  throws(
    function() { imchat.client.form._checkField(123); }, "number"
  );
  
  throws(
    function() { imchat.client.form._checkField('some'); }, "incorrect name"
  );
  
  var newForm = addForm();
  imchat.client.form.message = newForm.msg;
  
  imchat.client.form.message.className = '';
  imchat.client.form.message.value = '';
  strictEqual(imchat.client.form._checkField('message'), false,
              'empty message');
  strictEqual(imchat.client.form.message.classList.contains(
                imchat.constants.FIELD_ERROR_CLASS
              ), true, 'empty message, class error');
  
  imchat.client.form.message.className = '';
  imchat.client.form.message.value = '   ';
  strictEqual(imchat.client.form._checkField('message'), false,
              'spaces message');
  strictEqual(imchat.client.form.message.classList.contains(
                imchat.constants.FIELD_ERROR_CLASS
              ), true, 'spaces message, class error');
              
  imchat.client.form.message.className = imchat.constants.FIELD_ERROR_CLASS;
  imchat.client.form.message.value = ' as s ';
  strictEqual(imchat.client.form._checkField('message'), true,
              'message correct');
  strictEqual(imchat.client.form.message.classList.contains(
                imchat.constants.FIELD_ERROR_CLASS
              ), false, 'spaces message, class error');
  
  imchat.client.form.name = newForm.name;
  
  imchat.client.form.name.value = '';
  strictEqual(imchat.client.form._checkField('name'), false, 'empty name');
  imchat.client.form.name.value = '   ';
  strictEqual(imchat.client.form._checkField('name'), false, 'spaces name');
  imchat.client.form.name.value = ' as s ';
  strictEqual(imchat.client.form._checkField('name'), false, 'name with space');
  imchat.client.form.name.value = ' as_s ';
  strictEqual(imchat.client.form._checkField('name'), true, 'name correct');
});

test('send message', function(){
  throws(
    function() { imchat.client.form._sendMessage(); }, "without param"
  );
  
  throws(
    function() { imchat.client.form._sendMessage({}); }, "incorrect event obj"
  );
  
  // mock
});