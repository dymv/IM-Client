var CONSTANTS = {
  CHAT_ID: 'chatBody',
  FORM_ID: 'clientIM',
  NAME_FIELD: 'user_name',
  MESSAGE_FIELD: 'new_message',
  SEND_BUTTON: 'send_message',
  
  FIELD_ERROR_CLASS: 'field_error',
  OWN_USER_CLASS: 'own_user',
  OTHER_USER_CLASS: 'other_user',
  USER_IN_TEXT_CLASS: 'user_in_text',
  SMILES: [
    { symbol: ':)', className: 'smile1' },
    { symbol: ':(', className: 'smile2' },
    { symbol: ':D', className: 'smile3' },
    { symbol: ';)', className: 'smile4' },
    { symbol: ':p', className: 'smile5' },
    { symbol: ':*', className: 'smile6' }
  ]
};

namespace('imchat.constants');
imchat.constants = CONSTANTS;