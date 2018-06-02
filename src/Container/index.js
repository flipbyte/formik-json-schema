import { registerContainer } from '../registry';

import Form from './Form';
import Fieldset from './Fieldset';
import ButtonGroup from './ButtonGroup';

registerContainer('form', Form);
registerContainer('fieldset', Fieldset);
registerContainer('button-group', ButtonGroup);
