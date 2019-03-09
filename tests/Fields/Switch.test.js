import expect from 'expect'
import React from 'react';
import { configure, mount } from 'enzyme';
import {
    checkConsoleError,
    restoreConsoleError,
    prepareForm,
    prepareField,
    prepareContainer
} from '../test-utils'
import { Form } from 'src';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('Switch', () => {
    const config = {
        name: "switch",
        label: "Switch",
    };

    const switchField = prepareField('switch', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: { switch: switchField } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
