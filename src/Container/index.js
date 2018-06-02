import { registerContainer } from '../registry';

import Form from './Form';
import Tabs from './Tabs';
import Fieldset from './Fieldset';
import ButtonGroup from './ButtonGroup';

registerContainer('form', Form);
registerContainer('tabs', Tabs);
registerContainer('fieldset', Fieldset);
registerContainer('button-group', ButtonGroup);
