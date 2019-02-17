import _ from 'lodash';

export const hasError = (name, submitCountToValidate = 0, {
    errors,
    touched,
    submitCount
}) => _.get(errors, name, false) && (_.get(touched, name, false) || submitCount > submitCountToValidate);

export const changeHandler = (handler, formikProps, {
    onChange,
    ...fieldConfig
}, data) => {
    handler(data);
    _.isFunction(onChange) && onChange(formikProps, fieldConfig, data);
}

export const setFieldValueWrapper = (setFieldValue, name) => (value) => setFieldValue(name, value);
export const joinNames = (...args) => _.join(_.filter(args, arg => (_.isString(arg) && arg) || _.isInteger(arg)), '.')

export const prepareValidationSchema = ({ elements }, result = {}) => {
    _.forEach(elements, (element, index) => {
        const { name, type, validation, prefixNameToElement, renderer } = element;
        if(type !== 'field') {
            if(prefixNameToElement) {
                result[name] = [['object'], ['shape', prepareValidationSchema(element, {})]];
            } else if(renderer == 'editable-grid') {
                result[name] = [['array'], ['of', [['object'], ['shape', prepareValidationSchema(element, {})]]]]
                // result[name].push(prepareValidationSchema(element, {}));
            } else {
                result = prepareValidationSchema(element, result);
            }
        } else {
            if(validation) {
                result[name] = validation
            }
        }
    })

    return result;
}
