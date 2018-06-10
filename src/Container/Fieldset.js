import React, { Component } from 'react';

import Element from '../Element';

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
                        <div className="card-actions">
                            <a className="card-header-action btn btn-minimize">
                                <i className={ this.state.collapsed ? 'icon-arrow-down' : 'icon-arrow-up' }></i>
                            </a>
                        </div>
                    </div>
                }
                <div className={ 'collapse ' + (!this.state.collapsed ? 'show': '') }>
                    <div className="card-block">
                        { Object.keys(elements).map( (key) =>
                            <Element
                                key={ key }
                                config={ elements[key] }
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
