export default {
    initialValues: {},
    schema: {
        form: {
            id: "containers",
            label: "Containers",
            type: "container",
            renderer: "form",
            elements: {
                tabsContainer: {
                    type: "container",
                    renderer: "tabs",
                    name: "tabs",
                    cardClass: "mb-4",
                    cardBodyClass: "none",
                    tabColumnClass: "col-sm-12 col-md-12 col-lg-2",
                    contentColumnClass: "col-sm-12 col-md-12 col-lg-10",
                    tabs: {
                        fieldset: {
                            label: "Fieldset",
                            elements: {
                                simple: {
                                    type: "container",
                                    renderer: "fieldset",
                                    title: " Simple Fieldset",
                                    collapsible: false,
                                    cardClass: "card mb-3",
                                    elements: {
                                        title: {
                                            name: "title",
                                            label: "Title",
                                            type: "field",
                                            renderer: "text",
                                            fieldType: "text"
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
                                            fieldType: "text"
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
                                            fields: {
                                                name: {
                                                    type: "field",
                                                    renderer: "text",
                                                    name: "name",
                                                    fieldType: "text",
                                                    label: "Name"
                                                },
                                                age: {
                                                    type: "field",
                                                    renderer: "text",
                                                    name: "age",
                                                    fieldType: "number",
                                                    label: "Age"
                                                },
                                                dob: {
                                                    type: "field",
                                                    renderer: "text",
                                                    name: "dob",
                                                    fieldType: "date",
                                                    label: "DOB"
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
                                            fields: {
                                                name: {
                                                    type: "field",
                                                    renderer: "text",
                                                    name: "name",
                                                    fieldType: "text",
                                                    label: "Name"
                                                },
                                                travelHistory: {
                                                    type: "container",
                                                    renderer: "editable-grid",
                                                    name: "travelHistory",
                                                    isSortable: true,
                                                    fields: {
                                                        date: {
                                                            type: "field",
                                                            renderer: "text",
                                                            name: "date",
                                                            fieldType: "date",
                                                            label: "Date"
                                                        },
                                                        location: {
                                                            type: "field",
                                                            renderer: "text",
                                                            name: "location",
                                                            fieldType: "text",
                                                            label: "Location Travelled"
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
                                    elements: {
                                        title: {
                                            name: "title",
                                            label: "Title",
                                            type: "field",
                                            renderer: "text",
                                            fieldType: "text"
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
}
