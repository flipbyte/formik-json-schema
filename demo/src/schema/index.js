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
        className: "mb-4",
        formProps: basic
    }, {
        title: "All available fields",
        className: "mb-4",
        formProps: allAvailableFields
    }, {
        title: "External event handlers",
        className: "mb-4",
        formProps: externalEventHandlers
    }, {
        title: "Async",
        className: "mb-4",
        formProps: async
    }, {
        title: "Containers",
        className: "mb-4",
        formProps: containers
    }, {
        title: "Validation",
        className: "mb-4",
        formProps: validation
    }, {
        title: "Custom Renderer",
        className: "mb-4",
        formProps: customRenderer
    }
]
