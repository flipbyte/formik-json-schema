import { registerField } from '../registry';

import Text from './Text';
import Textarea from './Textarea';
import Wysiwyg from './Wysiwyg';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Button from './Button';

['text', 'email', 'password', 'number', 'url'].map(( type ) => registerField(type, Text));

registerField('textarea', Textarea);
registerField('wysiwyg', Wysiwyg);
registerField('checkbox', Checkbox);
registerField('radio', Radio);
registerField('button', Button);
