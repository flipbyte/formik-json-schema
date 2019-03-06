import _ from 'lodash';
import React from 'react';
import { Formik } from 'formik';
import messages from './messages';
import Element from './Element';
import { SchemaProvider } from './withFormConfig';
import { prepareValidationSchema } from './utils';
import Rules from '@flipbyte/yup-schema';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.initValidationSchema();
    }

    initValidationSchema() {
        const validationSchema = prepareValidationSchema(this.props.schema);
        this.validationSchema = !_.isEmpty(validationSchema)
            ? new Rules([[ 'object', validationSchema ]]).toYup()
            : null;
    }

    getContextValue() {
        return {
            validationSchema: this.validationSchema,
            schema: this.props.schema
        }
    }

    render() {
        const {
            schema,
            initialValues = {},
            ...rest
        } = this.props;

        const formProps = { ...rest, initialValues };
        if(null !== this.validationSchema) {
            formProps.validationSchema = this.validationSchema;
        }

        return (
            <SchemaProvider value={ this.getContextValue() }>
                <Formik
                    { ...formProps }
                    render={ props =>
                        <Element config={ schema } />
                    } />
            </SchemaProvider>
        )
    }
}

export default Form;
