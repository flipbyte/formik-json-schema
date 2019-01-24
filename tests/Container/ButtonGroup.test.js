import expect from 'expect'
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { render, unmountComponentAtNode } from 'react-dom'
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

describe('ButtonGroup', () => {
    const config = {
        fieldName: 'save',
        buttonGroupClass: 'test-button-group',
        buttonsContainerClass: 'test-button-container'
    };
    const container = prepareContainer('button-group');
    const button = prepareField('button', {
        name: config.fieldName,
        label: "Text",
        fieldType: "text",
    });

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const withElements = { buttonGroup: {
            elements: { save: { ...button } },
            ...container
        }}
        const wrapper = mount(<Form { ...prepareForm({ elements: withElements }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('throws error when "elements" is not defined', () => {
        const buttonsGroup = { buttonsGroup: { ...container } };
        const wrapper = mount(<Form { ...prepareForm({ elements: buttonsGroup }) } />);
        expect(console.error.threw).toEqual(true);
    });

    it('adds class to button group container', () => {
        const withButtonContainerClass = { buttonGroup: {
            buttonsContainerClass: config.buttonsContainerClass,
            ...container
        }}
        const wrapper = mount(<Form { ...prepareForm({ elements: withButtonContainerClass }) } />);
        expect(wrapper.find('div').first().props().className).toEqual(config.buttonsContainerClass);
    });

    it('adds class to button group', () => {
        const withButtonGroupClass = { buttonGroup: {
            buttonGroupClass: config.buttonGroupClass,
            ...container
        }}
        const wrapper = mount(<Form { ...prepareForm({ elements: withButtonGroupClass }) } />);
        expect(wrapper.find('div').children().props().className).toEqual(config.buttonGroupClass);
    });
})
