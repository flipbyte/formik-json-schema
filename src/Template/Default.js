import React, { Fragment } from 'react';
import Label from '../Field/Label';
import ErrorMessage from '../Field/ErrorMessage';

const styles = ( disabled ) => disabled ? { pointerEvents: 'none', opacity: 0.6 } : {};

const Default = ({
    disabled = false,
    name,
    label,
    comment,
    error,
    labelClass = '',
    wrapAs = 'div',
    htmlClass = 'form-group',
    commentClass = 'text-muted',
    children
}) => {
    const Component = !wrapAs ? Fragment : wrapAs;
    const componentProps = !wrapAs ? {} : {
        className: htmlClass,
        style: styles(disabled)
    };

    return (
        <Component { ...componentProps }>
            { label && <Label htmlFor={ name } className={ labelClass }>{ label }</Label> }
            { children }
            { comment && <small className={ commentClass }>{ comment }</small> }
            <ErrorMessage name={ name } error={ error } />
        </Component>
    );
};

export default Default;
