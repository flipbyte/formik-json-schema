import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

const tabPaneInvalid = {
    color: '#dc3545',
}

const tabPaneActiveInvalid = {
    color: '#fff',
    backgroundColor: '#dc3545',
    border: '1px solid #dc3545'
}

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.prepareTabs(this.props.config.elements);
        this.state = {
            activeTab: this.defaultActiveTab,
            isValid: []
        };
        this.toggle = this.toggle.bind(this);
        this.tabId = _.uniqueId('list-tab-');
        this.tabContentEl = React.createRef();
    }

    prepareTabs(tabs) {
        this.tabs = {}
        this.tabContent = {}
        this.defaultActiveTab = '';

        _.map(tabs, ( tab, key ) => {
            const { label, elements, active } = tab;

            this.tabs[key] = label;
            this.tabContent[key] = elements;
            this.defaultActiveTab = (active) ? key : '';
        } )

        if( !this.defaultActiveTab ) {
            this.defaultActiveTab = _.first(_.keys(this.tabs));
        }
    }

    toggle(tabKey) {
        if (this.state.activeTab === tabKey) {
            return;
        }

        this.setState({
            activeTab: tabKey
        });
    }

    componentDidUpdate() {
        const node = this.tabContentEl.current;
        var panes = _.map(node.children, child => child.querySelector('.is-invalid') !== null)
        if(!shallowequal(this.state.isValid, panes)) {
            this.setState({ isValid: panes })
        }
    }

    render() {
        const {
            config: {
                name,
                prefixNameToElement = false,
                cardClass = 'card',
                cardBodyClass = 'card-body',
                rowClass = 'row',
                tabListClass = 'list-group',
                tabListItemClass = 'list-group-item-action list-group-item',
                tabContentClass = 'tab-content flutter-rjf-tab-content',
                tabColumnClass = 'col-sm-12 col-md-3',
                contentColumnClass = 'col-sm-12 col-md-9',
                tabActiveClass = ' active ',
                tabPaneClass = 'tab-pane',
            }
        } = this.props;
        const { activeTab, isValid } = this.state;
        const tabValidations = _(isValid);

        return (
            <div className={ cardClass }>
                <div className={ cardBodyClass }>
                    <div className={ rowClass }>
                        <div className={ tabColumnClass }>
                            <ul id={ this.tabId } className={ tabListClass }>
                                { _.map(this.tabs, ( tab, key ) => {
                                    const tabInvalid = tabValidations.next().value === true;
                                    return <li
                                        key={ key }
                                        className={
                                            tabListItemClass + ( activeTab == key ? tabActiveClass : '' ) +
                                            ( tabInvalid ? ' is-invalid ' : '' )
                                        }
                                        style={ (tabInvalid
                                            ? activeTab == key
                                                ? tabPaneActiveInvalid
                                                : tabPaneInvalid
                                            : null
                                        )}
                                        onClick={ this.toggle.bind(null, key) }
                                    >
                                        { tab }
                                    </li>
                                }) }
                            </ul>
                        </div>
                        <div className={ contentColumnClass }>
                            <div ref={ this.tabContentEl } className={ tabContentClass }>
                                { _.map(this.tabContent, ( tabContent, tabKey, index ) =>
                                    <div
                                        key={ tabKey }
                                        className={
                                            tabPaneClass + ' ' + ( activeTab == tabKey ? tabActiveClass : '' )
                                        }>
                                        { _.map(tabContent, ({ name: elementName, ...rest }, key ) => {
                                            let element = _.assign({}, rest);
                                            element.name = prefixNameToElement
                                                ? joinNames(name, elementName) : elementName;

                                            return <Element
                                                key={ key }
                                                config={ element }
                                                update={ activeTab == tabKey } />
                                        }) }
                                    </div>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Tabs.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
        prefixNameToElement: PropTypes.bool,
        elements: PropTypes.object.isRequired,
        cardClass: PropTypes.string,
        cardBodyClass: PropTypes.string,
        rowClass: PropTypes.string,
        tabListClass: PropTypes.string,
        tabListItemClass: PropTypes.string,
        tabContentClass: PropTypes.string,
        tabColumnClass: PropTypes.string,
        contentColumnClass: PropTypes.string,
        tabActiveClass: PropTypes.string,
        tabPaneClass: PropTypes.string,
    })
}


export default Tabs;
