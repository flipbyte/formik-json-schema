import React, { Component } from 'react';
import { render } from 'react-dom';
import forms from './schema';
import ExampleFormContainer from './ExampleFormContainer';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import './css/styles.css';
require('codemirror/mode/xml/xml');

const Demo = () =>
    <div className="container">
        <div className="row justify-content-md-center">
            <div className="col-12">
                <h1 className="text-center mt-5 mb-5">formik-json Demo</h1>
                { forms.map(( form, index ) => <ExampleFormContainer key={ index } { ...form } /> ) }
            </div>
        </div>
    </div>


render(<Demo/>, document.querySelector('#demo'))
