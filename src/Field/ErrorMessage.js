import React from 'react';
import { connect } from 'formik';
import { getError } from '../utils';

const ErrorMessage = ({ name, formik }) => {
    const error = getError(name, formik);
    return error && <div className="invalid-feedback">{ error }</div>;
};

export default connect(React.memo(ErrorMessage, ({ name, formik }, nextProps) => {
    const currentError = getError(name, formik);
    const nextError = getError(name, nextProps.formik);
    return currentError === nextError;
}));
