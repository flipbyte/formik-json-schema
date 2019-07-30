import _ from 'lodash';
import React, { useEffect, useCallback, useState } from 'react';
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
    }, [ formik.values ]);

    return <Element config={ schema } />;
};

const Form = React.forwardRef(({ schema, onUpdate = () => {}, initialValues = {}, ...rest }, ref) => {
    const [ validationSchema, setValidationSchema ] = useState(null);
    const initValidationSchema = useCallback(() => {
        const yupSchema = prepareValidationSchema(schema);
        const validationSchema = !_.isEmpty(yupSchema) ? new Rules([[ 'object', yupSchema ]]).toYup() : null;
        setValidationSchema(validationSchema);
    }, [ schema ]);

    useEffect(() => {
        initValidationSchema();
    }, [ schema ]);

    const formProps = { ...rest, initialValues };
    if (null !== validationSchema) {
        formProps.validationSchema = validationSchema;
    }

    return (
        <SchemaProvider value={{ validationSchema, schema }}>
            <Formik
                { ...formProps }
                ref={ ref }
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
});

export default Form;
