import _ from 'lodash';
import React from 'react';

export const hasError = (name, { errors, touched }) =>
    _.get(errors, name, false) && _.get(touched, name, false);

const ErrorMessage = ({ name, errors, touched }) => {
    let error = _.get(errors, name, false);

    return hasError(name, { errors, touched })
        ? <div className="invalid-feedback">{ error }</div>
        : null
}

export default ErrorMessage;
