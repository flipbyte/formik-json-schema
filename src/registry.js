import React, { Component } from 'react';

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
    return <Field config={ config } params={ formikProps } />;
}


const rendererRegistry = new Registry();
export const registerRenderer = rendererRegistry.register.bind(rendererRegistry);
export const renderForm = ( schema ) => ( formikProps ) => {
    const defaultRendererId = 'default';
    const rendererId = (schema.form && schema.form.renderer) || defaultRendererId;
    return rendererRegistry.get(rendererId)(schema)(formikProps);
};

export default Registry;
