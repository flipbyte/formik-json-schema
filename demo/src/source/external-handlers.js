import _ from 'lodash';

let delay = 1000;

let textChangeTimeout = 0;
export const alertTextOnChange = ( formikProps, fieldConfig, event ) => {
    clearTimeout(textChangeTimeout);
    textChangeTimeout = setTimeout(function () {
        alert('Current value in the text input: ' + event.target.value);
    }, delay);
}

export const hideTextField = ( formikProps, fieldConfig, value ) =>
    document.getElementById('text1').parentElement.style.display = value ? 'none' : '';

export const save = ( values, formikProps ) => {
    console.log(values);
    alert(JSON.stringify(values));
    formikProps.setSubmitting(false);
}

export const reset = ( values, formikProps ) => {
    console.log(values);
    formikProps.setValues({
        reactSelect: 0
    });
}

export const unsetAutocomplete = ( formikProps, fieldConfig, event ) => {
    console.log('Being unsetting autocomplete value...');
    formikProps.setFieldValue('autocomplete', '');
    console.log('End unsetting autocomplete value...');
}


export const asyncFill = ( { setValues }, fieldConfig, event ) => {
    setTimeout(function() {
        setValues({
            text1: 'This is an auto-filled value',
            autocomplete: 'This option isn\'t available in the suggestions'
        })
    }, 2000);
}

export const autosave = _.debounce(( formik ) => {
    if(!_.isEqual(formik.values))
    console.log('autosave', formik.values);
}, 1000);
