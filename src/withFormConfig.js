import React from 'react'; 

const SchemaContext = React.createContext({});
export const SchemaProvider = ({ value, children }) => (
    <SchemaContext.Provider value={ value }>
        { children }
    </SchemaContext.Provider>
);

const withFormConfig = WrappedComponent => props => (
    <SchemaContext.Consumer>
        { config => <WrappedComponent { ...props } { ...config } /> }
    </SchemaContext.Consumer>
);

export default withFormConfig
