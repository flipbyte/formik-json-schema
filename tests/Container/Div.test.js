import expect from 'expect'
import React from 'react';
import { configure, mount, render } from 'enzyme';
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

describe('Div', () => {
    const config = {
        containerName: 'testDiv',
        fieldName: 'testField',
        htmlClass: 'test-html-class'
    };
    const container = prepareContainer('div');
    const field = prepareField('text', {
        name: config.fieldName,
        label: "Text",
        fieldType: "text",
    });
    const withElements = { div: {
        elements: { text: { ...field } },
        ...container
    }}
    const withNoElements = { div: { ...container } };
    const withHtmlClass = { div: { htmlClass: config.htmlClass, ...container } };
    const withNameAsPrefixForChildren = { div: {
        name: config.containerName,
        prefixNameToElement: true,
        elements: { text: { ...field } },
        ...container
    }};
    const prefixWithoutName = { div: {
        prefixNameToElement: true,
        elements: { text: field },
        ...container
    }};

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withElements }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('throws error when "elements" is not defined', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withNoElements }) } />);
        expect(console.error.threw).toEqual(true);
    });

    it('adds html class to div', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withHtmlClass }) } />);
        expect(wrapper.find('div').first().props().className).toEqual('test-html-class');
    });

    context('prefixNameToElement', function() {
        it('prefix name to direct child element when "prefixNameToElement" is true and "name" is set', () => {
            const { containerName, fieldName } = config;
            const wrapper = render(<Form { ...prepareForm({ elements: withNameAsPrefixForChildren }) } />);
            expect(wrapper.find('input').attr('name')).toEqual(`${containerName}.${fieldName}`);
        });

        it('uses only field name when "prefixNameToElement" is true and "name" is not defined', () => {
            const { fieldName } = config;
            const wrapper = render(<Form { ...prepareForm({ elements: prefixWithoutName }) } />);
            expect(wrapper.find('input').attr('name')).toEqual(fieldName);
        });
    })
})
