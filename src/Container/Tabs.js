import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

const tabPaneInvalid = {
    color: '#dc3545',
};

const tabPaneActiveInvalid = {
    color: '#fff',
    backgroundColor: '#dc3545',
    border: '1px solid #dc3545'
};

const Tabs = ({ config = {} }) => {
    const {
        elements = {},
        name: containerName = '',
        cardClass = 'card',
        cardBodyClass = 'card-body',
        rowClass = 'row',
        tabListClass = 'nav flex-column nav-pills',
        tabListItemClass = 'nav-link',
        tabContentClass = 'tab-content flutter-rjf-tab-content',
        tabColumnClass = 'col-sm-12 col-md-3',
        contentColumnClass = 'col-sm-12 col-md-9',
        tabActiveClass = ' active ',
        tabPaneClass = 'tab-pane fade show',
    } = config;
    const tabContentEl = useRef({});
    const [ activeTab, setActiveTab ] = useState(_.first(_.keys(elements)));
    const [ isValid, setIsValid ] = useState([]);
    const [ tabs, setTabs ] = useState({});
    const [ tabContent, setTabContent ] = useState({});
    const [ tabId ] = useState(_.uniqueId('list-tab-'));

    const tabValidations = _(isValid);

    useEffect(() => {
        _.map(elements, (tab, key) => {
            const { label, elements: content, active, name, comment, commentClass } = tab;

            setTabs((state) => ({
                ...state,
                [key]: label
            }));

            setTabContent((state) => ({
                ...state,
                [key]: { name, content, comment, commentClass }
            }));

            if (active) {
                setActiveTab(key);
            }
        });
    }, []);

    useEffect(() => {
        const node = tabContentEl.current;
        var panes = _.map(node.children, child => child.querySelector('.is-invalid') !== null)
        if(!shallowequal(isValid, panes)) {
            setIsValid(panes)
        }
    });

    return (
        <div className={ cardClass }>
            <div className={ cardBodyClass }>
                <div className={ rowClass }>
                    <div className={ tabColumnClass }>
                        <nav>
                            <div id={ tabId } className={ tabListClass }>
                                { _.map(tabs, (tab, key) => {
                                    const tabInvalid = tabValidations.next().value === true;
                                    return <a
                                        key={ key }
                                        href={ null }
                                        className={
                                            tabListItemClass 
                                            + ( activeTab === key ? tabActiveClass : '' ) 
                                            + ( tabInvalid ? ' is-invalid ' : '' )
                                        }
                                        style={(
                                            tabInvalid ? (
                                                activeTab === key
                                                ? tabPaneActiveInvalid
                                                : tabPaneInvalid
                                            ) : null
                                        )}
                                        onClick={() => setActiveTab(key)}
                                    >
                                        { tab }
                                    </a>
                                }) }
                            </div>
                        </nav>
                    </div>
                    <div className={ contentColumnClass }>
                        <div ref={ tabContentEl } className={ tabContentClass }>
                            { _.map(tabContent, (
                                { name: tabName = '', content, comment, commentClass = 'text-muted d-block mb-3' },
                                tabKey,
                                index
                            ) => (
                                <div
                                    key={ tabKey }
                                    className={
                                        `${tabPaneClass} ${activeTab === tabKey ? tabActiveClass : ''}` 
                                    }
                                >
                                    { comment && <small className={ commentClass }>{ comment }</small> }
                                    { _.map(content, ({ name, ...rest }, key) => (
                                        <Element
                                            key={ key }
                                            config={{ ...rest, name: joinNames(containerName, tabName, name) }}
                                            update={ activeTab === tabKey }
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Tabs.propTypes = {
    config: PropTypes.shape({
        name: PropTypes.string,
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
