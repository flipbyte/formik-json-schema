import _ from 'lodash';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { changeHandler, setFieldValueWrapper } from '../utils';

const Wysiwyg = ({ config, formik, value = '', error }) => {
    const [ showHtml, setShowHtml ] = useState(false);
    const [ html, setHtml ] = useState('');
    const {
        name,
        type,
        attributes,
        options,
        rows,
        textareaClass = 'form-control'
    } = config;
    const { setFieldValue, handleChange, handleBlur } = formik;
    const toolbarOptions = _.assign({}, options ? options : Wysiwyg.defaultOptions);

    return (
        <div className={`row ql-container-wysiwyg ql-container-wysiwyg-${name}` }>
            <div className="col-md-12 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary pull-right"
                    onClick={() => setShowHtml((showHtml) => !showHtml)}>
                    { showHtml ? 'Show Editor' : 'View Source' }
                </button>
            </div>
            <div className={ 'col-md-12 '  }
                onBlur={(event) => (
                    handleBlur({
                        ...event,
                        target: {
                            ...event.target,
                            name
                        }
                    })
                )
            }>
                { !showHtml && <ReactQuill
                    id={ name }
                    value={ value }
                    className={ error ? ' is-invalid ' : '' }
                    onChange={
                        changeHandler.bind(this, setFieldValueWrapper(setFieldValue, name), formik, config)
                    }
                    { ...toolbarOptions }
                    { ... attributes } />
                }
                { showHtml &&
                    <textarea
                        id={ 'ql-show-html-' + name }
                        name={ name }
                        className={ textareaClass }
                        rows="10"
                        value={ value }
                        onChange={ changeHandler.bind(this, handleChange, formik, config) }
                    />
                }
            </div>
        </div>
    );
};

Wysiwyg.defaultOptions = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        },
    },
    formats: [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
};

export default React.memo(Wysiwyg);
