import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { match } from './utils';
import Rules from '@flipbyte/yup-schema';
import FieldTemplate from './FieldTemplate';
import withFormConfig from './withFormConfig';
import { containers, fields, FIELD } from './registry';
import when from '@flipbyte/when-condition';

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
    const [ canShow, setCanShow ] = useState(showWhen ? false : true);
    const [ disabled, setDisabled ] = useState(enabledWhen ? true : false);

    useEffect(() => {
        Promise.all([
            showWhen ? when(showWhen, values) : true,
            enabledWhen ? when(enabledWhen, values) : true
        ]).then(([ canShow, enabled ]) => {
            setCanShow(canShow);
            setDisabled(!enabled);
        })
    }, [ values ]);

    return !!type && canShow && (
        type === FIELD
            ? <Field name={ name } render={({ field: { value }}) => (
                <Template disabled={ disabled } { ...config }>
                    { renderElement({ config, formik, value, error }) }
                </Template>
            )} />
            : renderElement({ config, formik })
    );
}

export default withFormConfig(ElementRenderer);
