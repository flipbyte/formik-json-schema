import React, { Component } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const defaultOptions = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    },
    formats: [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
};


const _handleChange = ( name, value, setFieldValue ) => {
    setFieldValue(name, value);
};

const Wysiwyg = ({ config, formikProps }) => {
    const { name, type, attributes, options, rows } = config;
    const { values, handleChange, setFieldValue } = formikProps;

    let toolbarOptions = ( options ) ? options : defaultOptions;
    // console.log('Options', options);
    // console.log('toolbarOptions', toolbarOptions);
    return <ReactQuill
                id={ name }
                value={ values[name] }
                onChange={ (value) =>  _handleChange(name, value, setFieldValue) }
                { ...toolbarOptions }
                { ... attributes } />

}

export default Wysiwyg;
