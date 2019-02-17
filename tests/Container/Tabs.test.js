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

describe('Tabs', () => {
    const containerKey = 'tabs';
    const config = {
        containerName: 'testFieldset',
        fieldName: 'testField',
        title: 'Test Fieldset Title',
        cardClass: 'test-card',
        cardBodyClass: 'test-card-body',
        rowClass: 'test-row',
        tabListClass: 'test-list-group',
        tabListItemClass: 'test-list-group-item-action',
        defaultTabListItemClass: 'list-group-item',
        tabContentClass: 'test-tab-content',
        tabColumnClass: 'test-tabs-column',
        contentColumnClass: 'test-content-column',
        tabActiveClass: 'test-active',
        defaultTabActiveClass: 'active',
        tabPaneClass: 'test-tab-pane',
        defaultTabPaneClass: 'tab-pane'
    };
    const container = prepareContainer('tabs');
    const field = prepareField('text', {
        name: config.fieldName,
        label: "Text",
        fieldType: "text",
    });
    const withTabs = { [containerKey]: {
        elements: {
            tab1: {
                label: "Tab 1",
                elements: {
                    text: field
                }
            },
            tab2: {
                label: "Tab 2",
                elements: {
                    text: field
                },
                active: true
            }
        },
        ...container
    }}
    const withNoTabs = { [containerKey]: { ...container } };

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: withTabs }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    // it('throws error when "elements" is not defined', () => {
    //     const wrapper = mount(<Form { ...prepareForm({ elements: withNoTabs }) } />);
    //     expect(console.error.threw).toEqual(true);
    // });

    context('custom html classes for tab html elements', function() {
        const tabs = {
            elements: {
                tab1: {
                    label: "Tab 1",
                    elements: {
                        text: field
                    }
                }
            },
            ...container
        }

        it('adds card class to card', () => {
            const withCardClass = { [containerKey]: { cardClass: config.cardClass, ...container } };
            const wrapper = mount(<Form { ...prepareForm({ elements: withCardClass }) } />);
            expect(wrapper.find('div').first().props().className).toEqual(config.cardClass);
        });

        it('adds card body class to card body', () => {
            const withCardBodyClass = {
                [containerKey]: { cardBodyClass: config.cardBodyClass, ...container }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withCardBodyClass }) } />);
            expect(wrapper.find(`div.${config.cardBodyClass}`).exists()).toEqual(true);
        });

        it('adds html class to direct child div of card body', () => {
            const withRowClass = {
                [containerKey]: { rowClass: config.rowClass, ...container }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withRowClass }) } />);
            expect(wrapper.find(`div.${config.rowClass}`).exists()).toEqual(true);
        });

        it('adds html class to column inside row that holds the tabs list', () => {
            const withTabColumnClass = {
                [containerKey]: { tabColumnClass: config.tabColumnClass, ...container }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabColumnClass }) } />);
            expect(wrapper.find(`div.${config.tabColumnClass}`).exists()).toEqual(true);
        });

        it('adds html class to html list elements that holds the list of tabs', () => {
            const withTabListClass = {
                [containerKey]: { tabListClass: config.tabListClass, ...container }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabListClass }) } />);
            expect(wrapper.find(`ul.${config.tabListClass}`).exists()).toEqual(true);
        });

        it('adds html class to each list item', () => {
            const withTabListItemClass = {
                [containerKey]: {
                    tabListItemClass: config.tabListItemClass,
                    ...tabs
                }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabListItemClass }) } />);
            expect(wrapper.find(`li.${config.tabListItemClass}`).exists()).toEqual(true);
        });

        it('adds html class to each tab content item', () => {
            const withTabContentClass = {
                [containerKey]: {
                    tabContentClass: config.tabContentClass,
                    ...tabs
                }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabContentClass }) } />);
            expect(wrapper.find(`div.${config.tabContentClass}`).exists()).toEqual(true);
        });

        it('adds html class to each tab pane', () => {
            const withTabPaneClass = {
                [containerKey]: {
                    tabPaneClass: config.tabPaneClass,
                    ...tabs
                }
            };
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabPaneClass }) } />);
            expect(wrapper.find(`div.${config.tabPaneClass}`).exists()).toEqual(true);
        });
    })

    context('tab state', function() {
        it('make second tab (index: 1) active by default', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabs }) } />);
            expect(wrapper.find(`li.${config.defaultTabListItemClass}`).at(1).hasClass(config.defaultTabActiveClass))
                .toEqual(true);
            expect(wrapper.find(`div.${config.defaultTabPaneClass}`).at(1).hasClass(config.defaultTabActiveClass))
                .toEqual(true);
        });

        it('make first tab (index: 0) active on click', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabs }) } />);
            wrapper.find(`li.${config.defaultTabListItemClass}`).at(0).simulate('click');
            expect(wrapper.find(`li.${config.defaultTabListItemClass}`).at(0).hasClass(config.defaultTabActiveClass))
                .toEqual(true);
            expect(wrapper.find(`div.${config.defaultTabPaneClass}`).at(0).hasClass(config.defaultTabActiveClass))
                .toEqual(true);
        });

        it('make second tab (index: 1) inactive on first tab (index: 0) click', () => {
            const wrapper = mount(<Form { ...prepareForm({ elements: withTabs }) } />);
            wrapper.find(`li.${config.defaultTabListItemClass}`).at(0).simulate('click');
            expect(wrapper.find(`li.${config.defaultTabListItemClass}`).at(1).hasClass(config.defaultTabActiveClass))
                .toEqual(false);
            expect(wrapper.find(`div.${config.defaultTabPaneClass}`).at(1).hasClass(config.defaultTabActiveClass))
                .toEqual(false);
        });
    })

    context('prefixNameToElement', function() {
        const tabs = {
            elements: {
                tab1: {
                    label: "Tab 1",
                    elements: {
                        text: field
                    }
                }
            },
            ...container
        }

        it('prefix name to direct child element when "prefixNameToElement" is true and "name" is set', () => {
            const withNameAsPrefixForChildren = { [containerKey]: {
                name: config.containerName,
                prefixNameToElement: true,
                ...tabs
            }};
            const { containerName, fieldName } = config;
            const wrapper = mount(<Form { ...prepareForm({ elements: withNameAsPrefixForChildren }) } />);
            expect(wrapper.find('input').props().name).toEqual(`${containerName}.${fieldName}`);
        });

        it('uses only field name when "prefixNameToElement" is true and "name" is not defined', () => {
            const prefixWithoutName = { [containerKey]: {
                prefixNameToElement: true,
                ...tabs
            }};
            const { fieldName } = config;
            const wrapper = mount(<Form { ...prepareForm({ elements: prefixWithoutName }) } />);
            expect(wrapper.find('input').props().name).toEqual(fieldName);
        });
    })
})
