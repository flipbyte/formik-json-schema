import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';

class Fieldset extends React.Component {
    constructor( props ) {
        super(props);

        this.state = {
            collapsed: this.collapsible && this.collapsed ? true : false,
        };

        this.toggle = this.toggle.bind(this);
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
            config: {
                name,
                title,
                elements,
                prefixNameToElement = false,
                cardClass = 'card flutter-fieldset',
                cardHeaderClass = 'card-header',
                cardHeaderActionsClass = 'card-header-actions',
                cardBodyClass = 'card-body'
            },
            formikProps
        } = this.props;

        return (
            <div className={ cardClass }>
                { !!title &&
                    <div className={ cardHeaderClass } onClick={ this.toggle }>
                        <i className="fa fa-align-justify"></i>
                        { title }
                        <div className={ cardHeaderActionsClass }>
                            { this.collapsible && <a className="card-header-action btn btn-minimize">
                                <i className={ this.state.collapsed ? 'icon-arrow-down' : 'icon-arrow-up' }></i>
                            </a> }
                        </div>
                    </div>
                }
                <div className={ 'collapse ' + (!this.state.collapsed ? 'show': '') }>
                    <div className={ cardBodyClass }>
                        { _.map(elements, ({ name: elementName, ...rest }, key) => {
                            let element = _.assign({}, rest);
                            element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

                            return <Element
                                key={ key }
                                config={ element }
                                formikProps={ formikProps }
                                containerName={ name }
                                update={ !this.state.collapsed }/>
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Fieldset;
