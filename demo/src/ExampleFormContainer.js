import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form } from '../../src';

const ExampleFormContainer = ({ title, className, id, formProps }) =>
    <div id={ id } className="form-container">
        <h5 className="card-title">{ title }</h5>
        <Form { ...formProps } />
    </div>

export default ExampleFormContainer;
