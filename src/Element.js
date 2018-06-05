import React, { Component } from 'react';
import { render } from './registry';

const Element = ({ config, formikProps, ...rest }) => {
    return render(config, formikProps, rest);
}

export default Element;
