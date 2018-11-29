import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, setFieldValueWrapper, joinNames } from '../utils';

const defaultOptions = {
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

class Wysiwyg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHtml: false,
            html: '',
        };

        this.toolbarOptions = _.assign({}, ( this.props.options ) ? this.props.options : defaultOptions);
        this.toggleEditor = this.toggleEditor.bind(this);
    }

    toggleEditor( event ) {
        this.setState({ showHtml: !this.state.showHtml });
    }

    render() {
        const { config, formikProps, submitCountToValidate, containerName } = this.props;
        const {
            name: elementName,
            label,
            type,
            attributes,
            options,
            rows,
            prefixContainerName = false,
            labelClass = '',
            inputClass = 'form-control',
            formGroupClass = 'form-group',
            textareaClass = 'form-control'
        } = config;
        const { setFieldValue, handleChange } = formikProps;
        const name = prefixContainerName && containerName ? joinNames(containerName, elementName) : elementName;
        const value = _.get(formikProps.values, name, '');
        const error = hasError(name, submitCountToValidate, formikProps);

        return (
            <div className={ formGroupClass }>
                <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
                <div className={`row ql-container-wysiwyg ql-container-wysiwyg-${name} ${inputClass}` }>
                    <div className="col-md-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-primary pull-right"
                            onClick={ this.toggleEditor }>
                            { this.state.showHtml ? 'Show Editor' : 'View Source' }
                        </button>
                    </div>
                    <div className={ 'col-md-12 ' + ( error ? ' is-invalid ' : '' ) }>
                        { !this.state.showHtml && <ReactQuill
                            id={ name }
                            value={ value }
                            className={ error ? ' is-invalid ' : '' }
                            onChange={
                                changeHandler.bind(this, setFieldValueWrapper(setFieldValue, name), formikProps, config)
                            }
                            { ...this.toolbarOptions }
                            { ... attributes } />
                        }
                        { this.state.showHtml &&
                            <textarea
                                id={ 'ql-show-html-' + name }
                                name={ name }
                                className={ textareaClass }
                                rows="10"
                                value={ value }
                                onChange={ changeHandler.bind(this, handleChange, formikProps, config) } />
                        }
                        <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
                    </div>
                </div>
            </div>
        );
    }
}

export default Wysiwyg;
