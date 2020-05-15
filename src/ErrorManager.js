import _ from 'lodash';
import React, { useState } from 'react';
import { useFormikContext } from 'formik';

/**
 * Error manager component that displays error only when it's right
 *
 * The component sets the global formik submitCount in it's local state for reference
 * The local submit count is used to make sure the error message is not shown on it's initial load
 *
 * The local submitcount will be set to 1 less than the value of submitCount if the form is being
 * submitted when the fields are mounted. This is done so that fields (such as tab fields) that are mounted
 * for the sole purpose of showing error messages correctly, show the error message right during the first load
 *
 * The error message will be visible only after the first touch or first form submission so that
 * form submitted with fields hidden do not show the a message when they show up when a certain condition is
 * satisified, fieldset disclosed, tab opened, editable grid field added etc.
 *
 * @param {string} name
 * @param {object} formik
 * @param {function} children
 */
const ErrorManager = ({ name, children }) => {
    // Set submitCount on initial mount.
    const formik = useFormikContext();
    const { submitCount: formikSubmitCount, isSubmitting, errors, touched } = useFormikContext();
    const [ submitCount ] = useState(isSubmitting ? formikSubmitCount - 1 : formikSubmitCount);
    const isTouched = _.get(touched, name);
    const errorMessage = _.get(errors, name);
    const error = !_.isEmpty(errorMessage) && (isTouched || formikSubmitCount > submitCount) ? errorMessage : false;

    return children(error);
};

export default ErrorManager;
