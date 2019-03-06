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
import {
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
} from '../../demo/src/source/autocomplete';

import { Form } from 'src';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('ReactSelect', () => {
    const config = {
        name: "react-select",
        label: "React Select",
        isCreatable: true,
        options: [{
            value: 0,
            label: "No"
        }, {
            value: 1,
            label: "Yes"
        }],
        formGroupClass: "form-group mb-4"
    };

    const reactSelect = prepareField('react-select', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            reactSelect: reactSelect
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
