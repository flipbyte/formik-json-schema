import _ from 'lodash';
import { connect, Field } from 'formik';
import React, { Component } from 'react';
import withFormConfig from './withFormConfig';
import { containers, fields } from './registry';
import Rules from '@flipbyte/yup-schema';
import when from '@flipbyte/when-condition';
import * as yup from 'yup';

const FIELD = 'field';

class ElementRenderer extends Component {
    constructor(props) {
        super(props);

        const { type, renderer } = this.props.config;
        this.renderer = this.getRenderer(
            type === FIELD ? fields : containers,
            renderer
        );
    }

    getRenderer(registry, renderer) {
        return typeof renderer === 'string' ? registry.get(renderer) : renderer;
    }

    renderElement(props) {
        const Renderer = this.renderer;
        return this.validateConditional() && <Renderer { ...props } />
    }

    validateConditional() {
        const { config, formik } = this.props;

        if(config.condition) {
            return when(config.condition, formik.values);
        }

        return true;
    }

    render() {
        const { config, value, error, validationSchema, formik, submitCountToValidate, ...rest } = this.props;
        const fieldProps = { error, submitCountToValidate, config, formik };

        const Renderer = this.renderer;
        return config.type === FIELD
            ? <Field
                name={ config.name }
                render={({ field: { value } }) => {
                    return this.renderElement({ ...fieldProps, value })
                }} />
            : this.renderElement({ config, formik });
    }
}

export default withFormConfig(ElementRenderer);
