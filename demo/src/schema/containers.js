import React from 'react';
import {
    save
} from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {},
    schema: {
        id: "containers",
        label: "Containers",
        type: "container",
        renderer: "form",
        elements: {
            save: {
                type: "field",
                renderer: "button",
                name: "save",
                content: "Save",
                fieldClass: "btn-success float-right",
                buttonType: "submit"
            },
            tabsContainer: {
                type: "container",
                renderer: "tabs",
                name: "tabs",
                cardClass: "mb-4",
                cardBodyClass: "none",
                tabColumnClass: "col-sm-12 col-md-12 col-lg-3",
                contentColumnClass: "col-sm-12 col-md-12 col-lg-9",
                elements: {
                    fieldset: {
                        label: "Fieldset",
                        elements: {
                            simple: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Simple Fieldset",
                                collapsible: false,
                                cardClass: "card mb-3",
                                prefixNameToElement: true,
                                name: 'simpleFieldset',
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [
                                            ['string'],
                                            ['required'],
                                            ['matches', /^[a-zA-Z][a-zA-Z0-9]+$/]
                                        ]
                                    }
                                }
                            },
                            nestedF: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Nested Fieldset",
                                collapsible: false,
                                cardClass: "card mb-3",
                                prefixNameToElement: true,
                                name: 'nestedF',
                                elements: {
                                    simple: {
                                        type: "container",
                                        renderer: "fieldset",
                                        title: " Simple Fieldset",
                                        collapsible: false,
                                        cardClass: "card mb-3",
                                        prefixNameToElement: true,
                                        name: 'simpleFieldset',
                                        elements: {
                                            title: {
                                                name: "title",
                                                label: "Title",
                                                type: "field",
                                                renderer: "text",
                                                fieldType: "text",
                                                validation: [
                                                    ['string'],
                                                    ['required'],
                                                    ['matches', /^[a-zA-Z][a-zA-Z0-9]+$/]
                                                ]
                                            },
                                            nestedGrid: {
                                                type: "container",
                                                renderer: "fieldset",
                                                title: " Nested Grid",
                                                collapsible: false,
                                                elements: {
                                                    nested: {
                                                        type: "container",
                                                        renderer: "editable-grid",
                                                        label: "Travel",
                                                        name: "nested",
                                                        isSortable: false,
                                                        elements: {
                                                            name: {
                                                                type: "field",
                                                                renderer: "text",
                                                                name: "name",
                                                                fieldType: "text",
                                                                label: "Name",
                                                                validation: [['string'], ['required']]
                                                            },
                                                            travelHistory: {
                                                                type: "container",
                                                                renderer: "editable-grid",
                                                                name: "travelHistory",
                                                                isSortable: true,
                                                                elements: {
                                                                    date: {
                                                                        type: "field",
                                                                        renderer: "text",
                                                                        name: "date",
                                                                        fieldType: "date",
                                                                        label: "Date",
                                                                        validation: [['date'], ['required']]
                                                                    },
                                                                    location: {
                                                                        type: "field",
                                                                        renderer: "text",
                                                                        name: "location",
                                                                        fieldType: "text",
                                                                        label: "Location Travelled",
                                                                        validation: [['string'], ['when', 'date', {
                                                                            is: true,
                                                                            then: [['string'], ['min', 2]],
                                                                            otherwise: [['string'], ['nullable']]
                                                                        }]]
                                                                    }
                                                                },
                                                                buttons: {
                                                                    add: "Add",
                                                                    remove: "X"
                                                                }
                                                            }
                                                        },
                                                        buttons: {
                                                            add: "Add Person",
                                                            remove: "X",
                                                            duplicate: (actions, value, index) => (
                                                                <button
                                                                    type="button"
                                                                    className="btn duplicate"
                                                                    onClick={ actions.push.bind(this, value) }>
                                                                    <i className="fa fa-copy" />
                                                                </button>
                                                            )
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            collapsible: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Collapsible Fieldset",
                                collapsible: true,
                                cardClass: "card mb-3",
                                cardHeaderActionsClass: "float-right",
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [['string'], ['when', 'simpleFieldset.title', {
                                            is: false,
                                            then: [['string'], ['required'], ['min', 5]],
                                            otherwise: [['string'], ['nullable']]
                                        }]]
                                    }
                                }
                            }
                        }
                    },
                    editableGrid: {
                        label: "Editable Grid",
                        elements: {
                            simpleGrid: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Simple Grid (Sortable)",
                                collapsible: false,
                                cardClass: 'card mb-3',
                                elements: {
                                    simple: {
                                        type: "container",
                                        renderer: "editable-grid",
                                        name: "simple",
                                        isSortable: true,
                                        elements: {
                                            name: {
                                                type: "field",
                                                renderer: "text",
                                                name: "name",
                                                fieldType: "text",
                                                label: "Name",
                                                validation: [['string'], ['required']]
                                            },
                                            age: {
                                                type: "field",
                                                renderer: "text",
                                                name: "age",
                                                fieldType: "number",
                                                label: "Age",
                                                validation: [['number'], ['required'], ['min', 18]]
                                            },
                                            dob: {
                                                type: "field",
                                                renderer: "text",
                                                name: "dob",
                                                fieldType: "date",
                                                label: "DOB",
                                                validation: [['date'], ['required']]
                                            },
                                            gender: {
                                                type: "field",
                                                renderer: "react-select",
                                                name: "type",
                                                label: "Gender",
                                                width: 150,
                                                options: [
                                                    {
                                                        value: "male",
                                                        label: "Male"
                                                    },
                                                    {
                                                        value: "female",
                                                        label: "Female"
                                                    }
                                                ]
                                            }
                                        },
                                        buttons: {
                                            add: "Add Person",
                                            remove: "X"
                                        }
                                    }
                                }
                            },
                            nestedGrid: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Nested Grid",
                                collapsible: false,
                                elements: {
                                    nested: {
                                        type: "container",
                                        renderer: "editable-grid",
                                        label: "Travel",
                                        name: "nested",
                                        isSortable: false,
                                        elements: {
                                            name: {
                                                type: "field",
                                                renderer: "text",
                                                name: "name",
                                                fieldType: "text",
                                                label: "Name",
                                                validation: [['string'], ['required']]
                                            },
                                            travelHistory: {
                                                type: "container",
                                                renderer: "editable-grid",
                                                name: "travelHistory",
                                                isSortable: true,
                                                elements: {
                                                    date: {
                                                        type: "field",
                                                        renderer: "text",
                                                        name: "date",
                                                        fieldType: "date",
                                                        label: "Date",
                                                        validation: [['date'], ['required']]
                                                    },
                                                    location: {
                                                        type: "field",
                                                        renderer: "text",
                                                        name: "location",
                                                        fieldType: "text",
                                                        label: "Location Travelled",
                                                        validation: [['string'], ['when', 'date', {
                                                            is: undefined,
                                                            then: [['string'], ['min', 2]]
                                                        }]]
                                                    }
                                                },
                                                buttons: {
                                                    add: "Add",
                                                    remove: "X"
                                                }
                                            }
                                        },
                                        buttons: {
                                            add: "Add Person",
                                            remove: "X"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    div: {
                        label: "Div",
                        htmlClass: "form-control",
                        elements: {
                            div: {
                                type: "container",
                                renderer: "div",
                                htmlClass: "border p-3",
                                name: "div",
                                prefixNameToElement: true,
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [['string'], ['required']]
                                    },
                                    reactSelect: {
                                        type: "field",
                                        renderer: "react-select",
                                        name: "react-select",
                                        label: "React Select",
                                        options: [
                                            {
                                                value: 0,
                                                label: "No"
                                            },
                                            {
                                                value: 1,
                                                label: "Yes"
                                            }
                                        ],
                                        formGroupClass: "form-group mb-4"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            horizontalTabsContainer: {
                type: "container",
                renderer: "tabs",
                name: "tabs",
                cardClass: "mb-4",
                cardBodyClass: "none",
                tabColumnClass: "col-12",
                contentColumnClass: "col-12 mt-3",
                tabListClass: "nav nav-tabs flex flex-row",
                tabListItemClass: "nav-item nav-link",
                elements: {
                    fieldset: {
                        label: "Fieldset",
                        elements: {
                            simple: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Simple Fieldset",
                                collapsible: false,
                                cardClass: "card mb-3",
                                prefixNameToElement: true,
                                name: 'simpleFieldset',
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [
                                            ['string'],
                                            ['required'],
                                            ['matches', /^[a-zA-Z][a-zA-Z0-9]+$/]
                                        ]
                                    }
                                }
                            },
                            nestedF: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Nested Fieldset",
                                collapsible: false,
                                cardClass: "card mb-3",
                                prefixNameToElement: true,
                                name: 'nestedF',
                                elements: {
                                    simple: {
                                        type: "container",
                                        renderer: "fieldset",
                                        title: " Simple Fieldset",
                                        collapsible: false,
                                        cardClass: "card mb-3",
                                        prefixNameToElement: true,
                                        name: 'simpleFieldset',
                                        elements: {
                                            title: {
                                                name: "title",
                                                label: "Title",
                                                type: "field",
                                                renderer: "text",
                                                fieldType: "text",
                                                validation: [
                                                    ['string'],
                                                    ['required'],
                                                    ['matches', /^[a-zA-Z][a-zA-Z0-9]+$/]
                                                ]
                                            },
                                            nestedGrid: {
                                                type: "container",
                                                renderer: "fieldset",
                                                title: " Nested Grid",
                                                collapsible: false,
                                                elements: {
                                                    nested: {
                                                        type: "container",
                                                        renderer: "editable-grid",
                                                        label: "Travel",
                                                        name: "nested",
                                                        isSortable: false,
                                                        elements: {
                                                            name: {
                                                                type: "field",
                                                                renderer: "text",
                                                                name: "name",
                                                                fieldType: "text",
                                                                label: "Name",
                                                                validation: [['string'], ['required']]
                                                            },
                                                            travelHistory: {
                                                                type: "container",
                                                                renderer: "editable-grid",
                                                                name: "travelHistory",
                                                                isSortable: true,
                                                                elements: {
                                                                    date: {
                                                                        type: "field",
                                                                        renderer: "text",
                                                                        name: "date",
                                                                        fieldType: "date",
                                                                        label: "Date",
                                                                        validation: [['date'], ['required']]
                                                                    },
                                                                    location: {
                                                                        type: "field",
                                                                        renderer: "text",
                                                                        name: "location",
                                                                        fieldType: "text",
                                                                        label: "Location Travelled",
                                                                        validation: [['string'], ['when', 'date', {
                                                                            is: true,
                                                                            then: [['string'], ['min', 2]],
                                                                            otherwise: [['string'], ['nullable']]
                                                                        }]]
                                                                    }
                                                                },
                                                                buttons: {
                                                                    add: "Add",
                                                                    remove: "X"
                                                                }
                                                            }
                                                        },
                                                        buttons: {
                                                            add: "Add Person",
                                                            remove: "X",
                                                            duplicate: (actions, value, index) => (
                                                                <button
                                                                    type="button"
                                                                    className="btn duplicate"
                                                                    onClick={ actions.push.bind(this, value) }>
                                                                    <i className="fa fa-copy" />
                                                                </button>
                                                            )
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            collapsible: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Collapsible Fieldset",
                                collapsible: true,
                                cardClass: "card mb-3",
                                cardHeaderActionsClass: "float-right",
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [['string'], ['when', 'simpleFieldset.title', {
                                            is: false,
                                            then: [['string'], ['required'], ['min', 5]],
                                            otherwise: [['string'], ['nullable']]
                                        }]]
                                    }
                                }
                            }
                        }
                    },
                    editableGrid: {
                        label: "Editable Grid",
                        elements: {
                            simpleGrid: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Simple Grid (Sortable)",
                                collapsible: false,
                                cardClass: 'card mb-3',
                                elements: {
                                    simple: {
                                        type: "container",
                                        renderer: "editable-grid",
                                        name: "simple",
                                        isSortable: true,
                                        elements: {
                                            name: {
                                                type: "field",
                                                renderer: "text",
                                                name: "name",
                                                fieldType: "text",
                                                label: "Name",
                                                validation: [['string'], ['required']]
                                            },
                                            age: {
                                                type: "field",
                                                renderer: "text",
                                                name: "age",
                                                fieldType: "number",
                                                label: "Age",
                                                validation: [['number'], ['required'], ['min', 18]]
                                            },
                                            dob: {
                                                type: "field",
                                                renderer: "text",
                                                name: "dob",
                                                fieldType: "date",
                                                label: "DOB",
                                                validation: [['date'], ['required']]
                                            },
                                            gender: {
                                                type: "field",
                                                renderer: "react-select",
                                                name: "type",
                                                label: "Gender",
                                                width: 150,
                                                options: [
                                                    {
                                                        value: "male",
                                                        label: "Male"
                                                    },
                                                    {
                                                        value: "female",
                                                        label: "Female"
                                                    }
                                                ]
                                            }
                                        },
                                        buttons: {
                                            add: "Add Person",
                                            remove: "X"
                                        }
                                    }
                                }
                            },
                            nestedGrid: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Nested Grid",
                                collapsible: false,
                                elements: {
                                    nested: {
                                        type: "container",
                                        renderer: "editable-grid",
                                        label: "Travel",
                                        name: "nested",
                                        isSortable: false,
                                        elements: {
                                            name: {
                                                type: "field",
                                                renderer: "text",
                                                name: "name",
                                                fieldType: "text",
                                                label: "Name",
                                                validation: [['string'], ['required']]
                                            },
                                            travelHistory: {
                                                type: "container",
                                                renderer: "editable-grid",
                                                name: "travelHistory",
                                                isSortable: true,
                                                elements: {
                                                    date: {
                                                        type: "field",
                                                        renderer: "text",
                                                        name: "date",
                                                        fieldType: "date",
                                                        label: "Date",
                                                        validation: [['date'], ['required']]
                                                    },
                                                    location: {
                                                        type: "field",
                                                        renderer: "text",
                                                        name: "location",
                                                        fieldType: "text",
                                                        label: "Location Travelled",
                                                        validation: [['string'], ['when', 'date', {
                                                            is: undefined,
                                                            then: [['string'], ['min', 2]]
                                                        }]]
                                                    }
                                                },
                                                buttons: {
                                                    add: "Add",
                                                    remove: "X"
                                                }
                                            }
                                        },
                                        buttons: {
                                            add: "Add Person",
                                            remove: "X"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    div: {
                        label: "Div",
                        htmlClass: "form-control",
                        elements: {
                            div: {
                                type: "container",
                                renderer: "div",
                                htmlClass: "border p-3",
                                name: "div",
                                prefixNameToElement: true,
                                elements: {
                                    title: {
                                        name: "title",
                                        label: "Title",
                                        type: "field",
                                        renderer: "text",
                                        fieldType: "text",
                                        validation: [['string'], ['required']]
                                    },
                                    reactSelect: {
                                        type: "field",
                                        renderer: "react-select",
                                        name: "react-select",
                                        label: "React Select",
                                        options: [
                                            {
                                                value: 0,
                                                label: "No"
                                            },
                                            {
                                                value: 1,
                                                label: "Yes"
                                            }
                                        ],
                                        formGroupClass: "form-group mb-4"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
