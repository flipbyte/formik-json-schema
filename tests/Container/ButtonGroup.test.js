import _ from 'lodash'
import expect from 'expect'
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { render, unmountComponentAtNode } from 'react-dom'
import { checkConsoleError, restoreConsoleError, prepareForm } from '../test-utils'
import { Form } from 'src';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('ButtonGroup', () => {
    const button = {
        save: {
            type: "field",
            renderer: "button",
            name: "save",
            label: "Save",
            fieldClass: "btn-success float-right",
            buttonType: "submit",
        }
    }

    const buttonsGroup = {
        buttonsGroup: {
            type: "container",
            renderer: "button-group",
        }
    };

    const withElements = _.merge({}, buttonsGroup, {
        buttonsGroup: {
            elements: button
        }
    });

    const withButtonContainerClass = _.merge({}, buttonsGroup, {
        buttonsGroup: {
            buttonsContainerClass: 'test-button-container'
        }
    });

    const withButtonGroupClass = _.merge({}, buttonsGroup, {
        buttonsGroup: {
            buttonGroupClass: 'test-button-group'
        }
    });

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withElements }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('throws error when "elements" is not defined', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: buttonsGroup }) } />);
        expect(console.error.threw).toEqual(true);
    });

    it('adds class to button group container', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withButtonContainerClass }) } />);
        expect(wrapper.find('div').first().props().className).toEqual('test-button-container');
    });

    it('adds class to button group', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withButtonGroupClass }) } />);
        expect(wrapper.find('div').children().props().className).toEqual('test-button-group');
    });
})
