import _ from 'lodash';
import Label from './Label';
import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames, setFieldValueWrapper } from '../utils';
import theme from '../css/autocomplete.css';

class Autocomplete extends Component {
    constructor(props) {
        super(props);

        const { initialSuggestions = [] } = this.props;
        this.state = { suggestions: initialSuggestions };
        this.initOptions();
    }

    initOptions() {
        this.autosuggestCallbackKeys = [
            'onSuggestionsFetchRequested',
            'onSuggestionsClearRequested',
            'getSuggestionValue',
            'renderSuggestion',
            'onSuggestionSelected',
            'onSuggestionHighlighted',
            'shouldRenderSuggestions',
            'renderSectionTitle',
            'getSectionSuggestions',
            'renderInputComponent',
            'renderSuggestionsContainer'
        ];
        this.prepareCallbacks();
        this.autosuggestOptions = _.assign({ inputProps: {} }, this.props.config.options, this.callbacks);
        this.inputClassName = this.autosuggestOptions.inputProps.className || 'react-autosuggest__input';
    }

    prepareCallbacks() {
        const { formikProps, config } = this.props;
        const stateUpdater = this.setState.bind(this);

        this.callbacks = _.reduce(this.autosuggestCallbackKeys, ( callbacks, key ) => {
            if(_.isFunction(config.options[key])) {
                callbacks[key] = config.options[key].bind(this, formikProps, config, { stateUpdater });
            }

            return callbacks;
        }, {});
    }

    render() {
        const { config, formikProps, submitCountToValidate } = this.props;
        const {
            name,
            label,
            type,
            attributes,
            defaultValue,
            options = {},
            labelClass = '',
            fieldClass = 'form-control',
            formGroupClass = 'form-group',
        } = config;
        const { values, setFieldValue, handleChange, handleBlur } = formikProps;
        const error = hasError(name, submitCountToValidate, formikProps);
        const value = _.get(values, name, '');

        this.autosuggestOptions.inputProps.value = value;
        this.autosuggestOptions.inputProps.onChange = ( event, { newValue, method } ) =>
            changeHandler(setFieldValueWrapper(setFieldValue, name), formikProps, config, newValue);
        this.autosuggestOptions.inputProps.className = this.inputClassName + ( error ? ' is-invalid ' : '' )

        return (
            <div className={ formGroupClass }>
                <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
                <Autosuggest suggestions={ this.state.suggestions} { ...this.autosuggestOptions } />
                <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
            </div>
        );
    }
}

export default Autocomplete;
