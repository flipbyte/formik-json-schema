import _ from 'lodash';
import React from 'react';
import { connect } from 'formik';

export const hasError = (name, { errors, touched, submitCount }) =>
    _.get(errors, name, false) && ( _.get(touched, name, false) || submitCount > 0 );

const ErrorMessage = ({ name, formik }) => {
    let error = _.get(formik.errors, name, false);
    return hasError(name, formik) ? <div className="invalid-feedback">{ error }</div> : null;
}

export default connect(ErrorMessage);
