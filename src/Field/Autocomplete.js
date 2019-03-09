import _ from 'lodash';
import Label from './Label';
import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import { changeHandler, joinNames, setFieldValueWrapper } from '../utils';
// import '../css/autocomplete.css';

class Autocomplete extends Component {
    static autosuggestCallbackKeys = [
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
    ]

    constructor(props) {
        super(props);

        const { initialSuggestions = [] } = this.props;
        this.state = { suggestions: initialSuggestions };
        this.initOptions();
    }

    initOptions() {
        this.prepareCallbacks();
        this.autosuggestOptions = _.assign({ inputProps: {} }, this.props.config.options, this.callbacks);
        this.inputClassName = this.autosuggestOptions.inputProps.className || 'react-autosuggest__input';
    }

    prepareCallbacks() {
        const { formik, config } = this.props;
        const stateUpdater = this.setState.bind(this);

        this.callbacks = _.reduce(Autocomplete.autosuggestCallbackKeys, ( callbacks, key ) => {
            if(_.isFunction(config.options[key])) {
                callbacks[key] = config.options[key].bind(this, formik, config, { stateUpdater });
            }

            return callbacks;
        }, {});
    }

    render() {
        const { config, formik, error, value } = this.props;
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
        const { setFieldValue, handleBlur } = formik;

        this.autosuggestOptions.inputProps.name = name;
        this.autosuggestOptions.inputProps.value = value || '';
        this.autosuggestOptions.inputProps.onChange = ( event, { newValue, method } ) =>
            changeHandler(setFieldValueWrapper(setFieldValue, name), formik, config, newValue);
        this.autosuggestOptions.inputProps.onBlur = handleBlur.bind(this);
        this.autosuggestOptions.inputProps.className = this.inputClassName + ( error ? ' is-invalid ' : '' )

        return (
            <div className={ formGroupClass }>
                <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
                <Autosuggest suggestions={ this.state.suggestions} { ...this.autosuggestOptions } />
                <ErrorMessage name={ name } />
            </div>
        );
    }
}

export default React.memo(Autocomplete);
