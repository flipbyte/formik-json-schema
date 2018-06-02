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

export const render = ( config, formikProps ) => {
    let currentRegistry = containerRegistry;
    if( config.type ==  FIELD ) {
        currentRegistry = fieldRegistry;
    }

    const Renderer = currentRegistry.get(config.renderer);
    return <Renderer config={ config } formikProps={ formikProps } />
}

export default Registry;
