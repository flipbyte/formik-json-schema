import {
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
} from '../source/autocomplete';

import { asyncFill } from '../source/external-handlers';

export default {
    initialValues: {
        valueWithoutAField: 1
    },
    schema: {
        id: "async",
        label: "Async",
        type: "container",
        renderer: "form",
        elements: {
            asyncFill: {
                type: "field",
                renderer: "button",
                name: "button",
                content: "Async fill",
                fieldClass: "btn-danger float-right",
                buttonType: "button",
                onClick: asyncFill
            },
            text: {
                name: "text1",
                label: "Text",
                type: "field",
                renderer: "text",
                fieldType: "text"
            },
            autocomplete: {
                name: "autocomplete",
                label: "Autocomplete",
                type: "field",
                renderer: "autocomplete",
                position: 10,
                initialSuggestions: [],
                options: {
                    onSuggestionsFetchRequested: onSuggestionsFetchRequested,
                    onSuggestionsClearRequested: onSuggestionsClearRequested,
                    getSuggestionValue: getSuggestionValue,
                    renderSuggestion: renderSuggestion,
                    inputProps: {}
                }
            }
        }
    }
}
