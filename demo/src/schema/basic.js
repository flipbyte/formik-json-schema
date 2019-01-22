import { save } from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {},
    schema: {
        form: {
            id: "basic",
            label: "Basic",
            type: "container",
            renderer: "form",
            elements: {
                title: {
                    name: "title",
                    label: "Title",
                    type: "field",
                    renderer: "text",
                    fieldType: "text"
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
