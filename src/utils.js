import _ from 'lodash';
import when from '@flipbyte/when-condition';
import { FIELD } from './registry';

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
export const getName = (type, name, ...args) => type === 'field' && !name ? null : joinNames(...args, name);

export const prepareValidationSchema = (schema) => {
    const { type, elements, name, renderer, validation, prefixNameToElement = false } = schema;
    if (type === FIELD && validation) {
        return {
            [name]: validation
        };
    }

    const elementSchema = _.reduce(elements, (result = {}, element, key) => {
        return {
            ...result,
            ...prepareValidationSchema(element)
        };
    }, {});

    let result = {};
    if (renderer === 'editable-grid' && !_.isEmpty(elementSchema)) {
        result[name] = [['array', [['object', elementSchema]]]];
    } else if (!_.isEmpty(elementSchema) && name) {
        result[name] = [['object', elementSchema]];
    } else {
        result = { ...result, ...elementSchema };
    }

    return result;
};

export const match = (condition, values) => (
    condition ? when(condition, values) : true
);
