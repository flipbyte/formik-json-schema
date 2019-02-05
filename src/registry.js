import React, { Component } from 'react';

const CONTAINER = 'container';
const FIELD = 'field';

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

const containerRegistry = new Registry();
export const registerContainer = containerRegistry.register.bind(containerRegistry);

export const render = ( config, formik, submitCountToValidate, rest ) => {
    let currentRegistry = containerRegistry;
    if( config.type ==  FIELD ) {
        currentRegistry = fieldRegistry;
    }

    let Renderer = config.renderer;
    if(typeof config.renderer == 'string') {
        Renderer = currentRegistry.get(config.renderer);
    }

    return <Renderer
        config={ config }
        formik={ formik }
        submitCountToValidate={ submitCountToValidate }
        { ...rest } />
}

export default Registry;
