import React, { Component } from 'react';
import { render } from './registry';

const Element = ({ config, formikProps }) => {
    return render(config, formikProps);
}

export default Element;
