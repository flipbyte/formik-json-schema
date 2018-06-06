import React, { Component } from 'react';
import { getIn } from 'formik';

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: getIn(this.props.formikProps.values, this.props.config.name),
        };
    }

    setValue() {
        const {
            config: { name },
            formikProps: { setFieldValue }
        } = this.props;

        this.setState({ value: !this.state.value })
        setFieldValue(name, this.state.value);
    }

    render() {
        const {
            config: {
                name,
                label,
                attributes,
                htmlClass,
                dataOn,
                dataOff
            },
        } = this.props;

        return (
            <div className="form-group">
                { !!label && <label>{ label }</label> }
                <label className={ 'switch ' + htmlClass }>
                    <input type="checkbox" className="switch-input" defaultChecked={ this.state.value }/>
                    <span
                        className="switch-label"
                        data-on={ dataOn }
                        data-off={ dataOff }
                        onClick={ (event) => this.setValue() }></span>
                    <span className="switch-handle"></span>
                </label>
            </div>
        );
    }
}

export default Switch;
