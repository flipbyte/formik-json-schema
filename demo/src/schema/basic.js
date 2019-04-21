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
                label: "Telephone (visible if email is empty)",
                type: "field",
                renderer: "text",
                fieldType: "telephone",
                // showWhen: ['or', ['is', 'email', undefined], ['is', 'email', '']],
                enabledWhen: ['or', ['is', 'email', undefined], ['is', 'email', '']],
            },
            message: {
                name: "message",
                label: "Message",
                type: "field",
                renderer: "textarea",
                validation: [
                    ['string'],
                    ['required']
                ]
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
