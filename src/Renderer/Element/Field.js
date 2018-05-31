import React, { Component } from 'react';
import { createField } from '../../registry';

const Field = ({ config, formikProps }) => {
    const { name, label, comment } = config;

    return (
        <div key={ name } className="row form-group">
            <div className="col-md-3"><label htmlFor={ name }>{ label }</label></div>
            <div className="col-12 col-md-9">
                { createField(config, formikProps) }
                { comment && (<small className="help-block form-text text-muted">{ comment }</small>) }
            </div>
        </div>
    );
}

export default Field;
