import _ from 'lodash';
import React from 'react';
import { connect } from 'formik';
import { hasError } from '../utils';

const ErrorMessage = ({ name, submitCountToValidate, formik }) => {
    let error = _.get(formik.errors, name, false);
    return hasError(name, submitCountToValidate, formik)
        ? <div className="invalid-feedback">{ error }</div> : null;
}

export default connect(ErrorMessage);
