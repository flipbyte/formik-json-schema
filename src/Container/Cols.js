import React, { Component } from 'react';

import Element from '../Element';

const Cols = ({ config, formikProps, index, fieldArrayName }) => {
    const { title, elements } = config;

    return Object.keys(elements).map( (key) => {
        let element = Object.assign({}, elements[key]);
        element.name = `${fieldArrayName}.${index}.` + elements[key].name;
        return <td><Element key={ key } config={ element } formikProps={ formikProps } /></td>
    })
}

export default Cols;
