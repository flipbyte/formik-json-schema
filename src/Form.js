import { Formik } from 'formik';
import { renderForm } from './registry';

const Form = () =>
    <Formik
      { ...this.props }
      render={ renderForm(this.props.schema) } />

export default Form;
