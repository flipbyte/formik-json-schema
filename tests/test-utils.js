import expect from 'expect'

export const checkConsoleError = () => {
    expect.spyOn(console, 'error').andCall(msg => {
        console.error.threw = true;
        // console.log(msg);
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

export const prepareElement = ( type, renderer, props ) => ({ type, renderer, ...props });
export const prepareContainer = ( renderer, props = {} ) => prepareElement('container', renderer, props);
export const prepareField = ( renderer, props = {} ) => prepareElement('field', renderer, props);
