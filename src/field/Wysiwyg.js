import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ErrorMessage, { hasError } from './ErrorMessage';

class Wysiwyg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHtml: false,
            html: '',
        };

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

        this.toolbarOptions = _.assign({}, ( this.props.options ) ? this.props.options : defaultOptions);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    setValue( content ) {
        const {
            config: { name },
            formikProps: { setFieldValue }
        } = this.props;

        setFieldValue(name, content);

        // if(content) {
        //     content = pretty(content);
        // }
        this.setState({ html: content })

    }

    handleChange( content ) {
        this.setValue(content);
    }

    handleTextareaChange( event ) {
        this.setValue(event.target.value);
    }

    toggleEditor( event ) {
        this.setState({ showHtml: !this.state.showHtml });
    }

    render() {
        const {
            config: { name, label, type, attributes, options, rows, htmlClass },
            formikProps,
            submitCountToValidate
        } = this.props;

        const value = _.get(formikProps.values, name, '');
        const error = hasError(name, submitCountToValidate, formikProps);

        return (
            <div className="form-group">
                <Label htmlFor={ name }>{ label }</Label>
                <div className={`row ql-container-wysiwyg ql-container-wysiwyg-${name} ${htmlClass}` }>
                    <div className="col-md-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-primary pull-right"
                            onClick={ this.toggleEditor }>
                            { this.state.showHtml ? 'Show Editor' : 'View Source' }
                        </button>
                    </div>
                    <div className={ 'col-md-12 ' + ( error ? 'is-invalid' : '' ) }>
                        { !this.state.showHtml && <ReactQuill
                            id={ name }
                            value={ value }
                            className={ error ? 'is-invalid' : '' }
                            onChange={ this.handleChange }
                            { ...this.toolbarOptions }
                            { ... attributes } />
                        }
                        { this.state.showHtml &&
                            <textarea
                                id={ 'ql-show-html-' + name }
                                className="form-control"
                                rows="10"
                                value={ value }
                                onChange={ this.handleTextareaChange } />
                        }
                        <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
                    </div>
                </div>
            </div>
        );
    }
}

export default Wysiwyg;
