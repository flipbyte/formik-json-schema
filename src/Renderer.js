import React from 'react';
import { Field } from 'formik';
import { match } from './utils';
import Rules from '@flipbyte/yup-schema';
import FieldTemplate from './FieldTemplate';
import withFormConfig from './withFormConfig';
import { containers, fields, FIELD } from './registry';

const renderElement = ( props ) => {
    const {
        config: { type, renderer }
    } = props;
    const registry = type === FIELD ? fields : containers;
    const Renderer = typeof renderer === 'string' ? registry.get(renderer) : renderer;

    return <Renderer { ...props } />
}

const ElementRenderer = ({
    config,
    error,
    validationSchema,
    formik,
    ...rest
}) => {
    const {
        type,
        name,
        showWhen,
        enabledWhen,
        template: Template = FieldTemplate,
    } = config;
    const { values } = formik;

    return !!type && match(showWhen, values) && (
        type === FIELD
            ? <Field name={ name } render={({ field: { value }}) => (
                <Template disabled={ !match(enabledWhen, values) } { ...config }>
                    { renderElement({ config, formik, value, error }) }
                </Template>
            )} />
            : renderElement({ config, formik })
    );
}

export default withFormConfig(ElementRenderer);
