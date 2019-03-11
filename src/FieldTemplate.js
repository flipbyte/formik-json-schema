import React from 'react';
import Label from './Field/Label';
import ErrorMessage from './Field/ErrorMessage';

const FieldTemplate = ({ name, label, labelClass, formGroupClass, children }) => {
    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            { children }
            <ErrorMessage name={ name } />
        </div>
    );
}

export default FieldTemplate;
