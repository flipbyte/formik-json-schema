import _ from 'lodash';
import Element from '../Element';
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
            config: { tabs },
            formikProps
        } = this.props;

        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <ul id="list-tab" className="list-group">
                                { _.map(this.tabs, ( tab, key ) =>
                                    <li
                                        key={ key }
                                        className={
                                            'list-group-item-action list-group-item ' +
                                            ( this.state.activeTab == key ? 'active' : '' )
                                        }
                                        onClick={ this.toggle.bind(null, key) }>{ tab }
                                    </li>
                                ) }
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <div className="tab-content flutter-rjf-tab-content">
                                { _.map(this.tabContent, ( tabContent, tabKey ) =>
                                    <div
                                        key={ tabKey }
                                        className={ 'tab-pane ' + (this.state.activeTab == tabKey ? 'active' : '')}>
                                        { _.map(tabContent, ( content, key ) =>
                                            <Element
                                                key={ key }
                                                config={ content }
                                                formikProps={ formikProps }
                                                update={ this.state.activeTab == tabKey }/>
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
