import {
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
} from '../source/autocomplete';

import {
    save
} from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {
        radio: 1
    },
    schema: {
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
                fieldType: "text",
                comment: "This is a field comment. You can add your text here."
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
                isCreatable: false,
                comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                options: [{
                    value: 0,
                    label: "No"
                }, {
                    value: 1,
                    label: "Yes"
                }],
                formGroupClass: "form-group mb-4"
            },
            reactSelectMulti: {
                type: "field",
                renderer: "react-select",
                name: "react-select-multi",
                label: "React Select Multi",
                isMulti: true,
                isCreatable: true,
                options: [{
                    value: 'chocolate',
                    label: 'Chocolate'
                }, {
                    value: 'strawberry',
                    label: 'Strawberry'
                }, {
                    value: 'vanilla',
                    label: 'Vanilla'
                }],
                formGroupClass: "form-group mb-4",
                validation: [['array'], ['of', [['string']]]]
            },
            reactSelectCreatableMulti: {
                type: "field",
                renderer: "react-select",
                name: "react-select-creatable-multi",
                label: "React Select Creatable Multi",
                isMulti: true,
                isCreatable: true,
                options: [],
                menuIsOpen: false,
                defaultValue: [],
                components: {
                    DropdownIndicator: null
                },
                formGroupClass: "form-group mb-4",
                validation: [['array'], ['of', [['string']]]]
            },
            textarea: {
                name: "description",
                label: "Description",
                type: "field",
                renderer: "textarea",
            },
            singleCheckbox: {
                name: "singleCheckbox",
                label: "Single option",
                type: "field",
                renderer: "checkbox",
                labelClass: "mr-2",
                fieldClass: "d-inline",
                options: [{
                    value: 'checkbox-1',
                    label: 'Checkbox 1'
                }],
                validation: [
                    ['bool'],
                    ['test', 'singleCheckbox.0', 'You have to select this value', value => value === true],
                    ['required', 'You have to select this value']
                ]
            },
            multiCheckbox: {
                name: "multiCheckbox",
                label: "Multiple options",
                type: "field",
                renderer: "checkbox",
                options: [{
                    value: 'checkbox-1',
                    label: 'Checkbox 1'
                }, {
                    value: 'checkbox-2',
                    label: 'Checkbox 2'
                }, {
                    value: 'checkbox-3',
                    label: 'Checkbox 3'
                }, {
                    value: 'checkbox-4',
                    label: 'Checkbox 4'
                }]
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
                renderer: "switch"
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
                },
                validation: [['string'], ['required'], ['min', 100]]
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
                },
                validation: [['string'], ['required'], ['min', 100]]
            },
            fileUploader: {
                name: "fileUploader",
                label: "File Uploader",
                type: "field",
                renderer: "file-uploader",
                options: {
                    accept: ['image/*', 'text/*'],
                    multiple: true,
                    onDrop: (formik, config, acceptedFiles) => {
                        console.log(formik, config, acceptedFiles);
                    }
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
                        content: "Save",
                        fieldClass: "btn-success float-right",
                        buttonType: "submit",
                    }
                }
            }
        }
    }
}
