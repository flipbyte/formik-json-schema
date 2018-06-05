import { registerContainer } from '../registry';

import Form from './Form';
import Tabs from './Tabs';
import Cols from './Cols';
import Array from './Array';
import Fieldset from './Fieldset';
import ButtonGroup from './ButtonGroup';

registerContainer('form', Form);
registerContainer('tabs', Tabs);
registerContainer('cols', Cols);
registerContainer('array', Array);
registerContainer('fieldset', Fieldset);
registerContainer('button-group', ButtonGroup);
