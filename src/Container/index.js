import { registerContainer } from '../registry';

import Form from './Form';
import Tabs from './Tabs';
import Array from './Array';
import Fieldset from './Fieldset';
import ButtonGroup from './ButtonGroup';
import EditableGrid from './EditableGrid';

registerContainer('form', Form);
registerContainer('tabs', Tabs);
registerContainer('array', Array);
registerContainer('fieldset', Fieldset);
registerContainer('button-group', ButtonGroup);
registerContainer('editable-grid', EditableGrid);
