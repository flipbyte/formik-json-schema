import _ from 'lodash';
import when from '@flipbyte/when-condition';
import { FIELD } from './registry';

export const setFieldValueWrapper = (setFieldValue, name) => (value) => setFieldValue(name, value);
export const joinNames = (...args) => _.join(_.filter(args, arg => (_.isString(arg) && arg) || _.isInteger(arg)), '.')
export const getName = (type, name, ...args) => type === FIELD && !name ? null : joinNames(...args, name);

/**
 * Handle Change and trigger callback if provided
 *
 * @param  {function} handler
 * @param  {object} formikProps
 * @param  {object} config
 * @param  {object} data
 * @param  {string} key
 * @return {void}
 */
export const changeHandler = (handler, formikProps, config, data, key = 'onChange') => {
    handler(data);
    _.isFunction(config[key]) && config[key](formikProps, config, data);
};

/**
 * Recurively prepare a complete validation schema array for yup-schema from individual
 * validation arrays passed to fields
 *
 * @param  {array} schema
 * @return {array}
 */
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
