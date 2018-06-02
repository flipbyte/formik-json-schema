import React, { Component } from 'react';

import Element from '../Element';

class Fieldset extends React.Component {
    constructor(props) {
        super(props);

        const {
            config: { collapsed }
        } = this.props;

        this.state = {
            collapsed: (collapsed) ? true : false,
        };
    }

    toggle( event ) {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const {
            config: { title, elements },
            formikProps
        } = this.props;

        return (
            <div className="card flutter-fieldset">
                { !!title &&
                    <div
                        className="card-header"
                        onClick={ (event) => this.toggle(event) }>
                        <strong>{ title }</strong>
                    </div>
                }
                <div className={ 'card-block ' + ( this.state.collapsed ? 'collapse' : '' )}>
                    { Object.keys(elements).map( (key) =>
                        <Element key={ key } config={ elements[key] } formikProps={ formikProps } />)
                    }
                </div>
            </div>
        );
    }
}

export default Fieldset;
