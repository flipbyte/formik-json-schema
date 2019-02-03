import { save } from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {},
    schema: {
        validation: {
            name: "required|min:3",
            email: "required|email",
            telephone: "regex:/^\\d{3}-\\d{3}-\\d{4}$/",
            message: "required"
        },
        form: {
            id: "basic",
            label: "Basic",
            type: "container",
            renderer: "form",
            elements: {
                name: {
                    name: "name",
                    label: "Name",
                    type: "field",
                    renderer: "text",
                    fieldType: "text"
                },
                email: {
                    name: "email",
                    label: "Email",
                    type: "field",
                    renderer: "text",
                    fieldType: "text"
                },
                telephone: {
                    name: "telephone",
                    label: "Telephone",
                    type: "field",
                    renderer: "text",
                    fieldType: "telephone"
                },
                message: {
                    name: "message",
                    label: "Message",
                    type: "field",
                    renderer: "textarea",
                },
                save: {
                    type: "field",
                    renderer: "button",
                    name: "save",
                    label: "Save",
                    fieldClass: "btn-success float-right",
                    buttonType: "submit"
                }
            }
        }
    }
}
