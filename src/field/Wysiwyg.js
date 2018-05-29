import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Wysiwyg = ({ config, params }) => {
    const { name, type, attributes, rows } = config;
    const { values } = params;

    return <ReactQuill
                id={ name }
                value={this.state.text}
                { ... attributes } />

}

export default Wysiwyg;
