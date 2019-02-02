import basic from './basic';
import allAvailableFields from './all-available-fields';
import externalEventHandlers from './external-event-handlers';
import async from './async';
import containers from './containers';
import validation from './validation';
import customRenderer from './custom-renderer';

export default [
    {
        title: "Basic form",
        id: "basic-form",
        className: "mb-4",
        formProps: basic
    }, {
        title: "All available fields",
        id: "all-available-fields",
        className: "mb-4",
        formProps: allAvailableFields
    }, {
        title: "External event handlers",
        id: "external-event-handlers",
        className: "mb-4",
        formProps: externalEventHandlers
    }, {
        title: "Async",
        id: "async",
        className: "mb-4",
        formProps: async
    }, {
        title: "Containers",
        id: "containers",
        className: "mb-4",
        formProps: containers
    }, {
        title: "Validation",
        id: "validation",
        className: "mb-4",
        formProps: validation
    }, {
        title: "Custom Renderer",
        id: "custom-renderer",
        className: "mb-4",
        formProps: customRenderer
    }
]
