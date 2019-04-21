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

describe('Fieldset', () => {
    const config = {
        containerName: 'testFieldset',
        fieldName: 'testField',
        title: 'Test Fieldset Title',
        cardClass: 'test-card',
        cardHeaderClass: 'test-card-header',
        defaultCardHeaderClass: 'card-header',
        cardHeaderActionsClass: 'test-card-header-actions',
        defaultCardHeaderActionsClass: 'card-header-actions',
        cardBodyClass: 'test-card-body',
        defaultIconDownClass: 'fa-angle-down',
        defaultIconUpClass: 'fa-angle-up'
    };
    const container = prepareContainer('fieldset');
    const field = prepareField('text', {
        name: config.fieldName,
        label: "Text",
        fieldType: "text",
    });
    const withElements = { fieldset: {
        elements: {
            text: field
        },
        ...container
    }}
    const withNoElements = { fieldset: { ...container } };
    const withCardClass = { fieldset: { cardClass: config.cardClass, ...container } };
    const withCardHeaderClass = { fieldset: { cardHeaderClass: config.cardHeaderClass, ...container } };
    const withNameAsPrefixForChildren = { fieldset: {
        name: config.containerName,
        prefixNameToElement: true,
        elements: { text: { ...field } },
        ...container
    }};
    const prefixWithoutName = { fieldset: {
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

    it('adds card class to fieldset', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withCardClass }) } />);
        expect(wrapper.find('div').first().props().className).toEqual(config.cardClass);
    });

    it('adds card header when "title" is defined', () => {
        const withCardHeader = {
            fieldset: { title: config.title, ...container }
        };
        const wrapper = mount(<Form { ...prepareForm({ elements: withCardHeader }) } />);
        expect(wrapper.find(`div.${config.defaultCardHeaderClass}`).exists()).toEqual(true);
        expect(wrapper.find('div').first().text()).toEqual(config.title);
    });

    it('does not add card header when "title" is not defined', () => {
        const withoutCardHeader = { fieldset: { ...container } };
        const wrapper = mount(<Form { ...prepareForm({ elements: withoutCardHeader }) } />);
        expect(wrapper.find(`div.${config.defaultCardHeaderClass}`).exists()).toEqual(false);
    });

    it('adds card header class to fieldset when card header exists', () => {
        const withCardHeaderClass = {
            fieldset: {
                title: config.title,
                cardHeaderClass: config.cardHeaderClass,
                ...container
            }
        };
        const wrapper = mount(<Form { ...prepareForm({ elements: withCardHeaderClass }) } />);
        expect(wrapper.find(`div.${config.cardHeaderClass}`).exists()).toEqual(true);
    });

    it('show header actions when fieldset is collapsible', () => {
        const withCardHeaderClass = {
            fieldset: {
                title: config.title,
                collapsible: true,
                ...container
            }
        };
        const wrapper = mount(<Form { ...prepareForm({ elements: withCardHeaderClass }) } />);
        expect(wrapper.find(`div.${config.defaultCardHeaderActionsClass}`).exists()).toEqual(true);
    });

    context('on header click', function() {
        const fieldsetWithTitle = {
            title: config.title,
            ...container
        };

        it('hide fieldset body when "collapsible" is true and show down arrow', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: {
                fieldset: {
                    collapsible: true,
                    ...fieldsetWithTitle
                }
            } }) } />);
            wrapper.find(`div.${config.defaultCardHeaderClass}`).simulate('click');
            expect(wrapper.find('div.collapse').hasClass('show')).toEqual(false);
            expect(wrapper.find(`div.${config.defaultCardHeaderActionsClass} i.${config.defaultIconDownClass}`).exists())
                .toEqual(true);

        });

        it('don\'t hide fieldset body when "collapsible" is false and don\'t show header actions', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: {
                fieldset: {
                    collapsible: false,
                    ...fieldsetWithTitle
                }
            } }) } />);
            wrapper.find(`div.${config.defaultCardHeaderClass}`).simulate('click');
            expect(wrapper.find('div.collapse').hasClass('show')).toEqual(true);
            expect(wrapper.find(`div.${config.defaultCardHeaderActionsClass}`).exists()).toEqual(false);
        });

        it('show fieldset body when "collapsible" is true and "collapsed" is true', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: {
                fieldset: {
                    collapsible: true,
                    collapsed: true,
                    ...fieldsetWithTitle
                }
            } }) } />);
            wrapper.find(`div.${config.defaultCardHeaderClass}`).simulate('click');
            expect(wrapper.find('div.collapse').hasClass('show')).toEqual(true);
            expect(wrapper.find(`div.${config.defaultCardHeaderActionsClass} i.${config.defaultIconUpClass}`).exists())
                .toEqual(true);
        });
    })

    it('adds card body class to fieldset body', () => {
        const withCardBodyClass = {
            fieldset: { cardBodyClass: config.cardBodyClass, ...container }
        };
        const wrapper = mount(<Form { ...prepareForm({ elements: withCardBodyClass }) } />);
        expect(wrapper.find(`div.${config.cardBodyClass}`).exists()).toEqual(true);
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
