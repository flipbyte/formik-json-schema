const Checkbox = ({ config, params }) => {
    const { name, type, attributes, description } = config;
    const { values } = params;

    return
        <div className="form-check">
            <label className="form-check-label">
                <input
                    name={ name }
                    className="form-check-input"
                    type="checkbox"
                    checked={ values[name] }
                    { ...attributes } /> { description }
            </label>
        </div>
}

export default Checkbox;
