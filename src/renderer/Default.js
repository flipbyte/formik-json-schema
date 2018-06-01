import React, { Component } from 'react';

import { registerRenderer } from '../registry';
import { Form, Field } from './Element';

const Default = ({ schema, formikProps }) => {
    const { title, fields } = schema;

    return (
        <Form formikProps={ formikProps }>
            <button type="submit" className="btn btn-primary">Save</button>
            <div className="card">
                <div className="card-block">
                    { Object.keys(fields).map( (key) =>
                        <Field key={ key } config={ fields[key] } formikProps={ formikProps } />)
                    }
                </div>
            </div>
        </Form>
    );
}

registerRenderer('default', ( schema ) => ( formikProps ) =>
    <Default schema={ schema } formikProps={ formikProps } />
);
