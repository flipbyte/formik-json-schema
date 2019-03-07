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

describe('Autocomplete', () => {
    const config = {
        name: "autocomplete",
        label: "Autocomplete",
        position: 10,
        initialSuggestions: [],
        options: {
            onSuggestionsFetchRequested: onSuggestionsFetchRequested,
            onSuggestionsClearRequested: onSuggestionsClearRequested,
            getSuggestionValue: getSuggestionValue,
            renderSuggestion: renderSuggestion,
            inputProps: {}
        }
    };

    const autocomplete = prepareField('autocomplete', config);

    beforeEach(() => checkConsoleError())

    afterEach(() =>  restoreConsoleError())

    it('renders', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            autocomplete: autocomplete
        } }) } />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('shows suggestions on change and focus', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            autocomplete: autocomplete
        } }) } />);

        wrapper.find('.react-autosuggest__input').simulate('change', {
            target: { value: "Uni" }
        });

        wrapper.find('.react-autosuggest__input').prop('onFocus')()
        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toInclude('United States')
        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toInclude('United Kingdom')
    });

    it('clears suggestions', () => {
        const wrapper = mount(<Form { ...prepareForm({ elements: {
            autocomplete: autocomplete
        } }) } />);

        wrapper.find('.react-autosuggest__input').simulate('change', {
            target: { value: "Uni" }
        });
        wrapper.find('.react-autosuggest__input').prop('onFocus')();

        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toInclude('United States')
        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toInclude('United Kingdom')

        wrapper.find('.react-autosuggest__input').simulate('change', {
            target: { value: "" }
        });
        wrapper.find('.react-autosuggest__input').prop('onFocus')();

        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toNotInclude('United States')
        expect(wrapper.find('.react-autosuggest__suggestions-container').html()).toNotInclude('United Kingdom')
    });
})
