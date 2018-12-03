import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { Component } from 'react';

class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.prepareTabs(this.props.config.tabs);

        this.state = {
            activeTab: this.defaultActiveTab
        };

        this.toggle = this.toggle.bind(this);
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

    render() {
        const {
            config: {
                name,
                tabs,
                prefixNameToElementName = false,
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
            },
            formikProps
        } = this.props;

        return (
            <div className={ cardClass }>
                <div className={ cardBodyClass }>
                    <div className={ rowClass }>
                        <div className={ tabColumnClass }>
                            <ul id="list-tab" className={ tabListClass }>
                                { _.map(this.tabs, ( tab, key ) =>
                                    <li
                                        key={ key }
                                        className={
                                            tabListItemClass + ( this.state.activeTab == key ? tabActiveClass : '' )
                                        }
                                        onClick={ this.toggle.bind(null, key) }>{ tab }
                                    </li>
                                ) }
                            </ul>
                        </div>
                        <div className={ contentColumnClass }>
                            <div className={ tabContentClass }>
                                { _.map(this.tabContent, ( tabContent, tabKey ) =>
                                    <div
                                        key={ tabKey }
                                        className={
                                            tabPaneClass + ( this.state.activeTab == tabKey ? tabActiveClass : '' )
                                        }>
                                        { _.map(tabContent, ({ name: elementName, ...rest }, key ) => {
                                            let element = _.assign({}, rest);
                                            element.name = prefixNameToElementName
                                                ? joinNames(name, elementName) : elementName;

                                            return <Element
                                                key={ key }
                                                config={ element }
                                                formikProps={ formikProps }
                                                update={ this.state.activeTab == tabKey } />
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

export default Tabs;
