import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import { getName } from '../utils';
import PropTypes from 'prop-types';
import { Form as FormikDOMForm } from 'formik';

const Form = ({ config }) => {
    const { name: containerName = '', elements, htmlClass = 'form-horizontal', comment, commentClass = 'text-muted d-block mb-3' } = config;

    return(
        <FormikDOMForm className={ htmlClass }>
            { comment && <small className={ commentClass }>{ comment }</small> }
            { _.map(elements, ({ name, ...config }, key) => (
                <Element
                    key={ key }
                    config={{ ...config, name: getName(config.type, name, containerName) }}
                />
            ))}
        </FormikDOMForm>
    );
}

Form.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        htmlClass: PropTypes.string,
        elements: PropTypes.object.isRequired
    })
}

export default Form;
