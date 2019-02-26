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
                ],
                condition: ['or', ['is', 'name', undefined], ['is', 'name', '']]
            },
            telephone: {
                name: "telephone",
                label: "Telephone",
                type: "field",
                renderer: "text",
                fieldType: "telephone",
                validation: [
                    ['string'],
                    ['matches', /^\d{3}-\d{3}-\d{4}$/],
                    ['when', 'email', {
                        is: undefined,
                        then: [['string'], ['required']]
                    }]
                ]
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
                name: "save",
                label: "Save",
                fieldClass: "btn-success float-right",
                buttonType: "submit"
            }
        }
    }
}
