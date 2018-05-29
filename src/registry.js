class Registry {
    constructor() {
        this.mapping = {};
    }

    get(name) {
        const o = this.mapping[name];
        if (o == null) throw new Error('No object registered for: ' + name);
        return o;
    }

    register(name, o) {
        this.mapping[name] = o;
    }
}

const fieldRegistry = new Registry();
export const registerField = fieldRegistry.register.bind(fieldRegistry);
export const createField = ( config, formikProps ) => {
    const Field = fieldRegistry.get(config.type);
    return <Field config={ config } formikProps={ formikProps } />;
}


const rendererRegistry = new Registry();
export const registerRenderer = rendererRegistry.register.bind(rendererRegistry);
export const renderForm = ( schema ) => ( formikProps ) => {
    const defaultRenderer = 'default';
    const Renderer = (schema.form && schema.form.renderer) || defaultRenderer;
    return <Renderer schema={ schema } formikProps={ formikProps } />
};
