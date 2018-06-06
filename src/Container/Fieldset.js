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
                    <div className="card-header">
                        <button
                            type="button"
                            className="text-left m-0 p-0 btn btn-link btn-block"
                            onClick={ (event) => this.toggle(event) }>
                                <h5 className="m-0 p-0">{ title }</h5>
                        </button>
                    </div>
                }
                <div className={ 'collapse' + ( !this.state.collapsed ? 'show' : '' ) }>
                    <div className="card-block">
                        { Object.keys(elements).map( (key) =>
                            <Element key={ key } config={ elements[key] } formikProps={ formikProps } />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Fieldset;
