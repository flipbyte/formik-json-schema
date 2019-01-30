# formik-json
[Powered by Flipbyte](https://www.flipbyte.com/)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

formik-json is a wrapper for Formik to easily create forms using JSON / Javascript Object for defining the elements.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


### Pre-requisites
----
The component depends on a few third-party plugins for adding WYSIWYG, select, auto-complete, validation etc.
Few of them already come packaged with the extension and few need to be installed separately in your project.

### Installation
----
You can install Formik-json using following steps.

```sh
$ Correct installation
$ commands need to be
$ added here
```


### Description
----
"validation" and "form" are the 2 main keys of the object.

- Validation: validation allows you to define the validation rules for the form.
The plugin depends on [Validatorjs](https://github.com/skaterdav85/validatorjs) and you can follow the instructions in their [README](https://github.com/skaterdav85/validatorjs/blob/master/README.md) to setup your validation rules.

- Form: Everything inside the "form" key has 2 types: either "container" or "field"
Each type needs a renderer to render the specific component.
The "container" has an "elements" key within which you can define either new containers or fields.

"form" is an object that has the following keys (all required):

| Key | Description |
| ------ | ------ |
| id | the ID for the form |
| label | the title for the form |
| type | "container" |
| renderer | "form" (you can use other renderers but if you want the form to have a &lt;form /&gt; tag use the "form" renderer.) |
| elements | is an object used to define the elements within the container |

Note: The "form" object can only have one container. You can have multiple containers and fields inside the elements object of the form container.

#### Following is a sample JSON:

```sh
{
    "validation": {
        "status": "required",
        "data.identifier": "required|alpha_dash",
        "attributes.\*.title": "required",
        ...
    },
    "form": {
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
}

```

"elements" is an object with key-value pair where value is another object. The value object can either be a of type "container" or "field".

Each container or field requires a renderer which can be set using "renderer": "{your_renderer}". You can define you own renderers for both containers and keys or use the ones that come with the module.

#### Following are the properties for each type of container:

| Container | Field | Property | Description |
| ------- | ------ | ------ | ------ |
| editable-grid | | | |
|  | fields | {} | An object with one or more field definitions in a key-value pair |
| | buttons |{"add": "Add", "remove": "X"} | has 2 properties both optional to define labels for the buttons in the editable grid |
| | isSortable | Bool | whether the grid rows can be dragged and sorted |
| | tableContainerClass | String | htmlClass for the div wrapping the editable-grid |
| | tableClass | String | htmlClass for the main editable grid |
| div | | | |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | elements | {} | is an object that can hold one or more fields or containers within it. |
| | htmlClass | String | htmlClass for the div element |
| | prefixNameToElement | Bool | |
| fieldset | | | |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | title | String | label for the fieldset |
| | elements| {} | is an object that can hold one or more fields or containers within it. |
| | prefixNameToElement | Bool | |
| | cardClass | String | htmlClass for the main wrapping container|
| | cardHeaderClass | String | htmlClass for the header of the wrapping container |
| | cardHeaderActionsClass | String | htmlClass for the container holding the disclose buttons in the header of the container |
| | cardBodyClass | String | htmlClass for the body of the container |
| form | | | |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | elements | {} | is an object that can hold one or more fields or containers within it. |
| |  htmlClass | String | any character |
| | prefixNameToElement | Bool | |
| tabs |  |  | |
| | name | String | is used to prepend parent container's name to the children fields when "prefixNameToElement" is set to true. |
| | tabs | {} | Object |
| | prefixNameToElement | Bool | |
| | cardClass | String | same as fieldset |
| | rowClass | String |  htmlClass for the row div |
| | tabListClass | String | htmlClass for tab list |
| |  tabListItemClass | String | htmlClass for tab list item |
| | tabContentClass | String | htmlClass for tab content container |
| | tabColumnClass | String | htmlClass for tabs container |
| | contentColumnClass | String | htmlClass for wrapping the tab content container |
| | tabActiveClass | String | htmlClass for active tabs |
| | tabPaneClass | String | htmlClass for single tab pane |
| ButtonGroup | | | |
| |  |  | |

#### Following are the properties for each type of field:

| Field | Type | Property | Description |
| :--- | :--- | :---: | :--- |
| checkbox | | | |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| |  type | String | either "container" or "field" |
| | attributes |  {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | options | Array | Array of objects with keys "value" and "label" |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| code-editor | | | |
| | name | String | html field name attribute |
| |  label | String | the label for the field |
| | options | {} | |
| | defaultValue | String | default field value (untested) |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| |  labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| radio | | |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | options | {} | |
| | attributes |{}  | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass |String  | html class for the div that wraps the form field |
| react-select | | | |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | options | {} | array of objects with value and label keys. Example: [{"label": "Item 1", "value": "value-1"}] |
| | defaultValue | String | default field value (untested) |
| | multi | Bool | whether it's a mult-select |
| | noOptionsMessage | String | message to show when there are no options |
| | labelClass | String | html class for the label html element |
| | fieldClass | String  | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| switch | | | |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | attributes |  {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | dataOn | String | label for On. Example: in a yes/no option this would be Yes |
| | dataOff | String | label for Off. In the above example "No" |
| | labelClass |String  | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| text | | | |
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
| textarea | | | |
| | name | String | html field name attribute |
| | label | String | the label for the field |
| | type | String | either "container" or "field" |
| | attributes | {} | is an object that can hold other html field related attributes (if any). Only ones that are not defined using any other key will be used. For example: name already has it's own key and hence "name" key inside the attributes object will do nothing. |
| | rows | Number | Number of rows that the text-area container should show by default |
| | labelClass | String | html class for the label html element |
| | fieldClass | String | html class for the main html/3-rd party form field |
| | formGroupClass | String | html class for the div that wraps the form field |
| wysiwyg | | | |
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
| autocomplete | | | |
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
----
We would like to extend our sincere gratitude towards all members of open-source web-development community.
Special shout-out goes to following members who inspire us to always works towards the greater good:
[@skaterdav85](https://github.com/skaterdav85/validatorjs)
[@zenoamaro](https://github.com/zenoamaro/react-quill)
[@moroshko](https://github.com/moroshko/react-autosuggest)

If you have suggestions, comments or ideas to develop more such solutions, you can write to us at [Flipbyte.com](https://www.flipbyte.com/#ht-top-footer)



## License
----
The MIT License (MIT)
markdown
