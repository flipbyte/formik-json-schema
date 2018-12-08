import { registerContainer } from '../registry';

import Div from './Div';
import Form from './Form';
import Tabs from './Tabs';
import Fieldset from './Fieldset';
import ButtonGroup from './ButtonGroup';
import EditableGrid from './EditableGrid';

registerContainer('div', Div);
registerContainer('form', Form);
registerContainer('tabs', Tabs);
registerContainer('fieldset', Fieldset);
registerContainer('button-group', ButtonGroup);
registerContainer('editable-grid', EditableGrid);
