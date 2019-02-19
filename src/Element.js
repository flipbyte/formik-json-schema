import _ from 'lodash';
import { connect } from 'formik';
import React, { Component } from 'react';
import ElementRenderer from './Renderer';
import { render as renderElement, getConfig } from './registry';

class Element extends Component {
    constructor( props ) {
        super(props);

        const { config, update, formik } = this.props;
        this.state = {
            hasLoadedConfig: false,
            hasLoadedData: config.dataSource ? false : true,
            hasMounted: update !== false,
            submitCountToValidate: formik.submitCount || 0
        };

        this.loadDataAfter = this.loadDataAfter.bind(this);
        this.loadConfigAfter = this.loadConfigAfter.bind(this);
    }

    componentDidMount() {
        const { config: { configSource }, formik }  = this.props;

        if( !this.state.hasLoadedConfig && configSource && _.isFunction(configSource) ) {
            configSource(formik, this.props.config)
                .then(this.loadConfigAfter)
                .catch((err) => {});
        }
    }

    // Experimental - need thorough testing
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState !== this.state) {
            return true;
        }

        return false
    }

    loadConfigAfter(config) {
        let fullConfig = _.assign({}, this.props.config, config);
        this.setState({ hasLoadedConfig: true, loadedConfig: fullConfig });
    }

    componentWillReceiveProps( nextProps ) {
        const { update, config: { name, dataSource }, formik }  = nextProps;

        if( !this.state.hasMounted ) {
            const canUpdate = update !== false;
            // if( false === canUpdate ) {
            //     return false;
            // }

            this.setState({ hasMounted: canUpdate });
        }

        if(dataSource && _.isFunction(dataSource)) {
            if(formik.initialValues !== this.props.formik.initialValues && this.state.hasLoadedData) {
                dataSource(formik, nextProps.config)
                    .then(this.loadDataAfter)
                    .catch((err) => {});
            }

            if( this.state.hasMounted && !this.state.hasLoadedData ) {
                dataSource(formik, nextProps.config)
                    .then(this.loadDataAfter)
                    .catch((err) => {});
            }
        }
    }

    loadDataAfter(value) {
        this.setState({ hasLoadedData: true });
    }

    render() {
        const { config: initialConfig, formik, ...rest } = this.props;
        const { loadedConfig, submitCountToValidate } = this.state;
        const config = loadedConfig || initialConfig;
        const rendererProps = { config, submitCountToValidate, ...rest }
        return this.state.hasMounted //&& renderElement(config, formik, submitCountToValidate, rest);
            && <ElementRenderer { ...rendererProps } />
    }
}

export default connect(Element);
