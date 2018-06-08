import React, { Component } from 'react';

import Element from '../Element';

class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.prepareTabs(this.props.config.tabs);

        this.state = {
            activeTab: this.defaultActiveTab
        };
    }

    prepareTabs(tabs) {
        this.tabs = {}
        this.tabContent = {}
        this.defaultActiveTab = '';

        Object.keys(tabs).map( (key) => {
            const {
                label, elements, active
            } = tabs[key];

            this.tabs[key] = label;
            this.tabContent[key] = elements;
            this.defaultActiveTab = (active) ? key : '';
        } )

        if( !this.defaultActiveTab ) {
            this.defaultActiveTab = Object.keys(this.tabs)[0];
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
            config: { tabs },
            formikProps
        } = this.props;

        return (
            <div className="card">
                <div className="card-block">
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <ul id="list-tab" className="list-group">
                                { Object.keys(this.tabs).map( (key) =>
                                    <li
                                        key={ key }
                                        className={
                                            'list-group-item-action list-group-item ' +
                                            ( this.state.activeTab == key ? 'active' : '' )
                                        }
                                        onClick={ () => this.toggle(key) }>{ this.tabs[key] }
                                    </li>
                                ) }
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                { Object.keys(this.tabContent).map( (tabKey) =>
                                    <div
                                        key={ tabKey }
                                        className={
                                            'tab-pane ' +
                                            ( this.state.activeTab == tabKey ? 'active' : '' )
                                        }>
                                        { Object.keys(this.tabContent[tabKey]).map( (key) =>
                                            <Element
                                                key={ key }
                                                config={ this.tabContent[tabKey][key] }
                                                formikProps={ formikProps } />
                                        ) }
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
