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
        configSource: (formik, config) => {
            return new Promise((resolve, reject) => {
                fetch('http://google.com') // Call the fetch function passing the url of the API as a parameter
                    .then(function(data) {
                        // Your code for handling the data you get from the API
                        console.log(data);
                        resolve();
                    })
                    .catch(function() {
                        // This is where you run code if the server returns any errors
                    })
            })
        },
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
