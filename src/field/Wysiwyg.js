import React, { Component } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Wysiwyg = ({ config, params }) => {
    console.log(params);
    const { name, type, attributes, rows } = config;
    const { values, setFieldValue } = params;

    return <ReactQuill
                id={ name }
                value={ values[name] }
                onChange={ setFieldValue }
                { ... attributes } />

}

export default Wysiwyg;
