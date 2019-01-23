import expect from 'expect'

export const checkConsoleError = () => {
    expect.spyOn(console, 'error').andCall(msg => {
        console.error.threw = true
    })

    console.error.threw = false;
}

export const restoreConsoleError = () => console.error.restore();

export const prepareForm = ({
    elements = {},
    initialValues = {},
    validation = {},
    customFormSchema
}) => {
    const formWrapperSchema = customFormSchema || {
        id: "my-form",
        label: "My Form",
        type: "container",
        renderer: "form",
        elements: elements
    };

    return {
        initialValues,
        schema: {
            validation,
            form: formWrapperSchema
        }
    }
}
