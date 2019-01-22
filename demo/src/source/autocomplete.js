import React from 'react';

const countries = [
    {
        label: 'United States',
        value: 'US'
    },
    {
        label: 'United Kingdom',
        value: 'UK'
    },
    {
        label: 'Germany',
        value: 'DE'
    },
    {
        label: 'Netherlands',
        value: 'NL'
    },
    {
        label: 'France',
        value: 'FR'
    },
    {
        label: 'Sweden',
        value: 'SE'
    },
];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : countries.filter(country =>
        country.label.toLowerCase().slice(0, inputLength) === inputValue
    );
};

export const getSuggestionValue = ( formikProps, config, extra, { label } ) => label;
export const renderSuggestion = ( formikProps, config, extra, { label } ) => <span>{ label }</span>;
export const onSuggestionsFetchRequested = ( formikProps, config, { stateUpdater }, { value } ) =>
    stateUpdater({ suggestions: getSuggestions(value) });

export const onSuggestionsClearRequested = ( formikProps, config, extra ) =>
    extra.stateUpdater({ suggestions: [] })
