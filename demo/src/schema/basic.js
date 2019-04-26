import {
    save
} from '../source/external-handlers';

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
                validation: [
                    ['string'],
                    ['required'],
                    ['min', 3]
                ]
            },
            email: {
                name: "email",
                label: "Email",
                type: "field",
                renderer: "text",
                fieldType: "text",
                validation: [
                    ['string'],
                    ['required'],
                    ['email']
                ]
            },
            telephone: {
                name: "telephone",
                label: "Telephone (enabled if email is empty)",
                type: "field",
                renderer: "text",
                fieldType: "telephone",
                enabledWhen: ['or', ['isOfType', 'email', 'undefined'], ['is', 'email', '']],
            },
            message: {
                name: "message",
                label: "Message (visible if name is not empty)",
                type: "field",
                renderer: "textarea",
                validation: [
                    ['string'],
                    ['required']
                ],
                showWhen: ['not', ['or', ['is', 'name', ''], ['isOfType', 'name', 'undefined']]],
            },
            save: {
                type: "field",
                renderer: "button",
                content: "Save",
                fieldClass: "btn-success float-right",
                buttonType: "submit"
            }
        }
    }
}
