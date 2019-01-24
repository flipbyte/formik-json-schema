import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                        { this.collapsible && <div className={ cardHeaderActionsClass }>
                            <a className="card-header-action btn btn-minimize">
                                <i className={ 'fas ' + (this.state.collapsed ? 'fa-angle-down' : 'fa-angle-up') }></i>
                            </a>
                        </div> }

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

Fieldset.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        elements: PropTypes.object.isRequired,
        cardClass: PropTypes.string,
        cardHeaderClass: PropTypes.string,
        cardHeaderActionsClass: PropTypes.string,
        cardBodyClass: PropTypes.string,
        prefixNameToElement: PropTypes.bool
    })
}

export default Fieldset;
