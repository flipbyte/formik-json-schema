import _ from 'lodash';
import React from 'react';
import { connect } from 'formik';

export const hasError = (name, submitCountToValidate = 0, { errors, touched, submitCount }) =>
    _.get(errors, name, false) && ( _.get(touched, name, false) || submitCount > submitCountToValidate );

const ErrorMessage = ({ name, submitCountToValidate, formik }) => {
    let error = _.get(formik.errors, name, false);
    return hasError(name, submitCountToValidate, formik)
        ? <div className="invalid-feedback">{ error }</div> : null;
}

export default connect(ErrorMessage);
