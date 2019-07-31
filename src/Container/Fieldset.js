import _ from 'lodash';
import Element from '../Element';
import { joinNames } from '../utils';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Fieldset = ({
    config: {
        name,
        title,
        elements,
        collapsible = true,
        collapsed = false,
        prefixNameToElement = false,
        hasHeaderIcon = true,
        headerIconClass = 'fa fa-align-justify',
        cardClass = 'card flutter-fieldset',
        cardHeaderClass = 'card-header',
        cardHeaderIconCollapsedClass = 'fas fa-angle-down',
        cardHeaderIconDisclosedClass = 'fas fa-angle-up',
        cardHeaderActionsClass = 'card-header-actions',
        cardBodyClass = 'card-body'
    }
}) => {
    const [ isCollapsed, setIsCollapsed ] = useState(collapsible && collapsed);
    const toggle = (event) => {
        if(false === collapsible) {
            event.preventDefault();
            return;
        }
        setIsCollapsed(isCollapsed => !isCollapsed);
    }

    return (
        <div className={ cardClass }>
            { !!title &&
                <div className={ cardHeaderClass } onClick={ toggle }>
                    { hasHeaderIcon && <i className={ headerIconClass }></i> }
                    { title }
                    { collapsible && <div className={ cardHeaderActionsClass }>
                        <a className="card-header-action btn btn-minimize">
                            <i className={ isCollapsed ?  cardHeaderIconCollapsedClass : cardHeaderIconDisclosedClass }></i>
                        </a>
                    </div> }

                </div>
            }
            <div className={ 'collapse ' + (!isCollapsed ? 'show': '') }>
                <div className={ cardBodyClass }>
                    { _.map(elements, ({ name: elementName, ...rest }, key) => {
                        let element = _.assign({}, rest);
                        element.name = prefixNameToElement ? joinNames(name, elementName) : elementName;

                        return (
                            <Element
                                key={ key }
                                config={ element }
                                containerName={ name }
                                update={ !isCollapsed }
                            />
                        );
                    }) }
                </div>
            </div>
        </div>
    );
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
