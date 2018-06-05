import React, { Component } from 'react';
import { render } from './registry';

const Element = ({ config, formikProps, ...rest }) =>
    render(config, formikProps, rest);


export default Element;
