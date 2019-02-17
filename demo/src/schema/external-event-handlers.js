import {
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
} from '../source/autocomplete';

import {
    alertTextOnChange,
    hideTextField,
    save,
    reset,
    unsetAutocomplete
} from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    onReset: reset.bind(this),
    initialValues: {
        valueWithoutAField: 1
    },
    schema: {
        id: "external-event-handlers",
        label: "External event handlers",
        type: "container",
        renderer: "form",
        elements: {
            reactSelect: {
                type: "field",
                renderer: "react-select",
                name: "react-select",
                label: "Hide textfield",
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
                onChange: hideTextField
            },
            text: {
                name: "text1",
                label: "Text",
                type: "field",
                renderer: "text",
                fieldType: "text",
                onChange: alertTextOnChange,
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
            },
            buttonsGroup: {
                type: "container",
                renderer: "button-group",
                buttonsContainerClass: "buttons-container mt-2",
                elements: {
                    save: {
                        type: "field",
                        renderer: "button",
                        name: "save",
                        label: "Save",
                        fieldClass: "btn-success float-right",
                        buttonType: "submit"
                    },
                    reset: {
                        type: "field",
                        renderer: "button",
                        name: "reset",
                        label: "Reset",
                        fieldClass: "btn-primary float-right",
                        buttonType: "reset",
                    },
                    unsetAutocomplete: {
                        type: "field",
                        renderer: "button",
                        name: "button",
                        label: "Unset autocomplete",
                        fieldClass: "btn-danger float-right",
                        buttonType: "reset",
                        onClick: unsetAutocomplete
                    }
                }
            }
        }
    }
}
