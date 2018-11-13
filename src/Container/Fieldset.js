import _ from 'lodash';
import Element from '../Element';
import React, { Component } from 'react';

class Fieldset extends React.Component {
    constructor( props ) {
        super(props);

        this.state = {
            collapsed: this.collapsible && this.collapsed ? true : false,
        };
    }

    get collapsible() {
        return this.props.config.collapsible !== false
    }

    get collapsed() {
        return !!this.props.config.collapsed
    }

    toggle( event ) {
        if(false === this.collapsible) {
            event.preventDefault();
            return;
        }

        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const {
            config: { title, elements },
            formikProps
        } = this.props;

        return (
            <div className="card flutter-fieldset">
                { !!title &&
                    <div className="card-header" onClick={ (event) => this.toggle(event) }>
                        <i className="fa fa-align-justify"></i>
                        { title }
                        <div className="card-header-actions">
                            <a className="card-header-action btn btn-minimize">
                                <i className={ this.state.collapsed ? 'icon-arrow-down' : 'icon-arrow-up' }></i>
                            </a>
                        </div>
                    </div>
                }
                <div className={ 'collapse ' + (!this.state.collapsed ? 'show': '') }>
                    <div className="card-body">
                        { _.map(elements, (element, key) =>
                            <Element
                                key={ key }
                                config={ element }
                                formikProps={ formikProps }
                                update={ !this.state.collapsed }/>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Fieldset;
