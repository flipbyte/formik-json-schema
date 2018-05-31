import React, { Component } from 'react';

import { registerRenderer } from '../registry';
import { Form, Field } from './Element';

const Tabs = ({ schema, formikProps }) => {
    const { title, fields } = schema;

    return (
        <Form formikProps={ formikProps }>
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
        </Form>
    );
}

registerRenderer('default', ( schema ) => ( formikProps ) =>
    <Tabs schema={ schema } formikProps={ formikProps } />
);
