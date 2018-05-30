import React, { Component } from 'react';
import { createField, registerRenderer } from '../registry';

// export const getRendererOption = ( schema, name, defaultValue ) => (
//     schema && schema.form && schema.form.rendererOptions && schema.form.rendererOptions[name] || defaultValue
// );

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

const Default = ({ schema, formikProps }) => {
    const { title, fields } = schema;

    return (
        <form className="form-horizontal" onSubmit={ formikProps.handleSubmit }>
            <div className="card">
                <div className="card-header"><strong>{ title }</strong></div>
                <div className="card-block">
                    { Object.keys(fields).map( (key) =>
                        <Field key={ key } config={ fields[key] } formikProps={ formikProps } />)
                    }
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </div>
        </form>
    );
}
registerRenderer('default', ( schema ) => ( formikProps ) =>
    <Default schema={ schema } formikProps={ formikProps} />
);
