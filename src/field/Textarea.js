const Textarea = ({ config, params }) => {
    const { name, type, attributes, rows } = config;
    const { values } = params;

    return <textarea
                id={ name }
                name={ name }
                className="form-control"
                value={ values[name] }
                rows={ rows || 3 }
                { ...attributes } />

}

export default Textarea;
