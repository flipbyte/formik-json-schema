# formik-json
[Powered by Flipbyte](https://www.flipbyte.com/)

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![license][license-badge]][license]
[![Codacy Badge][codacy-badge]][codacy]

formik-json is a wrapper for Formik to easily create forms using JSON / Javascript Object for defining the elements.

## Examples

-   [Demo](https://flipbyte.github.io/formik-json)

## Pre-requisites

The component depends on a few third-party plugins for adding WYSIWYG, select, auto-complete, validation etc.
Few of them already come packaged with the extension and few need to be installed separately in your project.

## Installation

You can install Formik-json using following steps.

```js
$ npm i @flipbyte/formik-json
```

### Quick Start Guide

Once you've finished installation, you can add the form to any of your components as follows:

#### Import the Form component

```js
import { Form } from '@flipbyte/formik-json';
```

##### Prepare your form object

```js
{
    "id": "my-new-form",
    "label": "My New Form",
    "type": "container",
    "renderer": "form",
    "elements": {
        "save": {
            "type": "field",
            "renderer": "button",
            "name": "save",
            "label": "Save",
            "position": 10,
            "htmlClass": "btn-success",
            "buttonType": "submit"
        },
        "main": {
            "type": "container",
            "renderer": "div",
            "htmlClass": "row",
            "elements": {
                "title": {
                    "name": "attributes.0.title",
                    "label": "Title",
                    "type": "field",
                    "renderer": "text",
                    "position": 10,
                    "fieldType": "text"
                },
                ....
            }
        },
        ....
    }
}

```

##### Add the component anywhere you want

```sh
<Form
    schema={ # Your form object here # }
    { ...# Other formik props # } />
```

### Form Component
----
Form component requires the following properties:

| Key | Description |
| ------ | ------ |
| schema | your schema object |
| initialValues | check [<Formik />](https://jaredpalmer.com/formik/docs/api/formik) |
| Formik properties | You can add any of the [<Formik />](https://jaredpalmer.com/formik/docs/api/formik) component props |

### Schema object
----
Schema object contains elements which can be one of 2 types: either "container" or "field"
Each type needs a renderer to render the specific component.
The "container" has an "elements" key within which you can define either new containers or fields.

schema object that has the following keys (all required):

| Key | Description |
| ------ | ------ |
| id | the ID for the form |
| label | the title for the form |
| type | "container" |
| renderer | "form" (you can use other renderers but if you want the form to have a ```<form />``` tag use the "form" renderer.) |
| elements | is an object used to define the elements within the container |

Note: The schema object can only have one container. You can have multiple containers and fields inside the elements object of the main schema object.

"elements" is an object with key-value pair where value is another object. The value object can either be a of type "container" or "field".

Each container or field requires a renderer which can be set using "renderer": "{your_renderer}". You can define you own renderers for both containers and keys or use the ones that come with the module.

### Following are the properties for each type of container

#### Common container properties

| Not applicable | Field | Property | Description |
| ------- | ------ | ------ | ------ |
| none | type | String | "container" |
| button-group | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| editable-grid, tabs | elements | {} | is an object that can hold one or more fields or containers within it. |
| editable-grid, button-group | prefixNameToElement | Bool | |

#### Container specific properties

| Container | Field | Property | Description |
| ------- | ------ | ------ | ------ |
| editable-grid | renderer | String | editable-grid |
|  | fields | {} | An object with one or more field definitions in a key-value pair |
| | buttons | ```{"add": "Add", "remove": "X"}``` | has 2 properties both optional to define labels for the buttons in the editable grid |
| | isSortable | Bool | whether the grid rows can be dragged and sorted |
| | tableContainerClass | String | htmlClass for the div wrapping the editable-grid |
| | tableClass | String | htmlClass for the main editable grid |
| div | renderer | String | div |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | htmlClass | String | htmlClass for the div element |
| fieldset | renderer | String | fieldset |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | title | String | label for the fieldset |
| | cardClass | String | htmlClass for the main wrapping container |
| | cardHeaderClass | String | htmlClass for the header of the wrapping container |
| | cardHeaderActionsClass | String | htmlClass for the container holding the disclose buttons in the header of the container |
| | cardBodyClass | String | htmlClass for the body of the container |
| form | renderer | String | form |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| |  htmlClass | String | any character |
| tabs | renderer | String | tabs |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | tabs | {} | Object |
| | cardClass | String | same as fieldset |
| | rowClass | String |  htmlClass for the row div |
| | tabListClass | String | htmlClass for tab list |
| |  tabListItemClass | String | htmlClass for tab list item |
| | tabContentClass | String | htmlClass for tab content container |
| | tabColumnClass | String | htmlClass for tabs container |
| | contentColumnClass | String | htmlClass for wrapping the tab content container |
| | tabActiveClass | String | htmlClass for active tabs |
| | tabPaneClass | String | htmlClass for single tab pane |
| button-group | renderer | String | button-group |
| | elements | {} | the elements can only be of type: "field" with renderer: "button". |

### Following are the properties for each type of field

#### Common field properties
| Field | Type | Property | Description |
| :--- | :--- | :---: | :--- |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| |  type | String | "field" |
| |  validation | String | Check [yup-schema](https://github.com/flipbyte/yup-schema) |
| |  conditional | String | Check [when-condition](https://github.com/flipbyte/when-condition) |

#### Field specific properties

| Field | Type | Property | Description |
| :--- | :--- | :---: | :--- |
| checkbox | renderer | String | checkbox |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| |  type | String | "field" |
| | attributes |  {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | options | Array | Array of objects with keys "value" and "label" |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| code-editor | renderer | String | code-editor |
| | name | String | html field name attribute |
| |  label | String | the label for the field |
| | options | {} | |
| | defaultValue | String | default field value (untested) |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| |  labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| radio | renderer | String | radio |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | options | {} | |
| | attributes | {}  | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String  | html class for the div that wraps the form field |
| react-select | renderer | String | react-select |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | options | {} | array of objects with value and label keys. Example: `[{"label": "Item 1", "value": "value-1"}]` |
| | defaultValue | String | default field value (untested) |
| | isMulti | Bool | whether it's a mult-select |
| | isClearable | Bool | displays a clear select button on the select which will clear the selected options |
| | isDisabled | Bool | disables the select when set to true |
| | noOptionsMessage | Function | refer [ReactSelect Props](https://react-select.com/props) |
| | labelClass | String | html class for the label html element |
| | fieldClass | String  | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| switch | renderer | String | switch |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | attributes |  {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | dataOn | String | label for On. Example: in a yes/no option this would be Yes |
| | dataOff | String | label for Off. In the above example "No" |
| | labelClass | String  | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| text | renderer | String | text |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | type | String | either "container" or "field" |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | fieldType | String | HTML input type. The value that goes into <input type="{this value here}" /> |
| | defaultValue | String | default field value (untested) |
| | icon | String | fontawesome icon class |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| | inputGroupClass | String | html class for the div that wraps an icon and an input element together |
| textarea | renderer | String | textarea |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | type | String | either "container" or "field" |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | rows | Number | Number of rows that the text-area container should show by default |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| wysiwyg | renderer | String | wysiwyg |
| | name | String | html field name attribute |
| |  label | String | the label for the field |
| | type | String | either "container" or "field" |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | options | {} | [React-quill wysiwyg options](https://github.com/zenoamaro/react-quill) |
| | rows | Number | Number of rows that the wysiwyg container should show by default |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| | textareaClass | String |  the class for the textarea that will show the raw html for the content entered in the wysiwyg |
| autocomplete | renderer | String | autcomplete |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | type | String | either "container" or "field" |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | defaultValue | String | default field value (untested) |
| | options | {} | Options available in [react-autosuggest plugin](https://github.com/moroshko/react-autosuggest) |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |

## Thank You
We would like to extend our sincere gratitude towards all members of open-source web-development community.
Special shout-out goes to following members who inspire us to always works towards the greater good:
[@skaterdav85](https://github.com/skaterdav85/validatorjs)
[@zenoamaro](https://github.com/zenoamaro/react-quill)
[@moroshko](https://github.com/moroshko/react-autosuggest)

If you have suggestions, comments or ideas to develop more such solutions, you can write to us at [Flipbyte.com](https://www.flipbyte.com/#ht-top-footer)

## License
The MIT License (MIT)

[build-badge]: https://travis-ci.org/flipbyte/formik-json.svg?branch=master
[build]: https://travis-ci.org/flipbyte/formik-json

[npm-badge]: https://img.shields.io/npm/v/@flipbyte/formik-json.svg
[npm]: https://www.npmjs.com/package/@flipbyte/formik-json

[coveralls-badge]: https://coveralls.io/repos/github/flipbyte/formik-json/badge.svg
[coveralls]: https://coveralls.io/github/flipbyte/formik-json

[license-badge]: https://badgen.now.sh/badge/license/MIT
[license]: ./LICENSE

[codacy-badge]: https://api.codacy.com/project/badge/Grade/18e71277b7e94ad9aca885b5ba3d890c
[codacy]: https://www.codacy.com/app/easeq/formik-json?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=flipbyte/formik-json&amp;utm_campaign=Badge_Grade
