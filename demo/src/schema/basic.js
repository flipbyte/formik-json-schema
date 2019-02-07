import { save } from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {},
    schema: {
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
                fieldType: "text",
                validation: "required|min:3"
            },
            email: {
                name: "email",
                label: "Email",
                type: "field",
                renderer: "text",
                fieldType: "text",
                validation: "required|email"
            },
            telephone: {
                name: "telephone",
                label: "Telephone",
                type: "field",
                renderer: "text",
                fieldType: "telephone",
                validation: "regex:/^\\d{3}-\\d{3}-\\d{4}$/"
            },
            message: {
                name: "message",
                label: "Message",
                type: "field",
                renderer: "textarea",
                validation: "required"
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
