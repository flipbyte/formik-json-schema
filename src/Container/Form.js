import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import { joinNames } from '../utils';
import PropTypes from 'prop-types';

const Form = ({ config, formik }) => {
    const { name, elements, htmlClass = 'form-horizontal', prefixNameToElement = false } = config;
    const { handleSubmit, handleReset } = formik;

    return(
        <form className={ htmlClass } onSubmit={ handleSubmit } onReset={ handleReset }>
            { _.map(elements, ( { name: elementName, ...rest }, key ) => {
                let element = _.assign({}, rest);
                element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

                return <Element key={ key } config={ element } />
            }) }
        </form>
    );
}

Form.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        htmlClass: PropTypes.string,
        elements: PropTypes.object.isRequired,
        prefixNameToElement: PropTypes.bool
    })
}

export default Form;
