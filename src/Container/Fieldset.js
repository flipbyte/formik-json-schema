import _ from 'lodash';
import Element from '../Element';
import { getName } from '../utils';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Fieldset = ({
    config: {
        name: containerName = '',
        title,
        elements,
        collapsible = true,
        collapsed = false,
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
                    { _.map(elements, ({ name, ...config }, key) => (
                        <Element
                            key={ key }
                            update={ !isCollapsed }
                            config={{ ...config, name: getName(config.type, name, containerName) }}
                        />
                    ))}
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
        cardBodyClass: PropTypes.string
    })
}

export default Fieldset;
