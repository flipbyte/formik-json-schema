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

describe('CodeEditor', () => {
    const config = {
        fieldName: 'codeeditor',
        label: 'CodeEditor',
        formGroupClass: 'mt-5',
        fieldClass: 'border',
        options: {
            mode: 'xml',
            lineNumbers: true
        }
    };

    const codeEditor = prepareField('code-editor', {
        name: config.fieldName,
        label: config.label,
        options: config.options
    });

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            codeEditor: codeEditor
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
