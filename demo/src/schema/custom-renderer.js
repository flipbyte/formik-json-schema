import CustomText from '../components/CustomText';

export default {
    initialValues: {},
    schema: {
        form: {
            id: "custom-renderer",
            label: "Custom Renderer",
            type: "container",
            renderer: "form",
            elements: {
                customField: {
                    name: "customField",
                    label: "Custom text field",
                    type: "field",
                    renderer: CustomText,
                    fieldType: "text"
                }
            }
        }
    }
}
