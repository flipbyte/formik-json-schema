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

export const prepareValidationSchema = (schema, result = {}) => {
    const processContainer = (container) => {
        const {
            elements,
            prefixNameToElement,
            name: containerName,
            type,
            renderer: containerRenderer
        } = container;
        let prefix = prefixNameToElement || containerRenderer === 'editable-grid' ? containerName : '';

        _.map(elements, (element, key, index) => {
            const {
                type,
                renderer: fieldRenderer,
                isWildcardValidation,
                name: fieldName,
                validation
            } = element;
            if (type !== 'field') {
                let joinArgs = [fieldName];
                if (prefix) {
                    joinArgs.unshift(prefix, '*');
                }
                processContainer({
                    ...element,
                    name: fieldRenderer === 'editable-grid' || isWildcardValidation ? joinNames(...joinArgs) : '',
                });
            }

            if (!validation) {
                return;
            }

            let validationKey = containerRenderer !== 'editable-grid' ?
                joinNames(prefix, fieldName) :
                joinNames(prefix, '*', fieldName);
            result[validationKey] = validation;
        })
    }

    processContainer(schema);
    return result;
}
