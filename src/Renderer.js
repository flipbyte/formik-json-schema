import _ from 'lodash';
import { connect, FastField } from 'formik';
import React, { Component } from 'react';
import withFormConfig from './withFormConfig';
import { containers, fields, FIELD } from './registry';
import Rules from '@flipbyte/yup-schema';
import when from '@flipbyte/when-condition';

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
        const {
            config: { condition },
            formik: { values }
        } = this.props;

        if(condition) return when(condition, values);
        return true;
    }

    render() {
        const { config, error, validationSchema, formik, ...rest } = this.props;
        return config.type === FIELD
            ? <FastField
                name={ config.name }
                render={({ field: { value } }) => {
                    return this.renderElement({ config, formik, value, error })
                }} />
            : this.renderElement({ config, formik });
    }
}

export default withFormConfig(ElementRenderer);
