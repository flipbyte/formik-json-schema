import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form } from '../../src';

const ExampleFormContainer = ({ title, className, formProps }) =>
    <div className={ "card " + className }>
        <div className="card-body">
            <h5 className="card-title">{ title }</h5>
            <Form { ...formProps } />
        </div>
    </div>

export default ExampleFormContainer;
