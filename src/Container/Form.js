import _ from 'lodash';
import React from 'react';
import Element from '../Element';
import { joinNames } from '../utils';

const Form = ({ config, formikProps }) => {
    const { name, elements, htmlClass = 'form-horizontal', prefixNameToElement = false } = config;
    const { handleSubmit, handleReset } = formikProps;

    return(
        <form className={ htmlClass } onSubmit={ handleSubmit } onReset={ handleReset }>
            { _.map(elements, ( { name: elementName, ...rest }, key ) => {
                let element = _.assign({}, rest);
                element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

                return <Element key={ key } config={ element } formikProps={ formikProps } />
            }) }
        </form>
    );
}

export default Form;
