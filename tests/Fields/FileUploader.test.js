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

describe('FileUploader', () => {
    const config = {
        name: "fileUploader",
        label: "File Uploader",
        options: {
            accept: ['image/*', 'text/*'],
            multiple: true,
            onDrop: (formik, config, acceptedFiles) => {
                console.log(formik, config, acceptedFiles);
            }
        }
    };

    const fileUploader = prepareField('file-uploader', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: { fileUploader } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });
})
