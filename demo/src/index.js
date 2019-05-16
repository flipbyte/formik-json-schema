import React, { Component } from 'react';
import { render } from 'react-dom';
import forms from './schema';
import ExampleFormContainer from './ExampleFormContainer';
import ExampleFormSubmitOutside from './ExampleFormSubmitOutside';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/react-quill/dist/quill.snow.css';
import '../../src/css/autocomplete.css';
import './css/simple-sidebar.css';
import './css/styles.css';
require('codemirror/mode/xml/xml');

const Demo = () => (
    <div className="d-flex" id="wrapper">
        <div className="bg-light border-right sidenav" id="sidebar-wrapper">
            <div className="sidebar-heading"><strong>formik-json</strong></div>
            <div className="list-group list-group-flush">
                { forms.map(({ id, title }, index) => (
                    <a key={ index } href={ `#${id}` }
                        className="list-group-item list-group-item-action bg-light">
                        { title }
                    </a>
                )) }

                <a key={ 'outside-submit' }
                    href={ '#outside-submit' }
                    className="list-group-item list-group-item-action bg-light"
                >
                    Externally triggered submission
                </a>
            </div>
        </div>
        <div id="page-content-wrapper">
            <div className="scrollmenu sticky">
                { forms.map(({ id, title }, index) => <a key={ index } href={ `#${id}` }>{ title }</a> ) }
            </div>
            <div className="container-fluid p-4 content">
                { forms.map((form, index) => <ExampleFormContainer key={ index } { ...form } /> )}
                <ExampleFormSubmitOutside key={ 'outside-submit' } />
            </div>
        </div>
    </div>
);

render(<Demo/>, document.querySelector('#demo'))
