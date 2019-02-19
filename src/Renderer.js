import _ from 'lodash';
import { connect, Field } from 'formik';
import React, { Component } from 'react';
import withFormConfig from './withFormConfig';
import { containers, fields } from './registry';
import Rules from '@flipbyte/yup-schema';
import when from '@flipbyte/when-condition';

const FIELD = 'field';

class ElementRenderer extends Component {
    constructor(props) {
        super(props);
    }

    // Experimental - Needs thorough testing
    shouldComponentUpdate(nextProps) {
        return nextProps.formik !== this.props.formik
    }

    makeRendererComponent(props) {
        let currentRegistry = containers;
        if( props.config.type ===  FIELD ) {
            currentRegistry = fields;
        }

        let Renderer = props.config.renderer;
        if(typeof props.config.renderer === 'string') {
            Renderer = currentRegistry.get(props.config.renderer);
        }

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
        const { config, validationSchema, formik, ...rest } = this.props;

        return config.type === FIELD
            ? <Field
                name={ config.name }
                render={ ({ form: formik, field: formikField }) =>
                    this.makeRendererComponent({ ...rest, config, formik, formikField })
                } />
            : this.makeRendererComponent({ ...rest, config, formik });
    }
}

export default connect(withFormConfig(ElementRenderer));
