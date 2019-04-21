import React from 'react';
import { connect } from 'formik';
import { getError } from '../utils';

class ErrorMessage extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { name, formik } = this.props;
        const currentError = getError(name, formik);
        const nextError = getError(name, nextProps.formik);

        return currentError !== nextError;
    }

    render() {
        const { name, formik } = this.props;
        const error = getError(name, formik);
        return error && <div className="invalid-feedback">{ error }</div>;
    }
}

export default connect(ErrorMessage);
