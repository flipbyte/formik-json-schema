import React from 'react';
import {
    save
} from '../source/external-handlers';

export default {
    onSubmit: save.bind(this),
    initialValues: {
        tabs: {
            simple: {
                first: {
                    name: 'John Doe',
                    age: 33,
                },
                second: {
                    name: 'Jane Doe',
                    age: 47
                }
            }
        }
    },
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
                        comment: "Contrary to popular belief, Lorem Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
                        elements: {
                            simple: {
                                type: "container",
                                renderer: "fieldset",
                                title: " Simple Fieldset",
                                collapsible: false,
                                cardClass: "card mb-3",
                                prefixNameToElement: true,
                                name: 'simpleFieldset',
                                comment: 'Fieldset comment',
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
                                        isObject: true,
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
                        comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc..",
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
                                comment: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)..",
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
                                                        comment: "Contrary to popular belief, Lorem Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
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
                                        isObject: true,
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
                        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
