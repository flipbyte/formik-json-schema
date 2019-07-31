import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import { getName } from '../utils';
import PropTypes from 'prop-types';

const Form = ({ config, formik }) => {
    const { name: containerName = '', elements, htmlClass = 'form-horizontal' } = config;
    const { handleSubmit, handleReset } = formik;

    return(
        <form className={ htmlClass } onSubmit={ handleSubmit } onReset={ handleReset }>
            { _.map(elements, ({ name, ...config }, key) => (
                <Element
                    key={ key }
                    config={{ ...config, name: getName(config.type, name, containerName) }}
                />
            ))}
        </form>
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
