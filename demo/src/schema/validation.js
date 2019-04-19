import {
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
} from '../source/autocomplete';

import { save } from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {
        radio: 1
    },
    schema: {
        id: "validation",
        label: "Validation",
        type: "container",
        renderer: "form",
        elements: {
            text: {
                name: "text",
                label: "Text (First character alphabet and the rest alpha or integer)",
                type: "field",
                renderer: "text",
                fieldType: "text",
                validation: [['string'], ['required']]
            },
            url: {
                name: "url",
                label: "Url (Required and needs to be a valid URL)",
                type: "field",
                renderer: "text",
                fieldType: "text",
                validation: [['string'], ['required'], ['url']]
            },
            autocomplete: {
                name: "autocomplete",
                label: "Autocomplete (Required if text is empty)",
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
                },
                validation: [['string'], ['when', 'text', {
                    is: undefined,
                    then: [['string'], ['required'], ['min', 2]]
                }]]
            },
            reactSelect: {
                type: "field",
                renderer: "react-select",
                name: "react-select",
                label: "React Select",
                options: [
                    {
                        value: 0,
                        label: "No"
                    },
                    {
                        value: 1,
                        label: "Yes"
                    }
                ],
                formGroupClass: "form-group mb-4",
                validation: [['boolean'], ['required']]
            },
            submit: {
                content: "Submit",
                type: "field",
                renderer: "button",
                buttonType: "submit",
                fieldClass: "btn-success"
            }
        }
    }
}
