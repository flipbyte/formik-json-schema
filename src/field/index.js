import { registerField } from '../registry';

import Text from './Text';
import Radio from './Radio';
import Button from './Button';
import Wysiwyg from './Wysiwyg';
import Textarea from './Textarea';
import Checkbox from './Checkbox';

[
    'text',
    'email',
    'password',
    'number',
    'url'
].map(( type ) => registerField(type, Text));

registerField('radio', Radio);
registerField('button', Button);
registerField('wysiwyg', Wysiwyg);
registerField('textarea', Textarea);
registerField('checkbox', Checkbox);
