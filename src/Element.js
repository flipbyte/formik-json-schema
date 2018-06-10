import React, { Component } from 'react';
import { render as renderElement } from './registry';

class Element extends Component {
    constructor( props ) {
        super(props);
        this.state = { hasMounted: this.props.update !== false }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        const canUpdate = !!nextProps.update;
        if( false == canUpdate) {
            return false;
        }

        if( !this.state.hasMounted ) {
            this.setState({ hasMounted: canUpdate });
        }

        return true;
    }

    render() {
        const { config, formikProps, ...rest } = this.props;
        return this.state.hasMounted && renderElement(config, formikProps, rest);
    }
}

export default Element;
