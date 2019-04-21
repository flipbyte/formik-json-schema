import { autosave } from '../source/external-handlers';

export default {
    onUpdate: autosave.bind(this),
    initialValues: {},
    schema: {
        id: "autosave",
        label: "Autosave",
        type: "container",
        renderer: "form",
        elements: {
            title: {
                name: "title",
                label: "Title",
                type: "field",
                renderer: "text",
                fieldType: "text",
                validation: [
                    ['string'],
                    ['required'],
                    ['min', 3]
                ]
            },
            text: {
                name: "autosave_text",
                label: "Autosave text",
                type: "field",
                renderer: "wysiwyg",
                htmlClass: "flutter-wysiwyg-size-3",
                attributes: {
                    style: {
                        height: 200
                    }
                },
                validation: [
                    ['string'],
                    ['required'],
                    ['min', 3]
                ]
            }
        }
    }
}
