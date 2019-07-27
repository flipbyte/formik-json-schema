import _ from 'lodash';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import messages from './messages';
import Element from './Element';
import { SchemaProvider } from './withFormConfig';
import { prepareValidationSchema } from './utils';
import Rules from '@flipbyte/yup-schema';

const FormikForm = ({ onUpdate, schema, ...formik }) => {
    // on form value(s) change
    useEffect(() => {
        if(typeof onUpdate === 'function') {
            onUpdate(formik);
        }
    }, [formik.values]);

    return <Element config={ schema } />;
};

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
            onUpdate = () => {},
            initialValues = {},
            ...rest
        } = this.props;

        const formProps = { ...rest, initialValues };
        if (null !== this.validationSchema) {
            formProps.validationSchema = this.validationSchema;
        }

        return (
            <SchemaProvider value={ this.getContextValue() }>
                <Formik
                    { ...formProps }
                    ref={formProps.innerRef}
                    render={(props) => (
                        <FormikForm
                            onUpdate={ onUpdate }
                            schema={ schema }
                            { ...props }
                        />
                    )}
                />
            </SchemaProvider>
        );
    }
}

export default React.forwardRef((props, ref) => <Form innerRef={ ref } { ...props } />);
