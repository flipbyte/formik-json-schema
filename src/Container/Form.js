import _ from 'lodash';
import React from 'react';
import Element from '../Element';

const Form = ({ config, formikProps }) => {
    const { elements } = config;
    const { handleSubmit, handleReset } = formikProps;

    return(
        <form className="form-horizontal" onSubmit={ handleSubmit } onReset={ handleReset }>
            { _.map(elements, ( element, key ) =>
                <Element key={ key } config={ element } formikProps={ formikProps } />
            ) }
        </form>
    );
}

export default Form;
