import _ from 'lodash';
import React, { Component } from 'react';
import { render as renderElement, getConfig } from './registry';

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

        if(!_.isObject(loadData)) {
            return;
        }

        if(nextProps.formikProps.initialValues !== this.props.formikProps.initialValues
            && this.state.hasLoadedData
        ) {
            this.loadData(name, loadData, formikProps);
        }

        if( this.state.hasMounted && !this.state.hasLoadedData ) {
            this.loadData(name, loadData, formikProps);
        }
    }

    loadData( name, { route, handler, params, resultPath }, formikProps ) {
        var self = this;

        const { initialValues, setFieldValue } = formikProps;

        var processedParams = _.reduce(params, (processedParams, param, key) => {
            let value = _.get(initialValues, config.params[key]);
            if(!value) {
                return;
            }

            processedParams[key] = value;
        }, {})

        handler.get(route, processedParams).subscribe(
            response => {
                var value = _.get(response, resultPath, '');
                if(value) {
                    self.setState({ hasLoadedData: true });
                    setFieldValue(name, value);
                }
            }
        )
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
