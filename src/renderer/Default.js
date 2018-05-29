import { createField, registerRenderer } from '../registry';

// export const getRendererOption = ( schema, name, defaultValue ) => (
//     schema && schema.form && schema.form.rendererOptions && schema.form.rendererOptions[name] || defaultValue
// );

const Field = ({ config, formikProps }) => {
    const { name, title, comment } = config;

    return
        <div key={ name } className="form-group row">
            <label htmlFor={ name } className="col-3 col-form-label">{ title }</label>
            <div className="col">
                { createField(config, formikProps) }
                { comment && (<small className="form-text text-muted">{ comment }</small>) }
            </div>
        </div>
}

const Default = ({ schema, formikProps }) =>
    <form onSubmit={ formikProps.handleSubmit }>
        { schema.fields.map( (field) => <Field config={ field } formikProps={ formikProps }) }
        <button type="submit" className="btn btn-primary">Save</button>
    </form>

registerRenderer('default', ( schema ) => ( formikProps ) =>
    <Default schema={ schema } formikProps={ formikProps} />
