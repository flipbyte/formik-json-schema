import React, { Component } from 'react';
import { Field } from 'formik';

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

export const fields = new Registry();
export const registerField = fields.register.bind(fields);

export const containers = new Registry();
export const registerContainer = containers.register.bind(containers);

export default Registry;
