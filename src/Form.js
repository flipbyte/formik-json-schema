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
    }

    getContextValue() {
        this.validationSchema = new Rules([[
            'object',
            prepareValidationSchema(this.props.schema) || {}
        ]]).toYup();

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

        return (
            <SchemaProvider value={ this.getContextValue() }>
                <Formik
                    { ...rest }
                    initialValues={ initialValues }
                    validationSchema={ this.validationSchema }
                    render={ props =>
                        <Element config={ schema } />
                    } />
            </SchemaProvider>
        )
    }
}

export default Form;
