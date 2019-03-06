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

describe('Radio', () => {
    const config = {
        name: "radio",
        label: "Radio",
        options: [{
            value: 1,
            title: "One"
        }, {
            value: 2,
            title: "Two"
        }, {
            value: 3,
            title: "Three"
        }]
    };

    const radio = prepareField('radio', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            radio: radio
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
