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
            <div className="row flutter-tabs-container">
                <div className="col-3">
                    <div
                        className="nav flex-column nav-pills"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical">
                            { Object.keys(this.tabs).map( (key) =>
                                <a
                                    key={ key }
                                    className={
                                        'nav-link ' +
                                        ( this.state.activeTab == key ? 'active' : '' )
                                    }
                                    href="#"
                                    onClick={ () => this.toggle(key) }>{ this.tabs[key] }
                                </a>
                            ) }
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        { Object.keys(this.tabContent).map( (tabKey) =>
                            <div
                                key={ tabKey }
                                className={
                                    'tab-pane ' +
                                    ( this.state.activeTab == tabKey ? 'active' : '' )
                                }>
                                { Object.keys(this.tabContent[tabKey]).map( (key) =>
                                    <Element key={ key } config={ this.tabContent[tabKey][key] } formikProps={ formikProps } />
                                ) }
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;
