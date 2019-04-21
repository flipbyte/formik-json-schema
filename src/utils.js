import _ from 'lodash';
import when from '@flipbyte/when-condition';

const fieldSubmitCount = _.memoize((name, submitCount, isValidating) =>
    isValidating ? submitCount - 1 : submitCount
);
export const getError = (name, { errors, touched, isValidating, submitCount }) => {
    const error = _.get(errors, name);
    const isTouched = _.get(touched, name);
    const fsc = fieldSubmitCount(name, submitCount, isValidating);
    return !_.isEmpty(error) && ( isTouched || submitCount > fsc ) ? error : false
}

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
            const schema = prepareValidationSchema(element, {});
            if(prefixNameToElement) {
                if(!_.isEmpty(schema)) {
                    if(name) {
                        result[name] = [['object', schema]];
                    } else {
                        result = {
                            ...result,
                            ...schema
                        }
                    }
                }
            } else if(renderer === 'editable-grid') {
                if(!_.isEmpty(schema)) {
                    result[name] = [['array', [['object', schema]]]]
                }
            } else {
                result = { ...result, ...schema }
            }
        } else {
            if(validation) {
                result[name] = validation
            }
        }
    })

    return result;
}

export const match = (condition, values) => (
    condition ? when(condition, values) : true
);
