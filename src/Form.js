import React from 'react';
import { Formik } from 'formik';
import messages from './messages';
import Element from './Element';
import { prepareValidationSchema } from './utils';
const Validator = require('validatorjs');

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.validationSchema = prepareValidationSchema(this.props.schema) || {};
        this.validate = this.validate.bind(this);
    }

    validate(values) {
        let validation = new Validator(values, this.validationSchema, messages);
        if(!validation.fails()) {
            return {};
        }

        return validation.errors.all();
    }

    render() {
        const {
            schema,
            initialValues = {},
            ...rest
        } = this.props;

        return <Formik
            { ...rest }
            initialValues={ initialValues }
            validate={ this.validate }
            render={ props => <Element config={ schema } /> } />
    }
}

export default Form;
