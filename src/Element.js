import _ from 'lodash';
import React, { Component } from 'react';
import { render as renderElement, getConfig } from './registry';

class Element extends Component {
    constructor( props ) {
        super(props);

        const { config, update, formikProps } = this.props;
        this.state = {
            hasLoadedConfig: false,
            hasLoadedData: config.dataSource ? false : true,
            hasMounted: update !== false,
            submitCountToValidate: formikProps.submitCount || 0
        };

        this.loadDataAfter = this.loadDataAfter.bind(this);
        this.loadConfigAfter = this.loadConfigAfter.bind(this);
    }

    componentDidMount() {
        const { config: { configSource }, formikProps }  = this.props;

        if( !this.state.hasLoadedConfig && configSource && _.isFunction(configSource) ) {
            configSource(formikProps, this.props.config)
                .then(this.loadConfigAfter)
                .catch((err) => {});
        }
    }

    loadConfigAfter(config) {
        let fullConfig = _.assign({}, this.props.config, config);
        this.setState({ hasLoadedConfig: true, loadedConfig: fullConfig });
    }

    componentWillReceiveProps( nextProps ) {
        const { update, config: { name, dataSource }, formikProps }  = nextProps;

        if( !this.state.hasMounted ) {
            const canUpdate = update !== false;
            // if( false === canUpdate ) {
            //     return false;
            // }

            this.setState({ hasMounted: canUpdate });
        }

        if(dataSource && _.isFunction(dataSource)) {
            if(formikProps.initialValues !== this.props.formikProps.initialValues && this.state.hasLoadedData) {
                dataSource(formikProps, nextProps.config)
                    .then(this.loadDataAfter)
                    .catch((err) => {});
            }

            if( this.state.hasMounted && !this.state.hasLoadedData ) {
                dataSource(formikProps, nextProps.config)
                    .then(this.loadDataAfter)
                    .catch((err) => {});
            }
        }
    }

    loadDataAfter(value) {
        this.setState({ hasLoadedData: true });
    }

    render() {
        const { config: initialConfig, formikProps, ...rest } = this.props;
        const { loadedConfig, submitCountToValidate } = this.state;
        const config = loadedConfig || initialConfig;
        return this.state.hasMounted && renderElement(config, formikProps, submitCountToValidate, rest);
    }
}

export default Element;
