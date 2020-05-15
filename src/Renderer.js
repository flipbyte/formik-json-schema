import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import withFormConfig from './withFormConfig';
import { containers, fields, templates, FIELD } from './registry';
import when from '@flipbyte/when-condition';
import ErrorManager from './ErrorManager';

/**
 * Render the element based on it's type and renderer
 * and pass all the props received to the newly created element.
 *
 * @param  {object} props
 * @return {Component}
 */
const renderElement = ({ config, formik, value, error }) => {
    const { type, renderer, wrapAs, ...rest } = config;
    const registry = type === FIELD ? fields : containers;
    const Renderer = typeof renderer === 'string' ? registry.get(renderer) : renderer;

    return <Renderer config={{ type, ...rest }} formik={ formik } value={ value } error={ error } />
}

/**
 * Generic element renderer component that renders based on the type and renderer of the element
 * It decides which renderer to use for fields, containers and templates and renders them accordingly
 *
 * @param {object} config
 * @param {string} error
 * @param {object} validationSchema
 * @param {object} formik
 * @param {object} rest
 */
const ElementRenderer = ({
    config,
    validationSchema,
    formik,
    ...rest
}) => {
    const {
        type,
        name,
        showWhen,
        enabledWhen,
        template
    } = config;
    const { values } = useFormikContext();
    const [ canShow, setCanShow ] = useState(showWhen ? false : true);
    const [ disabled, setDisabled ] = useState(enabledWhen ? true : false);

    /**
     * If the template is function, assuming it is a react component, use it
     * Otherwise, consider it a string and try to fetch it, or the default component from the template registry
     */
    const Template = typeof template === 'function'
        ? template
        : templates.get(template || 'default');

    /**
     * When the values have changed process conditions on fields,
     * to decide whether to show and/or enable them or not.
     */
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
            ? (
                <Field name={ name }>
                    {({ field: { value }}) => (
                        <ErrorManager name={ name }>
                            {(error) => (
                                <Template disabled={ disabled } error={ error } { ...config }>
                                    { renderElement({ config, formik, value, error }) }
                                </Template>
                            )}
                        </ErrorManager>
                    )}
                </Field>
            ) 
            : renderElement({ config, formik })
    );
}

export default withFormConfig(ElementRenderer);
