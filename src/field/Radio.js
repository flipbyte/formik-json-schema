const Radio = ({ config, params }) => {
    const { name, type, attributes, options } = config;
    const { values } = params;

    return options.map(( option ) => (
        <div className="form-check" key={ option.value }>
            <label className="form-check-label">
                <input
                    name={ name }
                    type="radio"
                    className="form-check-input"
                    id={ name + '_' + option.value }
                    value={ option.value }
                    checked={ values[name] === option.value }
                    { ...attributes } /> { option.title }
            </label>
        </div>
    ))
}

export default Radio;
