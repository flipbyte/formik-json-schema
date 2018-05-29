const Text = ({ config, params }) => {
    const { name, type, attributes } = config;
    const { values } = params;

    return <input
                id={ name }
                name={ name }
                type={ type }
                className="form-control"
                value={ values[config.name] }
                { ...attributes } />

}

export default Text;
