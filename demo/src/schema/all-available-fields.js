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
        form: {
            id: "all-available-fields",
            label: "All available fields",
            type: "container",
            renderer: "form",
            elements: {
                text: {
                    name: "text",
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
                    formGroupClass: "form-group mb-4"
                },
                textarea: {
                    name: "description",
                    label: "Description",
                    type: "field",
                    renderer: "textarea",
                },
                checkbox: {
                    name: "checkbox",
                    label: "Checkbox",
                    type: "field",
                    renderer: "checkbox",
                    labelClass: "mr-2 float-left",
                    fieldClass: "d-inline float-left"
                },
                radio: {
                    name: "radio",
                    label: "Radio",
                    type: "field",
                    renderer: "radio",
                    options: [{
                        value: 1,
                        title: "One"
                    }, {
                        value: 2,
                        title: "Two"
                    }, {
                        value: 3,
                        title: "Three"
                    }]
                },
                switch: {
                    name: "switch",
                    label: "Switch",
                    type: "field",
                    renderer: "switch",
                    dataOn: "Yes",
                    dataOff: "No"
                },
                wysiwyg: {
                    name: "wysiwyg",
                    label: "Wysiwyg",
                    type: "field",
                    renderer: "wysiwyg",
                    htmlClass: "flutter-wysiwyg-size-3",
                    attributes: {
                        style: {
                            height: 200
                        }
                    }
                },
                codeeditor: {
                    name: "codeeditor",
                    label: "Code Editor",
                    type: "field",
                    renderer: "code-editor",
                    formGroupClass: "mt-5",
                    fieldClass: "border",
                    options: {
                        mode: "xml",
                        lineNumbers: true
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
                            buttonType: "submit",
                        }
                    }
                }
            }
        }
    }
}
