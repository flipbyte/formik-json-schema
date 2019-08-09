import React from 'react';

const ErrorMessage = ({ name, error }) => error && (
    <div className="invalid-feedback">{ error }</div>
);

export default React.memo(ErrorMessage);
