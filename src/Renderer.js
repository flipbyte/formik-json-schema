import _ from 'lodash';
import { connect, Field } from 'formik';
import React, { Component } from 'react';
import withFormConfig from './withFormConfig';
import { containers, fields } from './registry';

const FIELD = 'field';

const validate = ( validator, config, value ) => {
    if(_.isFunction(config.validation)) {
        return config.validation(value, config);
    }

    if(config.validation) {
        validator.single(value, config.validation)
        return validator.errors.first(config.name);
    }

    return ''
}

const ElementRenderer = ({ config, formik, validator, submitCountToValidate, ...rest }) => {
    let currentRegistry = containers;
    if( config.type ===  FIELD ) {
        currentRegistry = fields;
    }

    let Renderer = config.renderer;
    if(typeof config.renderer === 'string') {
        Renderer = currentRegistry.get(config.renderer);
    }

    const makeRendererComponent = () => <Renderer
        config={ config }
        formik={ formik }
        submitCountToValidate={ submitCountToValidate }
        { ...rest } />

    return config.type === FIELD
        ? <Field
            name={ config.name }
            render={ props => makeRendererComponent() }
            validate={ validate.bind(this, validator, config) } />
        : makeRendererComponent();
}

export default connect(withFormConfig(ElementRenderer));
