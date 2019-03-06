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

describe('Wysiwyg', () => {
    const config = {
        name: 'wysiwyg',
        label: 'Wysiwyg',
        htmlClass: "flutter-wysiwyg-size-3",
        attributes: {
            style: {
                height: 200
            }
        }
    };

    const options = {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']
            ],
            clipboard: {
                matchVisual: false,
            },
        },
        formats: [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
        ]
    };

    const wysiwyg = prepareField('wysiwyg', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            wysiwyg: wysiwyg
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders with custom toolbar options', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            wysiwyg: {
                ...wysiwyg,
                options
            }
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
