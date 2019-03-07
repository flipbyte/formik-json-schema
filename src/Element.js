import _ from 'lodash';
import { connect } from 'formik';
import React, { Component } from 'react';
import ElementRenderer from './Renderer';
import { render as renderElement, getConfig } from './registry';
import { hasError } from './utils';
import shallowequal from 'shallowequal';

class Element extends Component {
    constructor( props ) {
        super(props);

        const { config, update, formik } = this.props;
        this.state = {
            hasLoadedConfig: false,
            hasLoadedData: config.dataSource ? false : true,
            hasMounted: update !== false,
            submitCountToValidate: formik.submitCount || 0,
            value: undefined,
            error: false
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

    // Experimental - needs thorough testing
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(
        //     'Element - shouldComponentUpdate',
        //     this.props.config.name,
        //     nextState, this.state,
        //     shallowequal(this.state, nextState),
        //     nextState !== this.state
        //     // this.props.config,
        //     // nextProps.config,
        //     // this.props.config === nextProps.config,
        //     // this.props.formik,
        //     // nextProps.formik,
        //     // this.props.formik === nextProps.formik,
        //     // this.props,
        //     // this.props === nextProps
        // )

        return !shallowequal(this.state, nextState)
    }

    loadConfigAfter(config) {
        this.setState({
            hasLoadedConfig: true,
            loadedConfig: _.assign({}, this.props.config, config)
        });
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

        this.setState({
            value: _.get(formik.values, name),
            error: hasError(name, this.state.submitCountToValidate, formik)
        })
    }

    loadDataAfter(value) {
        this.setState({ hasLoadedData: true });
    }

    render() {
        // console.log('Element - render ' + this.props.config.name);
        const { config: initialConfig, formik } = this.props;
        const { loadedConfig, submitCountToValidate, value, error } = this.state;
        const config = loadedConfig || initialConfig;
        const rendererProps = { config, submitCountToValidate, value, error, formik }
        return this.state.hasMounted && <ElementRenderer { ...rendererProps } />
    }
}

export default connect(Element);
