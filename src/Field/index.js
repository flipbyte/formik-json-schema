import { registerField } from '../registry';

import Text from './Text';
import Radio from './Radio';
import Button from './Button';
import Switch from './Switch';
import Wysiwyg from './Wysiwyg';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import CodeEditor from './CodeEditor';
import ReactSelect from './ReactSelect';
import Autocomplete from './Autocomplete';

[
    'text',
    'email',
    'password',
    'number',
    'url',
    'date'
].map(( type ) => registerField(type, Text));

registerField('radio', Radio);
registerField('button', Button);
registerField('switch', Switch);
registerField('wysiwyg', Wysiwyg);
registerField('textarea', Textarea);
registerField('checkbox', Checkbox);
registerField('code-editor', CodeEditor);
registerField('react-select', ReactSelect);
registerField('autocomplete', Autocomplete);
