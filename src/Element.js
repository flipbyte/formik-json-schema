import React, { Component } from 'react';
import { render as renderElement, getConfig } from './registry';
import { getIn } from 'formik';
import request from './request';

class Element extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            hasLoadedData: this.props.config.loadData ? false : true,
            hasMounted: this.props.update !== false
        };
    }

    componentWillReceiveProps( nextProps ) {
        const { update, config: { name, loadData }, formikProps }  = nextProps;

        if( !this.state.hasMounted ) {
            const canUpdate = update !== false;
            // if( false === canUpdate ) {
            //     return false;
            // }

            this.setState({ hasMounted: canUpdate });
        }

        if( this.state.hasMounted && !this.state.hasLoadedData ) {
            this.loadData(name, loadData, formikProps);
        }
    }

    loadData( name, config, formikProps ) {
        var self = this;
        if(!config || !config.route) {
            return false;
        }

        const { initialValues, setFieldValue } = formikProps;

        var params = {};
        for( var key in config.params ) {
            let value = getIn(initialValues, config.params[key]);
            if(!value) {
                return false;
            }

            params[key] = value;
        }

        var loadRequest = request(getConfig('apiUrl'))(config.route, params);
        fetch(loadRequest.getUrl(), {
            method: loadRequest.method,
            headers: loadRequest.headers,
        }).then(
            response => response.json()
        ).then( response => {
            var value = getIn(response, config.resultPath);
            if(value) {
                self.setState({ hasLoadedData: true });
                setFieldValue(name, value);
            }
        });
    }

    // Keep this code to test whether components are renderer even when
    // they are collapsed. This was an earlier version of the code and it has
    // now been moved to the above componentWillReceiveProps function
    // shouldComponentUpdate( nextProps, nextState ) {
    //     const { update, config: { name, loadData }, formikProps }  = nextProps;
    //
    //     const canUpdate = update !== false;
    //     if( false === canUpdate ) {
    //         return false;
    //     }
    //
    //     if( !this.state.hasMounted ) {
    //         this.setState({ hasMounted: canUpdate });
    //     }
    //
    //     if( this.state.hasMounted && !this.state.hasLoadedData ) {
    //         this.loadData(name, loadData, formikProps);
    //     }
    //
    //     if(this.state.hasLoadedData && this.state.value) {
    //         formikProps.setFieldValue(name, this.state.value);
    //     }
    //
    //     return true;
    // }

    render() {
        const { config, formikProps, ...rest } = this.props;
        return this.state.hasMounted && renderElement(config, formikProps, rest);
    }
}

export default Element;
