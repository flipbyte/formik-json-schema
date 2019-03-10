import _ from 'lodash';
import React from 'react';
import Label from './Label';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import ErrorMessage from './ErrorMessage';
import { changeHandler, setFieldValueWrapper, joinNames } from '../utils';
import FieldTemplate from '../FieldTemplate';

class Wysiwyg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHtml: false,
            html: '',
        };

        this.toolbarOptions = _.assign({}, ( this.props.options ) ? this.props.options : Wysiwyg.defaultOptions);
        this.toggleEditor = this.toggleEditor.bind(this);
    }

    toggleEditor( event ) {
        this.setState({ showHtml: !this.state.showHtml });
    }

    render() {
        const { config, formik, value = '', error } = this.props;
        const {
            name,
            label,
            type,
            attributes,
            options,
            rows,
            labelClass = '',
            formGroupClass = 'form-group',
            textareaClass = 'form-control',
            template: Template = FieldTemplate
        } = config;
        const { setFieldValue, handleChange, handleBlur } = formik;

        return (
            <Template name={ name } label={ label } labelClass={ labelClass } formGroupClass={ formGroupClass }>
                <div className={`row ql-container-wysiwyg ql-container-wysiwyg-${name}` }>
                    <div className="col-md-12 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-primary pull-right"
                            onClick={ this.toggleEditor }>
                            { this.state.showHtml ? 'Show Editor' : 'View Source' }
                        </button>
                    </div>
                    <div className={ 'col-md-12 '  }
                        onBlur={ event => {
                            return handleBlur({
                                ...event,
                                target: {
                                    ...event.target,
                                    name
                                }
                            })
                        }
                    }>
                        { !this.state.showHtml && <ReactQuill
                            id={ name }
                            value={ value }
                            className={ error ? ' is-invalid ' : '' }
                            onChange={
                                changeHandler.bind(this, setFieldValueWrapper(setFieldValue, name), formik, config)
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
                                onChange={ changeHandler.bind(this, handleChange, formik, config) }
                            />
                        }
                    </div>
                </div>
            </Template>
        );
    }
}

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
