import React from 'react';

const ErrorMessage = ({
    name,
    error,
    className = 'invalid-feedback order-last',
    as: Component = 'div'
}) => error && (
    <Component className={ className }>{ error }</Component>
);

export default React.memo(ErrorMessage);
