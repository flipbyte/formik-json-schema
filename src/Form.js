import React from 'react';
import { Formik } from 'formik';
import messages from './messages';
import Element from './Element';
import { SchemaProvider } from './withFormConfig';
import { prepareValidationSchema } from './utils';

const Validator = require('validatorjs');

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
    }

    getContextValue() {
        let validationSchema = prepareValidationSchema(this.props.schema) || {};
        this.validator = new Validator(validationSchema, messages)

        // let conditionalSchema = prepareConditionalSchema(schema) || {};
        return {
            validationSchema,
            validator: this.validator,
            schema: this.props.schema
        }
    }

    validate(values) {
        if(!this.validator.fails(values)) {
            return {};
        }

        return this.validator.errors.all();
    }

    render() {
        const {
            schema,
            initialValues = {},
            ...rest
        } = this.props;

        return (
            <SchemaProvider value={ this.getContextValue() }>
                <Formik
                    { ...rest }
                    initialValues={ initialValues }
                    validate={ this.validate }
                    render={ props => <Element config={ schema } /> } />
            </SchemaProvider>
        )
    }
}

export default Form;
