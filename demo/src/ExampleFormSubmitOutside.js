import React, { Component } from 'react';
import { Form } from '../../src';

import basicForm from './schema/basic'

const ref = React.createRef()
const ExampleFormSubmitOutside = () => {

  return (
    <div id={ "outside-submit" } className="form-container">
      <h5 className="card-title">Outside submit</h5>
      <Form { ...basicForm } ref={ref} />

      <button className={"btn btn-warning"} onClick={() => {
        ref.current.submitForm()
      }}>this button is not part of the form and uses ref to trigger the submission</button>
    </div>
  )
}

export default ExampleFormSubmitOutside;
