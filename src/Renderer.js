import _ from 'lodash';
import { connect, Field } from 'formik';
import React, { Component } from 'react';
import withFormConfig from './withFormConfig';
import { containers, fields } from './registry';

const FIELD = 'field';

const validate = ( validationSchema, config, values, value ) => {
    console.log(config.name);
    // let result = await validationSchema.validateAt(config.name);
    // if (result instanceof Error) {
    //     throw result.message
    // }
    //
    // return true;


    // console.log(config.name, values)
    // return validationSchema.validateAt(config.name, values).catch(err => {
    //     throw err.message
    // })
    // if(_.isFunction(config.validation)) {
    //     return config.validation(value, config);
    // }
    //
    // if(config.validation) {
    //     validator.single(value, config.validation)
    //     return validator.errors.first(config.name);
    // }
    //
    // return ''
}

const ElementRenderer = ({ config, formik, validationSchema, submitCountToValidate, ...rest }) => {
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
            validate={ validate.bind(this, validationSchema, config, formik.values) } />
        : makeRendererComponent();
}

export default connect(withFormConfig(ElementRenderer));
